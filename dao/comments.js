const { Comment } = require('../models');

class CommentDao {
  /**
   * Asynchronously delete a comment from the database (table Comments)
   * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
   * @returns {boolean}
   */
  static async deleteComment(id) {
    const comment = await CommentDao.findComment(id);
      const deletedComment = await Comment.destroy({
        where: { id: comment.id },
      });
    return deletedComment;
  }

  static async findComment(id) {
      const foundComment = await Comment.findByPk(id);
      return foundComment;
  }
}

module.exports = CommentDao;
