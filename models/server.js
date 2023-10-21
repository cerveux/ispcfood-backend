const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectDB } = require('../database/config.db.js')


class Server{

    
    constructor(){
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            categoryPath: '/api/category',
            productsPath: '/api/product',
            searchPath: '/api/search',
            uploadPath: '/api/uploads',
            usersPath: '/api/usuarios',
        }

        
        this.dbConnect()

        this.middlewares() //los middlewares deben de ejecutarse antes que las rutas 

        this.routes()
    }

    async dbConnect(){
        await connectDB()
    }

    middlewares(){
        /* CORS */
        this.app.use(cors())

        this.app.use( express.json() )

        this.app.use(express.static(('public')))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){    
        this.app.use( this.paths.authPath, require('../routes/auth.routes.js'));
        this.app.use( this.paths.usersPath, require('../routes/usuarios.routes.js'));  
    }


    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`App running at port: ${this.port}`);
        })
    }
}

module.exports = Server;