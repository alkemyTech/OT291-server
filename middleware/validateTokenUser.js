const { Token } = require("../helpers/token");
const {Response} = require("express")

class ValidatejWtUser {

static async decryptTokenUser(req, res = Response, next){
    
Token.decryptJWT()


 } 

 

}

module.exports = {
    ValidatejWtUser
}