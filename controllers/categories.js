const { Category } = require('../models');

class CategoriesController {

    static async getOneCategory(req, res){
        const {id} = req.params
        try {
            const getOneCategory = await Category.findByPk(id,{
              attributes: ['name','description','image']
            });
            if(getOneCategory)
            {
              res.status(200).json(getOneCategory);
            }else {
              res.status(404).json({ msg: 'Could not find category'});
            }
        } catch (error) {
          res.status(400).json(error);
        }            
    }
}

module.exports = CategoriesController;

