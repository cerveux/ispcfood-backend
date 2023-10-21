const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');




const roleValidator = async (rol) => {
    const findRole = await Role.findOne( { rol })
    if(!findRole){
        throw Error(`El rol ${rol} no existe en nuestra base de datos`)
    }
}

const existsMail = async (mail) => {
    const findEmail = await User.findOne({mail})
    if(findEmail){
        throw Error(`Ya existe un usuario registrado con ese mail.`)        
    }
}

const existsUser = async ( usuario ) => {
    const findUser = await User.findOne({usuario})
    if(findUser){
        throw Error(`Ese nombre de usuario ya existe.`)        
    }
}

const existsUserId = async (id) => {
    const findId = await User.findById(id);
    if(!findId){
        throw new Error('No hay un usuario con ese Id en la base de datos.')
    }
}

const existsCategoryId = async ( id = '' ) => {
    const findId = await Category.findById( id );
    if(!findId){
        throw new Error('No existe categoria que se corresponda con ese ID.')
    }
}

const existsProductId = async ( id = "" ) => {
    const findId = await Product.findById( id );
    if(!findId){
        throw new Error('No existe un producto con el id proporcionado.')
    }
}

const isValidColection = async (colection, colections = []) => {
    if(!colections.includes(colection)){
        throw new Error('No es una colección válida.')
    }

}




module.exports = {
    roleValidator,
    existsMail,
    existsUser,
    existsUserId,
    existsCategoryId,
    existsProductId,
    isValidColection
}