const { Comment } = require('../models');
const MapperResponse = require('../utils/formatResponse');
class CommentDao {
  static async listCommentsByPost(id) {
    try {
      const comments = await Comment.findAll({
        where: {
          post_id: id,
        },
        attributes: ['body'],
      });
      return comments.length ? comments : 'No matches found';
    } catch (error) {
      throw new Error('Error. The query could not be performed.');
    }
  }
  static async createComment(body) {
    try {
      const comment = await Comment.create(body);
      const result = MapperResponse.cleanDataDb(comment);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('NO se pudo crear el comentario');
    }
  }
}

module.exports = CommentDao;
