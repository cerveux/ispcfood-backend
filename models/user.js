const { Schema, model} = require('mongoose')



const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    usuario: {
        type: String,
        required: [true, 'usuario is required'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'telefono is required']
    },
    mail: {
        type: String,
        required: [true, 'E-mail is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'The role is required.'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

usuarioSchema.methods.toJSON = function (){
    const { __v, _id, password, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario
}

module.exports = model('usuario', usuarioSchema)