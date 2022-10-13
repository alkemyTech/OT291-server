const { Comment } = require('../models');
const MapperResponse = require('../utils/formatResponse');
class CommentDao {
  /**
   * Asynchronously delete a comment from the database (table Comments)
   * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
   * @returns {boolean}
   */
  static async deleteComment(id) {
    try {
      const deletedComment = await Comment.destroy({
        where: { id },
      });
      return deletedComment;
    } catch (error) {
      return error;
    }
  }

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
  static async updateComment(where, data) {
    try {
      const commentUpdated = await Comment.update(data, {
        where: where,
      });

      if (commentUpdated[0] < 1) {
        return 'Comment not found';
      }

      return 'Comment updated succesfully';
    } catch (error) {
      throw new Error('Error Comment not updated');
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
