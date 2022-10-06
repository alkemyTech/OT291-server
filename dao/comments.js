const MapperResponse = require('../utils/formatResponse');
const { Comment } = require('../models');
class CommentDao {
    static async createComment(body) {
        try {
            const comment= await Comment.create(body)
            const result = MapperResponse.cleanDataDb(comment)
            return result
        } catch (error) {
            console.log(error);
            throw new Error("NO se pudo crear el comentario")
        }
    }
}

module.exports = CommentDao;
