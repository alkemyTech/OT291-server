const { Comments } = require('../models');
const CommentDao = require("../dao/comments")
class CommentsController {
    static async createComment(req,res){
        const {body,news_id,user_id}=req.body
        try {
            const comment=await CommentDao.createComment({body,news_id,user_id})  
            return res.status(200).json(comment)          
        } catch (error) {
            res.status(500).send("error al crear comentario")
        }
    }
}

module.exports = CommentsController;