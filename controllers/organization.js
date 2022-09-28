const { Organization, User } = require('../models/');
const UserDao = require('../dao/user.js');

class OrganizationController {
  static async findOrganization(req, res) {
    try {
      const response = await Organization.findOne({
        where: { name: 'Big Org' },
        attributes: ['name', 'image', 'phone', 'address'],
      });
      response === null
        ? res.status(404).json({ msg: 'Could not find information' })
        : res.status(200).json(response);
    } catch (error) {
      return error;
    }
  }

  static async updateOrganization(req, res) {
    try {
      const { name, image, phone, address, email, welcomeText, aboutUsText } =
        req.body;
      const organization = await Organization.findOne({
        where: { name: 'Big Org' },
      });

      if (!organization) {
        return res.status(404).json({
          msg: 'There is no organization',
        });
      }

      await organization.update({
        name,
        image,
        phone,
        address,
        email,
        welcomeText,
        aboutUsText,
      });

      return res.status(200).json({
        msg: `Organization info has been updated`,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error in db',
      });
    }
  }

  static async getUsersList(req, res) {
    try {
      const allUsers = await UserDao.getAllUsers([
        'id',
        'firstName',
        'lastName',
        'email',
      ])
      res.status(200).json(allUsers)
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = OrganizationController;
