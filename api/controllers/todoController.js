/**
 * alarmController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function getDocument(req, res){
    mongodb.getDocument(req, res, 'TodoManager');
};

function getDocuments(req, res){
    mongodb.getDocuments(req, res, 'TodoManager');
};

function addDocument(req, res){
    mongodb.addDocument(req, res, 'TodoManager');
};

function updateDocument(req, res){
    mongodb.updateDocument(req, res, 'TodoManager');
};

function deleteDocument(req, res){
    mongodb.deleteDocument(req, res, 'TodoManager');
};
 
module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument
};