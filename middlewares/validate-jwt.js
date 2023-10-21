const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models')



const validateJWT = async ( req = request, res = response, next) => {

    const token = req.header("x-token")

    if(!token){
        res.status(401).json({
            res: "El usuario no cuenta con un token de acceso."
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        if( !user ){
            return res.status(401).json({
                msg: 'Token no válido - El usuario no existe en nuesta base de datos.'
            })
        }

        if( !user.state ){
            return res.status(401).json({
                msg: 'Token no válido - El usuario no existe en nuesta base de datos.'
            })
        }

        req.user = user;

        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            res: 'El token recibido no es válido.'
        })
        
    }






}



module.exports = validateJWT