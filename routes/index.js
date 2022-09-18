var express = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { validarJWT } = require('../middlewares/validar_jwt');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/login', async ( req , res ) => {

const {email} = req.body

const token = await generarJWT(email)

res.send(token)

})

router.get('/signup', validarJWT, async ( req , res ) => {

res.send('prueba para validar jwt')

})

module.exports = router;
