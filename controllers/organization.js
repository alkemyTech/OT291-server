const { Organization } = require('../models/');

class OrganizationController {
  static async showPublicInformation() {
    try {
      const findOrganization = await Organization.findOne({
        where: { name: 'Big Org' },
        attributes: ['name', 'image', 'phone', 'address'],
      });
      return findOrganization;
    } catch (error) {
      return error;
    }
  }
}

module.exports = OrganizationController;
