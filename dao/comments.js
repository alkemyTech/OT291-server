const { Comments } = require('../models');

class CommentsDao {

 //   static async getAllComments({ where, include = [], order = [] })  {
    static async getAllComments()  {
        console.log('estoy en dao getAllComments')
        try {
            const getAllComments = await Comments.findAll()
            //     where: {id:true},
            //     attributes: {include:['body']},
            //     //order,
            // })
            console.log(getAllComments)            
        } catch (error) {
            console.log(error)
          throw error;              
        }
        return getAllComments;

    }
}

module.exports = CommentsDao