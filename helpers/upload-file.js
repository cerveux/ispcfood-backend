const { request, response } = require('express');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadFile = async( files, validExtentions = [ 'jpg', 'png', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {  
        const { file } = files;
        const splitName = file.name.split('.');
        const extention = splitName[ splitName.length - 1];
        const fileName = uuidv4() + '.' + extention;  

        if(!validExtentions.includes(extention)){
            return reject(`La extensión ${extention} no es soportada por el sistema.`)
        }

        const uploadPath = path.join(__dirname, '../uploads/', folder , fileName) ;
        file.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);
          }
          resolve(fileName)
      
        });
    })
}




module.exports = {
    uploadFile
}