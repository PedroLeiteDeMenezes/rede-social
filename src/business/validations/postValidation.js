import Post from '../../models/post';
import User from '../../models/user';

export async function validateCreatePost(data, file, req) {
  const errors = [];

  // Verifica se o conteúdo está vazio ou não é uma string
  if (!data.content || typeof data.content !== 'string') {
    errors.push('Empty content');
  }

  // Verifica se o conteúdo excede 255 caracteres
  if (data.content.length > 255) {
    errors.push('Content exceeds the predetermined text size');
  }

  try {
    // Verifica se o usuário existe usando o `user_id` obtido do middleware
    const userExist = await User.findOne({ where: { id: req.userId } });
    if (!userExist) {
      errors.push("User doesn't exist");
    }
    console.log('User Found', userExist);
    
  } catch (error) {
    console.error('Error fetching user:', error);
    errors.push('Error checking user existence');
  }

  // Validação de arquivo (opcional)
  if (file && !validateImageExtension(file)) {
    errors.push("Invalid file extension. Allowed types are jpg, jpeg, png, gif.");
  }

  return errors;
}

export async function getPostByUserId(req,res){
  try{
    const userId = req.params.id

    const posts = await Post.findAll({where:{user_id: userId}})

    if(posts.length === 0){
      return res.status(404).json({message: 'No posts found for this user'})
    }
    return posts
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

export async function deletePost(req, res) {
  try{
    const postId = req.params.id
    console.log('Post id', postId);
    
    //Search a post in database 
    const post = await Post.findByPk(postId)
    if(!post){
      return res.status(404).json({error: 'Post not Found'})
    }

    //Delete Post
    await post.destroy()
    return res.json({message: `Post with id ${postId} deleted succesfully`})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

export async function updatedPost(req, res) {
  try{
    const postId = req.params.id
    console.log("To pegando o id",postId);
    

    if(!postId){
      throw new Error('Post not found')
    }

    const [updatedRows] = await Post.update(req.body,{
      where: {id: postId}
    })
    
    if (updatedRows === 0){
      return res.status(400).json({error: 'Post not update'})
    }

    const updatedPost = await Post.findByPk(postId)
    return res.json(updatedPost)
    
  }catch(error){
    console.error('Error a Updated Post', error);
    throw new Error('Error a updated Post')
  }
}

function validateImageExtension(file) {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension);
}
