/*  
    File name: fileController
    Purpose: To save file in db and retreive it back from db
*/


function saveFile(req, res) {
    gridfs.saveFile(req, res);
};

function getFile(req, res) {
    gridfs.getFile(req, res);
};


module.exports = {
    saveFile,
    getFile
};