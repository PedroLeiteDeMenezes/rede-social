import Comments from '../../models/comments'
import Post from '../../models/post';
import User from '../../models/user';

export async function validateUserId(req){
  try{
    const userExist = await User.findOne({ where: {id: req.userId} })
    return  !! userExist
  }catch(error){
    console.log('Error fetching user', error);
    throw new Error('Error checking user existence')
  }
}

export async function validatePostId(req) {
  try{
    const postExist = await Post.findOne({ where: {id: req.params.postId} })
    return !! postExist
  }catch(error){
    console.log('Error fetching post', error);
    throw new Error('Error checking post existence')
  }
}

// export async function comentsExist(req, res, next) {
//   console.log('Middleware CommentExist: req.userId', req.userId);
//   console.log('Middlware CommentExist: req.postId', req.params);
//   console.log('Middleware CommentExist: req.body', req.body);

//   const userId = parseInt(req.userId, 10);
//   const postId = parseInt(req.params.postId)

//   if(isNaN(userId) || isNaN(postId)) {
//     return res.status(400).json({error: 'Invalid userId or postId'})
//   }

//   try{
//     const comment = await Comments.findOne({
//       where:{
//         user_id: userId,
//         post_id: postId
//       },
//     })

//     console.log('comment found ',comment);
    

//     if(comment){
//       return res.status(409).json({error: 'Comment Already exist'})
//     }
    
//     next()
//   }catch(error){
//     console.log('Error checking like existence', error);
//     res.status(500).json({error: 'Internal Server Error'})
//   }
// }


export async function postIncremente(postId){
  if (isNaN(postId)){
    throw new Error('Invalid postId, must be a number')
  }

  try{
    await Post.increment('comments_count', {by: 1, where:{ id: postId}})
  }catch(error){
    console.log('Error incrementing comments_count', error);
    throw new Error('Error incrementing likes_count')
  }
}

export async function decrementComments(postId) {
  if(isNaN(postId)){
    throw new Error('Invalid postId, must be a number')
  }

  try{
    const post = await Post.findByPk(postId)
    if(!post){
      throw new Error('Post not found')
    }
    await Post.decrement('comments_count', {by: 1, where: {id: postId}})
  }catch(error){
    console.error('Error a decrementing comments_count', error);
    throw new Error('Error decrementing comments_count')
  }
}

export async function deleteComment(req, res, postId) {
  try{
    const comment = await Comments.findOne({where: {post_id: postId, user_id: req.userId}})
    if(!comment){
      return false;
    }

    await comment.destroy()
    return true
  }catch(error){
    console.error('Error deleting like', error);
    return false
  }
}