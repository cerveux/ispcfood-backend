const { request, response } = require('express')
const bcrypt = require('bcrypt')

const { User } = require('../models');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async ( req = request, res = response ) => {

    const { usuario, password } = req.body;

    const user = await User.findOne( {usuario} )

    if(!user){
        return res.status(400).json({
            res: 'Usuario no encontrado.'
        })
    }

    if(!user.state){
        return res.status(400).json({
            res: 'Usuario no encontrado. - Usuario inactivo.'
        })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword){
        return res.status(400).json({
            res: 'Error de autentificación.'
        })
    }

    const token = await generateJWT(user.id)





    try {
        res.json({
            response: 'Respuesta desde el Auth',
            user,
            token
    
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            res: 'Se produjo un error, comuniquesé con el administrador.'
        })
    }




}

const googleLogin = async (req = require, res = response) => {
    const { id_token } = req.body;


    try {

        const { mail, name, picture } = await googleVerify(id_token)
        
        
        const user = await User.findOne({ mail })

        if(!user){
            
            const data = {
                name,
                mail,
                password: 'google pw',
                role: 'USER_ROLE',
                google: true

            }
            user = new User(data);
            await user.save();
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Comuniquesé con el administrador.'

            })
        }


        const token = await generateJWT(user.id)




        
        res.json({
            msg: 'Todo ok.',
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo autentificar.'
        })
        
    }



}



module.exports = {
    login,
    googleLogin
}