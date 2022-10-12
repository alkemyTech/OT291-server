const { Comment } = require('../models');

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

  /**
  * Asynchronously getAllComments comments from the database (table Comments)
  * @param   {Object} attributes - Attributes fields Ej: ['body', 'createdAt']
  * @returns {boolean}
  * @param   {Object} order - Order fields Ej: ['createdAt', 'ASC']
  * @returns {boolean}
  */  
  static async getAllComments(attributes, order)  {
    try {
        const getAllComments = await Comment.findAll({
          attributes,
          order,
        });
        return getAllComments;
    } catch (error) {
      throw error;              
    }
  }  
}

module.exports = CommentDao;
