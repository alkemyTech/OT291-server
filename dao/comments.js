const { Comment } = require('../models');

class CommentsDao {
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

module.exports = CommentsDao
