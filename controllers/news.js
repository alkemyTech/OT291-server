const NewDao = require("../dao/new")
class News {
    static async DetailNew(req, res) {
        try {
            const { id } = req.params
            const newData = await NewDao.findNewById(+id)
            if (!newData) return res.status(404).send("New wasn't found")
            return res.status(200).json(newData)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
};

module.exports = News;