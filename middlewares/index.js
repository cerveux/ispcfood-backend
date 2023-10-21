const validateErrors = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');
const validateRole = require('../middlewares/validate-role');



module.exports = {
    ...validateErrors,
    validateJWT,
    ...validateRole,
}