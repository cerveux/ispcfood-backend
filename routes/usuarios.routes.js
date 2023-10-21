const { Router } = require('express')
const { check } = require('express-validator')

// const { validateAdminRole, validateRoles } = require('../middlewares/validate-role');
// const { validateErrors } = require('../middlewares/validate');
// const validateJWT = require('../middlewares/validate-jwt');

const { validateAdminRole, validateRoles,
    validateErrors, validateJWT } = require('../middlewares')

const { roleValidator, existsMail, existsUserId, existsUser } = require('../helpers/db-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios.controller')



const router = Router()


router.get('/', usuariosGet )

router.post('/', [
    check("mail", "El correo ingresado es inválido").isEmail(),
    check("mail").custom( existsMail ),
    check("nombre", "El nombre es requerido.").not().isEmpty(),
    check("usuario", "El usuario es requerido.").not().isEmpty(),
    check("usuario").custom( existsUser ),

    check("telefono", "El telefono es requerido.").not().isEmpty(),
    check("password", "El password tiene que tener una longitud mínima de 6 dígitos.").isLength({ min: 6 }),
    // check("role", "Ese rol no existe.").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("role").custom(roleValidator),
    validateErrors
                ] , usuariosPost )

router.put('/:id',[
    check('id', 'El id no es un id válido de Mongo.').isMongoId(),
    check("id").custom(existsUserId),
    check("password", "El password tiene que tener una longitud mínima de 6 dígitos.").isLength({ min: 6 }),
    check("name", "El nombre es requerido.").not().isEmpty(),
    check("mail", "El correo ingresado es inválido").isEmail(),
    check("role").custom(roleValidator),
    validateErrors

], usuariosPut )

router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    // validateRoles('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'),
    check('id', 'El id no es un id válido de Mongo.').isMongoId(),
    check("id").custom(existsUserId),
    validateErrors
], usuariosDelete )

module.exports = router