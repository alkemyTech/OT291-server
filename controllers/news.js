const { New } = require('../models');

class NewsController {
    static async findById(req,res){
        const id=req.params.id
        const detailNew =await New.findByPk(+id)
        if(!detailNew){
            res.status(404).send("New was not found")
            return 
        }
        res.status(200).json(detailNew)

        return 
    }
};

module.exports = NewsController;