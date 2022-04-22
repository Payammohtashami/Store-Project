const {HomeRoutes} = require("./api");
const {userAuthRoute} = require("./user/auth")
const router = require("express").Router();
router.use("/user", userAuthRoute)
router.use("/", HomeRoutes)
module.exports ={
    AllRoutes : router
}