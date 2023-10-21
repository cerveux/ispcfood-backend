const { Schema, model } = require('mongoose')


const roleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    }

})




module.exports = model("role", roleSchema)