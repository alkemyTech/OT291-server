//const { Comments } = require('models');
const CommentsDao = require('../dao/comments')

class CommentsController {
    static async getAllComments(req, res)  {
        console.log('estoy en getAllComments controllers')
        const attributes = ['body'];
        let getAllComments;
        try {
            getAllComments = await CommentsDao.getAllComments();
        } catch (error) {
          return res.status(404).json(error)
        }
        res.status(200).json(getAllComments)
    }
};

module.exports = CommentsController;