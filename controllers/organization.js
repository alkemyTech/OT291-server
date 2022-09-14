const Organization = require("../models/organization");

module.exports = class OrganizationController {
  constructor() {}

  findAllOrgs() {
    try {
      const organizations = new Organization.findAll();
      return organizations;
    } catch (error) {
      return error;
    }
  }
};
