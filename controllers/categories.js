const {Category} =require("../models")

class CategoriesController {
    static async getAll(req,res){
        try {
            const categories=await Category.findAll({attributes: ['name']})
            return  res.status(200).json(categories)   
        } catch (error) {
            return res.send(500).send(error)
        }
    }
}

module.exports = CategoriesController;