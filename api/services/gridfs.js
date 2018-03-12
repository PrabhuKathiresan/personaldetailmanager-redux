const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const GridStore = mongo.GridStore;
const mongojs = require('mongojs');
const _ = require('lodash');
var Grid = require('gridfs');
var fs = require('fs');
var mongodb = require('./mongodb');
var connection = require('../../config/env/production').mongoconnection;

// const streamifier = require('streamifier');

// const intoStream = require('into-stream');

// const nodemailer = require('nodemailer');

// var request = require('request');

// var FormData = require('form-data');

function getGridFSHandle(url, cb) {
    mongodb.connectMongoDb(url, (err, db) => {
        if (err) {
            return cb(err);
        }
        var gfs = Grid(db, mongo);
        cb(null, gfs);
    });
};

function saveFile(req, res) {
    const user = req.session.user;
    let url = mongodb.constructUrl(user.name, user.password, connection.dbname);

    /* Attaching attachments to nodemailer */
    // const files = req.files['images'];
    // const attachments = [];
    // _.forEach(files, (file) => {
    //     if (file) {
    //         attachments.push({
    //             filename: file.name,
    //             content: streamifier.createReadStream(file.data)
    //         });
    //     }
    // });

    // if (attachments && attachments.length > 0) {
    //     sendMail(attachments)
    //         .then(() => {
    //             res.send({
    //                 success: true
    //             });
    //         })
    //         .catch(err => console.log(err));
    // }
    /* End of Attaching attachments to nodemailer */

    /* Attaching attachments to BOX-CLIENT */
    // const files = req.files['images'];
    // const attachments = [];
    // _.forEach(files, (file) => {
    //     if (file) {
    //         attachments.push({
    //             value: file.data,
    //             name: new Date().getTime() + '_' + file.name
    //         });
    //     }
    // });

    // if (attachments && attachments.length > 0) {
    //     sendToBox(attachments);
    //     res.end();
    // }
    /* End of Attaching attachments to BOX-CLIENT */

    MongoClient.connect(url, function (err, client) {
        const db = client.db(connection.dbname);
        const files = req.files['images'];
        const fileToSave = [];
        _.forEach(files, (file) => {
            fileToSave.push(saveFileInGridFS(db, file));
        });

        Promise.all(fileToSave)
            .then((data) => {
                client.close();
                res.send({
                    success: true,
                    details: data
                });
            })
            .catch((err) => {
                client.close(); 
                console.log(err);
                return res.status(500).send(err);
            });

        /* gridStore.open(function (err, gridStore) {
            gridStore.write(file.data, function (err, gridStore) {
                if (err) {
                    console.log(err);
                }
                gridStore.close(function (err, result) {
                    if (err) {
                        console.log(err);
                        client.close();
                        return res.status(500).send(err);
                    }
                    client.close();
                    res.send({
                        success: true,
                        details: result
                    });
                });
            });
        }); */
    });
};

function saveFileInGridFS(db, file) {
    return new Promise(async (resolve, reject) => {
        const fileId = new ObjectID();
        const gridStore = new GridStore(db, fileId, file.name, "w");
        gridStore.open(function (err, gridStore) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            gridStore.write(file.data, function (err, gridStore) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                gridStore.close(function (err, result) {
                    resolve(result);
                });
            });
        });
    });
};

function getFile(req, res) {
    const user = req.session.user;
    let url = mongodb.constructUrl(user.name, user.password, connection.dbname);
    const _id = req.params.fileid;
    if (!_id) {
        return res.status(400).send('Bad request. File id is missing');
    }
    MongoClient.connect(url, function (err, client) {
        const db = client.db(connection.dbname);
        var fileId = new ObjectID(_id);
        const gridStoreRead = new GridStore(db, fileId, "r");
        gridStoreRead.open(function (err, gridStore) {
            if (err) {
                console.log(err);
            }
            var contentDisposition = '';
            let ext = gridStore.filename.split('.').pop().toLowerCase();
            if (ext == 'jpg' || ext == 'png' || ext == 'gif') {
                contentDisposition = 'inline; filename=' + gridStore.filename;
                res.setHeader('Content-Disposition', contentDisposition);
                res.setHeader('Content-Type', "image/jpeg");
            } else if (ext == '.mp4') {
                contentDisposition = 'inline; filename=' + gridStore.filename;
                res.setHeader('Content-Disposition', contentDisposition);
                res.setHeader('Content-Type', "video/mp4");
            } else if (ext == '.mp3') {
                contentDisposition = 'inline; filename=' + gridStore.filename;
                res.setHeader('Content-Disposition', contentDisposition);
                res.setHeader('Content-Type', "audio/mp3");
            } else {
                contentDisposition = 'attachment; filename=' + gridStore.filename;
                res.setHeader('Content-Disposition', contentDisposition);
                res.setHeader('Content-Type', gridStore.contentType);
            }
            var stream = gridStore.stream(true);
            stream.on("end", function () {
                client.close();
            });
            stream.pipe(res);
        });
    });
};

function sendToBox(attachments) {
    let config = {
        method: 'POST',
        url: 'http://localhost:3000/upload/1801-111/file',
        headers: {
            'content-type': 'multipart/form-data'
        }
    };

    const req = request(config, (error, response, body) => {
        if (error) {
            return console.error('upload failed:', error);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    const form = req.form();
    _.forEach(attachments, (file, i) => {
        form.append('files', file.value, { filename: file.name });
    });
};

function sendMail(attachments) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'prabhukathir30@gmail.com',
                pass: '9551007868'
            }
        });

        let mailOptions = {
            from: '"Prabhu Kathiresan" <prabhukathir30@gmail.comm>', // sender address
            to: 'prabhukathir30@gmail.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>', // html body
            attachments: attachments
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            }
            resolve(true);
        });
    });
};

module.exports = {
    saveFile,
    getFile
}