/**
 * alarmController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function getDocument(req, res){
    mongodb.getDocument(req, res, 'AlarmManager');
};

function getDocuments(req, res){
    mongodb.getDocuments(req, res, 'AlarmManager');
};

function addDocument(req, res){
    mongodb.addDocument(req, res, 'AlarmManager');
};

function updateDocument(req, res){
    mongodb.updateDocument(req, res, 'AlarmManager');
};

function deleteDocument(req, res){
    mongodb.deleteDocument(req, res, 'AlarmManager');
};
 
module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument
};