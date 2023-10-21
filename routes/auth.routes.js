const { Router } = require('express')
const { login, googleLogin, renovateJWT } = require('../controllers/auth.controller')
const { check } = require('express-validator')

const { validateErrors, validateJWT } = require('../middlewares');




const router = Router()

router.post('/login', [
    check("usuario", "El usuario es requerido.").not().isEmpty(),
    check("password", "El password es requerido.").not().isEmpty(),
    validateErrors
                ] , login )

router.post('/google', [
    check("id_token", "El id token es necesario.").not().isEmpty(),
    validateErrors
                ] ,
    googleLogin )

.get( '/', validateJWT, renovateJWT )

module.exports = router