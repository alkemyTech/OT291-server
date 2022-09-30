const { request, response } = require('express');

const { Member } = require('../models');

class MemberController {
  static async getMembers(req, res) {
    try {
      const members = await Member.findAll({
        attributes: [
          'name',
          'facebookUrl',
          'instagramUrl',
          'linkedinUrl',
          'image',
          'description',
        ],
      });

      if (!members) {
        return res.status(404).json({
          msg: 'There is no registered members',
        });
      }
      return res.status(200).json({
        members,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'error while searching in db',
        error,
      });
    }
  }
}

module.exports = MemberController;
