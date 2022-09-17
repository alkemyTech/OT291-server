require('dotenv').config();
const sgMail = require('@sendgrid/mail');
class NotifyViaEmail {
  constructor(email, subject, contentHtml){
    this.email=email;
    this.subject=subject;
    this.contentHtml=contentHtml;
  }  
    sendEmail = async () => {
       sgMail.setApiKey(process.env.API_KEY);
       await sgMail.send({
          to: email, 
          from: 'ongsomosfundacionmas@gmail.com', 
          subject: subject,
          html: contentHtml
    }); 
  }    
}
module.exports = NotifyViaEmail;