/**
 * signupController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function addUser(req, res){
    mongodb.addUser(req, res);
};
 
module.exports = {
    addUser
};