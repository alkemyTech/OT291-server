const NewDao = require('../dao/new.js');

class NewsController {
    static async findById(req, res) {
        try {
            const id = req.params.id
            const detailNew = await NewDao.findById(+id)
            return res.status(200).json(detailNew)
        } catch (error) {
            res.status(404).send(error)
        }
    }
};

module.exports = NewsController;