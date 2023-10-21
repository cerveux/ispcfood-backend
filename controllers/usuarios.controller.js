const { response, request } = require('express')
const bcrypt = require('bcrypt');

const { User } = require('../models');

/* cyn */

const usuariosGet = async (req = request, res = response)=> {
    // const {nombre, page = 1, limit} = req.query

    const { limit = 5, from = 5} = req.query;
    const query = {state: true}

  

    const [total, usuarios] = await Promise.all([
        User.count(query),
        User.find(query)
        .limit(Number(limit))
        .skip(Number(from))

    ])
    
    res.json({
        total,
        usuarios
    })
}

/* const id = 35283980 */

const usuariosPost = async (req, res)=> {

    

    const { nombre, usuario, mail, telefono, password, role } = req.body;
    const user = new User({ nombre, usuario, mail, telefono, password, role })

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    try {
        await user.save()        
    } catch (error) {
        console.log(error);
        
    }

    return res.json({
        'ok': true,
        'msg': 'Base de dato actualizada.',
        user
    })
}

const usuariosPut = async (req, res)=> {

    const { id } = req.params;
    const { _id, password, mail, google, ...rest } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt)

    }


    await User.findByIdAndUpdate(id, rest)
    
    res.json({
        'ok': true,
        'msg': 'Usuario actualizado.'
    })
}

const usuariosDelete = async (req, res)=> {
    const loggedUser = req.user;
    const { id } = req.params

    const user = await User.findByIdAndUpdate( id, {"state": false} )
    res.json(user)
    
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}