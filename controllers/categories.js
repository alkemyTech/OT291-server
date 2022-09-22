const { Category } = require('../models');

class CategoriesController {

    static async getOneCategory(req, res, next){
        const {id} = req.params
        try {
            const getOneCategory = await Category.findByPk(id);
            if(getOneCategory)      
            {
              res.status(200).json(getOneCategory);
            }else {
              res.status(404).json({ msg: 'Could not find category' });
            }
        } catch (error) {
          next(error);
        }            

    }
}

module.exports = CategoriesController;