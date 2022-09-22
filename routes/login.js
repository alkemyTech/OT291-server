var express = require('express');
const fs = require('fs')
const NotifyViaEmail = require('../services/notifyViaEmail');

const filename = "/Academias/Alkemy/Aceleración/OT291-server/assets/email/plantilla_email.html";

var router = express.Router();

/* GET users listing. 
El asunto de un email (subject, en inglés), es la línea visible desde la bandeja de entrada por parte 
del suscriptor, que le indicará de qué trata el contenido del correo electrónico recibido.
*/
router.get('/', async function(req, res, next) {
  email='johannes.gomez@gmail.com'
  subject='Johannes'
  organizationName='SOMOS MAS'
  contentHtml = fs.readFileSync(filename, 'utf-8', (err, data) => data);
  NotifyViaEmail.sendEmail(email,subject,contentHtml,organizationName);
  res.send('respond with a resource email enviado....');
});

module.exports = router;