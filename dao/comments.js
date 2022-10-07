const { Comment } = require('../models');

class CommentDao {
  /**
   * Asynchronously delete a comment from the database (table Comments)
   * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
   * @returns {boolean}
   */
  static async deleteComment(where) {
    try {
      const comment = await CommentDao.findComment(where)
      const deleteComment = await Comment.destroy(comment.id)
    } catch (error) {
      throw Error('Something went wrong');
    }
  }

  static async findComment(id) {
    const foo = await Comment.findByPk(id)
    return foo;
  }
}

module.exports = CommentDao;
