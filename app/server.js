const { error } = require("console");
const express = require("express");
const {default: mongoose} = require("mongoose");
const path = require("path");
module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT,DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplicatin();
        this.connectToMongoDB();
        this.createServer();
        this.createRoute();
        this.errorHandling();
    }
    configApplicatin(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..',"public")))
    }
    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT , () => {
            console.log(`http://localhost:${this.#PORT}`);
        })
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI, (error) => {
            if(!error) return console.log("conected to data-base");
            return console.log("faild to connect to data-base");
        })
    }
    createRoute(){

    }
    errorHandling(){
        this.#app.use((req,res,next) => {
            return res.status(404).json({
                statusCode: 404,
                message: "Page Not found"
            })
        })
        this.#app.use((error,req,res,next) => {
            const statusCode = err.status || 500;
            const message = err.message || "InternalServer Error";
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}