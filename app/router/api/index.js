const homeController = require("../../http/controllers/api/home.controller");
const router = require("express").Router();

/**
 * @swagger
 * tags :
 *  name : IndexPage
 *  description: first swagger route
 */
/**
 * @swagger
 * /:
 *  get:
 *      summery : index of routes
 *      tags : [IndexPage]
 *      description : get all need data for index page
 *      responses :
 *          200 : 
 *              description : success
 *          404 : 
 *              description : not found
 */

router.get("/" , homeController.indexPage);

module.exports = {
    HomeRoutes: router,
}