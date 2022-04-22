const express = require("express");
const {default: mongoose} = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const {AllRoutes} = require("./router/router");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerjsdoc = require("swagger-jsdoc");

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
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..',"public")))
        this.#app.use("/api-doc" , swaggerUI.serve , swaggerUI.setup(swaggerjsdoc({
            swaggerDefinition : {
                info : {
                    title : "Store",
                    version : "1.0.0",
                    description : "اولین پروژه بک اند"
                },
                servers : [
                    {
                        url : "http://localhost:5000"
                    }
                ]
            },

            apis : ["./app/router/*/*.js"]
        })))
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
            return console.log(error.message);
        })
        mongoose.connection.on("connected" , () => {
            console.log("mongoose connected to DB");
        })
        mongoose.connection.on("disconnected" , () => {
            console.log("mongoose connection is disconnected");
        })
        process.on("SIGINT" , async() => {
            await mongoose.connection.close();
            console.log("disconnected");
            process.exit(0);
        })
    }
    createRoute(){
        this.#app.use(AllRoutes)
    }
    errorHandling(){
        this.#app.use((req,res,next) => {
            next(createError.NotFound("Page not found"))
        })
        this.#app.use((error,req,res,next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                data : null,
                erroe : {
                    statusCode,
                    message
                }
            })
        })
    }
}