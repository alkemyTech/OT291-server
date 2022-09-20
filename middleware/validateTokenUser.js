const { Token } = require("../helpers/token");

class ValidatejWtUser {

static decryptTokenUser(req, res){
    
const decrypt =  Token.decryptJWT()

console.log(decrypt)

 } 


}

module.exports = {
    ValidatejWtUser
}