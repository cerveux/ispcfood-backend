const { request, response } = require("express");



const validateAdminRole = (req = request, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'Disculpe las molestias hemos tenido un problema y no pudimos validar su usuario.'
        })
    }

    const loggedUser = req.user;
    if( loggedUser.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Usted no posee permisos de borrado en la base de datos.'
        })
    }
    next()
}

const validateRoles = (...roles) => {
    
    return (req, res, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: 'Disculpe las molestias hemos tenido un problema y no pudimos validar su usuario.'
        })
    }

    if(!roles.includes(req.user.role)){
        return res.status(401).json({
            msg: 'Su tipo de usuario no cuenta permisos para realizar esta operación.'
        })
    }






        next()
    }


}


module.exports = {
    validateAdminRole,
    validateRoles
}