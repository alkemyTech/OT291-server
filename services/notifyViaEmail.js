require('dotenv').config();
const path = require("path")
const fs = require("fs")
const sgMail = require('@sendgrid/mail');
class NotifyViaEmail {
  static logo = "https://firebasestorage.googleapis.com/v0/b/aplication1-35a9f.appspot.com/o/LOGO-SOMOS%20MAS.png?alt=media&token=0f852ec5-0c90-42af-aead-7ebe0f0b893a"
  static organizationName = "SOMOS MAS"
  static contactData = "ongsomosfundacionmas@gmail.com"
  static HtmlToString() {
    try {

      return fs.readFileSync(path.resolve("assets/email/plantilla_email.html"), { encoding: "utf-8" }, (err, data) => {
        if (err) {
          return err
        }
        return data
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  static async sendEmail(email,subject,body) {
    sgMail.setApiKey(process.env.API_KEY);
    await sgMail.send({
      to: email,
      from: NotifyViaEmail.contactData,
      subject: subject,
      html: NotifyViaEmail.HtmlToString(),
      personalizations: [
        {
          to: [{
            "email": email
          }],
          substitutions: {
            "ongLogo": NotifyViaEmail.logo,
            "organizationName": NotifyViaEmail.organizationName,
            "body": body,
            "contactData": NotifyViaEmail.contactData
          },
        }
      ]
    });
  }
}
module.exports = NotifyViaEmail;