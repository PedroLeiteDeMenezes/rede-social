import Comments from '../models/comments';
import { decrementComments, deleteComment, postIncremente } from '../business/validations/commentsValidation'

class CommentController{
  static async post(req, res){
    const userId = req.userId;
    const postId = req.params.postId
    const {content} = req.body

    if(isNaN(postId)){
      return res.status(400).json({error: 'Invalid postId'})
    }

    try{
      //Cria um novo Comment
      const newComment = await Comments.create({
        user_id: userId,
        post_id: postId, 
        content: content
      })

      await postIncremente(postId)
      
      return res.status(201).json(newComment)
    }catch(error){
      console.error('Error creating Comment', error);
      return res.status(500).json({error: 'Internal Server Error'})
    }
  }
  static async delete(req, res) {
    const postId = parseInt(req.params.postId)

    if(isNaN(postId)){
      return res.status(400).json({error: 'Invalid Post Id'})
    }

    try{
      const commentDeleted = await deleteComment(req, res, postId)
      if(!commentDeleted){
        return res.status(404).json({error: 'Comment not found or could not be deleted'})
      }

      await decrementComments(postId)
    }catch(error){
      console.error('Error deleted comment', error);
      return res.status(500).json({error: 'Internal Server Error'})
    }
  }
}

export default CommentController