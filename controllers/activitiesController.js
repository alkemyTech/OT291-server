const { Activities } = require('../models');

class ActivitiesController {
  static async createActivities(req, res) {
    const { name, content, image } = req.body;

    try {
      const activityExist = await Activities.findOne({
        where: {
          name,
          content,
        },
        attributes: ['name'],
      });

      if (activityExist) {
        return res.json({ msg: 'activity already exists' });
      } else {
        const createActivity = await Activities.create({
          name,
          content,
          image,
        });

        return res.status(201).json({
          msg: 'activity created successfully',
          activity: createActivity,
        });
      }
    } catch (error) {
       return error;
    }
  }
}

module.exports = ActivitiesController;