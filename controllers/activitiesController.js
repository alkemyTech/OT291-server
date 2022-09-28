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

  static async updateActivities(req, res) {
    const { id } = req.params;
    const  {name, content, image }  = req.body;
    let updateActivities;
    try {
         [updateActivities] = await Activities.update(
          {name, content, image},
          {where:{id}}
         )
    } catch (error) {
      return res.status(400).json(error);
    }
    if(updateActivities) return res.status(200).json({activities:{name,content,image}})
    return res.status(404).json({ msg: 'Could not find Activitie' });
  }  
}

module.exports = ActivitiesController;
