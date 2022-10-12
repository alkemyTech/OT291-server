const { Comment } = require('../models');

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
}

module.exports = CommentDao;
