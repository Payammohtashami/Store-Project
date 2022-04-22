const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    first_name : {type : String , required : true },
    last_name : {type : String , required : true},
    username : {type : String ,  lowercase : true},
    phone : {type : String},
    email : {type : email , lowercase : true},
    password : {type : String},
    otp : {type : Object ,default : {
        code : "",
        expires : new Date().getDate + 120
    }},
    bills : {type : [] ,default : []},
    discount : {type : Number , default : 0},
    birthday : {type : String},
    roles : {type: [String] , default : ["USER"]}
})

module.exports ={
    UserModel : mongoose.model("user" ,Schema)
}