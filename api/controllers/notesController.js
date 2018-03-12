/**
 * notesController
 *
 * @description :: Server-side logic for managing quotes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var mongodb = require('../services/mongodb');

function getDocument(req, res){
    mongodb.getDocument(req, res, 'NotesManager');
};

function getDocuments(req, res){
    mongodb.getDocuments(req, res, 'NotesManager');
};

function addDocument(req, res){
    mongodb.addDocument(req, res, 'NotesManager');
};

function updateDocument(req, res){
    mongodb.updateDocument(req, res, 'NotesManager');
};

function deleteDocument(req, res){
    mongodb.deleteDocument(req, res, 'NotesManager');
};
 
module.exports = {
    getDocuments,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument
};