const ContactDao = require("../dao/contact")
const NotifyViaEmail = require("../services/notifyViaEmail")
class ContactController {
    static async createContact(req, res) {
        try {
            const { name, email, phone, message } = req.body
            const contactData = await ContactDao.createContact({ name, email, phone: phone ?? null, message: message ?? null })
            await NotifyViaEmail.sendEmail(email,"Hemos registrado tus datos con éxito",`Hola ${name} te agradecemos por registrar tus datos, pronto nos pondremos en contacto contigo.`)
            return res.status(201).json(contactData)
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}

module.exports = ContactController