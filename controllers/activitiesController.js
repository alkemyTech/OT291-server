const { Activities } = require('../models');

class ActivitiesController {
  static async createActivities(req, res) {
    const { name, content, image } = req.body;

    try {
      const createActivity = await Activities.create({
        name,
        content,
        image,
      });

      return res.status(201).json({
        msg: 'activity created successfully',
        activity: createActivity,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = ActivitiesController;
