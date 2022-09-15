const { Organization } = require('../models/');

class OrganizationController {
  async showPublicInformation() {
    const findOrganization = await Organization.findOne();
    return {
      name: findOrganization.name,
      image: findOrganization.image,
      phone: findOrganization.phone,
      address: findOrganization.address,
    };
  }
}

module.exports = OrganizationController;

