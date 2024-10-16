import Post from '../models/post';
import * as PostValidation from '../business/validations/postValidation';

class PostController {
  async post(req, res) {
    try {
      const  content  = req.body.content;
      const file = req.file || null
      const errors = await PostValidation.validateCreatePost(req.body, file, req);
      const user_id = req.userId

      console.log('user_id ', user_id);
      
      
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newPost = await Post.create({
        content,
        user_id,
        likes_count: 0,
        comments_count: 0,
      });
      
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post: ', error)
      res.status(500).json({ error: error.message });
    }
  }

  async getId(req, res) {
    try {
      const posts = await PostValidation.getPostByUserId(req, res)
      if(!posts || this.post.length === 0){
        return res.status(404).json({ message: 'No Posts found for this user' })
      }
      return res.status(200).json(posts); // Retorna os posts encontrados
    } catch (error) {
      return res.status(500).json({ error: error.message }); // Retorna um erro 500
    }
  }

  async deletePost(req, res){
    try{
      await PostValidation.deletePost(req, res)
    }catch(error){
      console.log('Error deleted post', error);
      return res.status(500).json({error: 'Internal Server Error'})
    }
  }

  async put(req, res){
    try{
      await PostValidation.updatedPost(req, res)
    }catch(error){
      console.log('Error updating post', error);
      res.status(500).json({error: error.message})
    }
  }
}

export default PostController;
