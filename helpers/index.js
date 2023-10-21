
const dbValidator = require('./db-validator');
const genetateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');


module.exports = {
    ...dbValidator,
    ...genetateJWT,
    ...googleVerify,
    ...uploadFile
}