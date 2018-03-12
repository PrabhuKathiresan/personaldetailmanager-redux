/**
 * LoginController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function authenticate(req, res){
    mongodb.authenticate(req, res);
};

function logout(req, res) {
    mongodb.logout(req, res);
};
 
module.exports = {
    authenticate,
    logout
};