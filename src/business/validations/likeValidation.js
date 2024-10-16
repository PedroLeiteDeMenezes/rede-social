import Post from '../../models/post';
import User from '../../models/user';
import Like from '../../models/like';

export async function validateUserId(req) {
  try {
    const userExist = await User.findOne({ where: { id: req.userId } }); // Use req.userId (com "Id")
    return !!userExist; // Retorna true se o usuário existe
  } catch (error) {
    console.log('Error fetching user:', error);
    throw new Error('Error checking user existence');
  }
}

export async function validatePostId(req) {
  try {
    const postExist = await Post.findOne({ where: { id: req.params.postId } }); // 'id' correto
    return !!postExist; // Retorna true se o post existe
  } catch (error) {
    console.log('Error fetching post:', error);
    throw new Error('Error checking post existence');
  }
}

export const likeExist = async (req, res, next) => {
  console.log('Middleware likeExist: req.userId', req.userId);
  console.log('Middleware likeExist: req.params', req.params); // Adicionando depuração

  const userId = parseInt(req.userId, 10);
  const postId = parseInt(req.params.postId, 10);

  // Validação
  if (isNaN(userId) || isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid userId or postId, must be a number' });
  }

  try {
    const like = await Like.findOne({
      where: {
        user_id: userId,
        post_id: postId,
      },
    });

    if (like) {
      return res.status(409).json({ error: 'Like already exists' });
    }

    next(); // Prossiga para o próximo middleware ou controlador
  } catch (error) {
    console.error('Error checking like existence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// No arquivo onde postIncrement está definido
export async function postIncrement(postId) {
  if (isNaN(postId)) {
      throw new Error('Invalid postId, must be a number');
  }

  try {
      await Post.increment('likes_count', { by: 1, where: { id: postId } });
  } catch (error) {
      console.error('Error incrementing likes_count:', error);
      throw new Error('Error incrementing likes_count');
  }
}

export async function decrementLikes(postId) {
  if(isNaN(postId)){
    throw new Error('Invalid postId, must be a number')
  }
  try{
    const post = await Post.findByPk(postId)
    if(!post){
      throw new Error('Post not found')
    }
    await Post.decrement('likes_count', {by: 1, where: {id: postId}})
  }catch(error){
    console.error('Error a decrementing like_count:', error);
    throw new Error('Error decrementing likes_count');
  }
}

export async function deleteLike(req, res, postId) {
  try {
    
    const like = await Like.findOne({ where: { post_id: postId, user_id: req.userId } });
    if (!like) {
      return false; // Retorne falso se não encontrar o like
    }

    await like.destroy();
    return true; // Retorne verdadeiro se a exclusão for bem-sucedida
  } catch (error) {
    console.error('Error deleting like', error);
    return false; // Retorne falso em caso de erro
  }
}