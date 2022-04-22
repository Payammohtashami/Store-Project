const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");
const createError = require("http-errors")
module.exports = new class HomeController extends Controller{
    async indexPage(req,res,next){
        try {
            return res.status(200).send("Index Page Store " + this.testMethod())
        } catch (error) {
            next(error);  
        }
    }
}