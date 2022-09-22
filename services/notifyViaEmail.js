require('dotenv').config();
const sgMail = require('@sendgrid/mail');
class NotifyViaEmail {

  static sendEmail = async (email, subject, contentHtml, ongLogo, organizationName, welcomeText, contactData) => {
       sgMail.setApiKey(process.env.API_KEY);
       await sgMail.send({
          to: email, 
          from: 'ongsomosfundacionmas@gmail.com', 
          subject: subject,
          html: contentHtml,
          personalizations: [
            {
              substitutions: {
              "%ongLogo%": ongLogo,
              "%organizationName%": organizationName,
              "%welcomeText%":welcomeText,
              "%contactData%":contactData
            },
            }
          ]          
    }); 
  }    
}
module.exports = NotifyViaEmail;