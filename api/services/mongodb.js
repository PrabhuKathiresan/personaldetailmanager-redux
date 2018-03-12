var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var connection = require('../../config/env/production').mongoconnection;
var bcrypt = require('bcrypt');

const saltRounds = 10;

function constructUrl(username, password, authDbname) {
    var url = format('%s%s:%s@%s:%s/?authSource=%s', connection.prefix, encodeURIComponent(username), encodeURIComponent(password), connection.host, connection.port, authDbname);
    return url;
};

function constructMongoDbUrl(username, password, connectDbname, authDbname) {
    var url = format('%s%s:%s@%s:%s/%s?authSource=%s', connection.prefix, encodeURIComponent(username), encodeURIComponent(password), connection.host, connection.port, connectDbname, authDbname);
    return url;
};

function constructMongoUri(username, password, authDbname) {
    var url = format('%s%s:%s@%s:%s/?authSource=%s', connection.prefix, encodeURIComponent(username), encodeURIComponent(password), connection.host, connection.port, authDbname);
    return url;
};

function connectMongoDb(url, cb) {
    MongoClient.connect(url, function (error, db) {
        if (error) {
            console.log('database error', error);
            return cb(error);
        }
        cb(null, db);
    });
};

function connectDatabase(url) {
    return mongojs(url);
};

function authenticate(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var url = constructUrl(username, password, 'admin');
    MongoClient.connect(url, function (error, client) {
        if (error) {
            console.log('database error', error);
            return res.send({ success: false, details: 'Invalid credentials' });
        }
        const adminDb = mongojs(constructUrl(connection.admin.username, connection.admin.password, 'admin'));
        const systemusers = adminDb.collection('system.users');
        systemusers.findOne({
            _id: 'admin.' + username
        }, function (error, doc) {
            adminDb.close();
            client.close();
            if (error)
                return res.send({
                    success: false
                });
            req.session.authenticated = true;
            req.session.userId = doc.customData.userId;
            req.session.user = {
                name: username,
                password: password
            };
            res.send({ success: true, details: 'ok' });
        });

    });
};

function getDbConnectionInstance(dbConnection) {
    const DbConnection = mongojs(dbConnection);
    return DbConnection;
};

function addUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var url = constructUrl(connection.admin.username, connection.admin.password, 'admin');
    connectMongoDb(url, function (error, client) {
        if (error)
            return res.send({
                success: false,
                details: error
            });
        var db = client.db(connection.dbname);
        var collection = db.collection('Profile');
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                req.body.password = hash;
                collection.insert(req.body, function (err, doc) {
                    if (err) {
                        return res.send({
                            success: false,
                            details: 'Error: could not add new user'
                        });
                    }

                    db.addUser(username, password, {
                        roles: [
                            {
                                role: "dbOwner",
                                db: connection.dbname
                            }
                        ],
                        customData: {
                            userId: doc.ops[0]._id
                        }
                    }, (err, result) => {
                        if (err) {
                            console.log('Error: could not add new user' + err);
                            client.close();
                            return res.send({
                                success: false,
                                details: 'Error: could not add new user'
                            });
                        }
                        var adminDb = client.db('admin');
                        // Create the new user to the admin database
                        adminDb.addUser(username, password, {
                            roles: [
                                {
                                    role: "dbOwner",
                                    db: connection.dbname
                                }
                            ],
                            customData: {
                                userId: doc.ops[0]._id
                            }
                        }, function (err, result) {
                            if (err) {
                                console.log('Error: could not add new user' + err);
                                client.close();
                                return res.send({
                                    success: false,
                                    details: 'Error: could not add new user'
                                });
                            }
                            res.send({
                                success: true,
                                details: 'ok'
                            });
                            client.close();
                        });
                    });
                });
            });
        });
    });
};

function addDocument(req, res, collectionname) {
    const user = req.session.user;
    const db = connectDatabase(constructMongoDbUrl(user.name, user.password, connection.dbname,  connection.dbname));
    const collection = db.collection(collectionname);
    req.body.parentId = mongojs.ObjectId(req.session.userId);
    collection.insert(req.body, function (error, doc) {
        db.close();
        if (error)
            return res.send({
                success: false,
                details: 'Connection Error!!!'
            });
        res.send({
            success: true,
            details: doc
        });
    });
};

function getDocuments(req, res, collectionname) {
    const user = req.session.user;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const sort = req.query.sort ? parseInt(req.query.sort) : -1;
    if (!user) {
        return res.status(403).send('Invalid user');
    }
    const db = connectDatabase(constructMongoDbUrl(user.name, user.password, connection.dbname, connection.dbname));
    const collection = db.collection(collectionname);
    collection.find({
        parentId: mongojs.ObjectId(req.session.userId)
    }).limit(limit).skip(skip).sort({
        _id: sort
    }, function (error, docs) {
        db.close();
        if (error)
            return res.send({
                success: false,
                details: 'Connection Error!!!'
            });
        res.send({
            success: true,
            details: docs
        });
    });
};

function getDocument(req, res, collectionname) {
    const user = req.session.user;
    const docid = req.query._id;
    const db = connectDatabase(constructMongoDbUrl(user.name, user.password, connection.dbname,  connection.dbname));
    const collection = db.collection(collectionname);
    collection.findOne({
        parentId: mongojs.ObjectId(req.session.userId),
        _id: mongojs.ObjectId(docid)
    }, function (error, doc) {
        db.close();
        if (error)
            return res.send({
                success: false,
                details: 'Connection Error!!!'
            });
        res.send({
            success: true,
            details: doc
        });
    });
};

function updateDocument(req, res, collectionname) {
    const user = req.session.user;
    const doc = req.body;
    doc._id = mongojs.ObjectId(doc._id);
    doc.parentId = mongojs.ObjectId(req.session.userId);
    doc.modifiedDate = new Date();
    const db = connectDatabase(constructMongoDbUrl(user.name, user.password, connection.dbname, connection.dbname));
    const collection = db.collection(collectionname);
    collection.save(doc, function (error, result) {
        db.close();
        if (error)
            return res.send({
                success: false,
                details: 'Connection Error!!!'
            });
        res.send({
            success: true,
            details: result
        });
    });
};

function deleteDocument(req, res, collectionname) {
    const user = req.session.user;
    const docid = req.query._id;
    const db = connectDatabase(constructMongoDbUrl(user.name, user.password, connection.dbname, connection.dbname));
    const collection = db.collection(collectionname);
    collection.remove({
        _id: mongojs.ObjectId(docid)
    }, function (error, result) {
        db.close();
        if (error)
            return res.send({
                success: false,
                details: 'Connection Error!!!'
            });
        res.send({
            success: true,
            details: result
        });
    });
};

function logout(req, res) {
    req.session.destroy(function (err) {
        res.send({ success: true });
    });
};

module.exports = {
    authenticate,
    addUser,
    addDocument,
    getDocument,
    getDocuments,
    logout,
    updateDocument,
    deleteDocument,
    connectMongoDb,
    constructUrl,
    constructMongoDbUrl,
    constructMongoUri
};