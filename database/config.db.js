const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conectado a la base de datos con éxito.');
        
    } catch (error) {
        throw new Error(error)
        
    }
}

module.exports = {
    connectDB
}