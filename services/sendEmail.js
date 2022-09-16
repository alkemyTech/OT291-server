require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const sendMail = async (email) => {
   sgMail.setApiKey(process.env.API_KEY);
       await sgMail.send({
       to: email, 
       from: 'ongsomosfundacionmas@gmail.com', 
       subject: 'Bienvenidos ONG SOMOS MAS',
       html: 
       "<p>Estamos muy complacidos de su visita a nuestra ONG SOMOS MAS.<br />"+
       "Siempre serás bienvenido a nuestro sitio web. https://somosfundacionmas.app"
      }); 
  }
  module.exports = sendMail;