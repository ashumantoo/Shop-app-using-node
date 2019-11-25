const fs = require('fs');

const deleteFile = (filePath) => {

    //this delete a file from the given path
    fs.unlink(filePath, (err) => {
        if (err) {
            throw (err);
        }
    });
};

exports.deleteFile = deleteFile;