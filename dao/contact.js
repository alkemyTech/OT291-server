const { Contact } = require("../models/")
class ContactDao {
    static async createContact(body) {
        try {
            const ContactData = await Contact.create( body )
            return ContactData
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ContactDao