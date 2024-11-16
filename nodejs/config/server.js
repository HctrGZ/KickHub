const express = require("express");
const cors = require('cors');
const connectDB = require("./database");

class Server{
    constructor(){
        this.port = process.env.PORT || 8080;
        this.app = express()
        this.corsOptions = {
            origin: [
                process.env.FRONTEND_URL
            ]
        }

        this.usersPath = "/api/users"
        this.sneakersPath = "/api/sneakers"

        
        this.middlewares()
        this.routes();
        connectDB();
    }

    routes(){
        this.app.use(this.sneakersPath, require ("../routes/sneakers"));
        this.app.use(this.usersPath, require ("../routes/users"));

        this.app.get("*", function(req, res){
            res.status(404).json({
                msg: "Ruta no encontrada"
            });
        })
        
        this.app.post("*", function(req, res){
            res.status(404).json({
                msg: "Ruta no encontrada",
            });
        })
    }

    middlewares(){
        this.app.use(cors(
            /* objeto** origen que va a poder haer uso de los recursos */
            this.corsOptions
        ));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;