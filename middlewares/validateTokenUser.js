const { Token } = require("../helpers/token");


class ValidatejWtUser {

static async decryptTokenUser(req, res, next){
   
const {email} = req.body     
const token = Token.generateJWT(email)

//const token = Token.decryptJWT(req, res)



res.send(token)

 } 

 

}

module.exports = {
    ValidatejWtUser
}