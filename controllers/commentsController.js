const { Comments } = require('../models');
const CommentsDao = require('../dao/comments');

class CommentsControllers {
    static async getAllComments(req, res)  {
        const attributes = ['body'];
        const order = [['createdAt','DESC']];
        let getAllComments;
        try {
            getAllComments = await CommentsDao.getAllComments(attributes, order);
        } catch (error) {
          return res.status(404).json(error);
        }
        getAllComments.length
        ? res.status(200).json(getAllComments)
        : res.status(404).json({ msg: 'Could not find Comments' });
    }
}

module.exports = CommentsControllers;
