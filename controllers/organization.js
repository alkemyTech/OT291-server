const { Organization } = require('../models/');

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
}

module.exports = OrganizationController;
