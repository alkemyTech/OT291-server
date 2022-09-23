const {Activities} = require('../models')

class ActivitiesController {

    static async updateActivitie(req, res, next) {
        const { id } = req.params;
        const  body  = req.body;
        try {
          const updateActivitie = await Activities.findByPk(id);
          if(updateActivitie)      
            {
              await updateActivitie.update(body)
              res.status(200).json({ msg: 'Activitie update successfully' })
            }else {
              res.status(404).json({ msg: 'Could not find Activitie' });
            }
        } catch (error) {
          res.status(400).json(error);
        }
      }  
}

module.exports = ActivitiesController;