/**
 * passwordController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function getDocument(req, res){
    mongodb.getDocument(req, res, 'PasswordManager');
};

function getDocuments(req, res){
    mongodb.getDocuments(req, res, 'PasswordManager');
};

function addDocument(req, res){
    mongodb.addDocument(req, res, 'PasswordManager');
};

function updateDocument(req, res){
    mongodb.updateDocument(req, res, 'PasswordManager');
};

function deleteDocument(req, res){
    mongodb.deleteDocument(req, res, 'PasswordManager');
};
 
module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument
};