import Like from '../models/like'
import { postIncrement, deleteLike, decrementLikes } from '../business/validations/likeValidation'; 


class LikeController {
  static async post(req, res) {
    const userId = req.userId; // Isso deve estar definido pelo middleware LoginRequired
    const postId = parseInt(req.params.postId, 10);

    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid postId' });
    }

    try {
      // Cria um novo like
      const newLike = await Like.create({
        user_id: userId,
        post_id: postId,
      });

      // Incrementa o contador de likes no post
      await postIncrement(postId);

      return res.status(201).json(newLike);
    } catch (error) {
      console.error('Error creating like:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async delete(req, res) {
    const postId = parseInt(req.params.postId);
  
    if (isNaN(postId)) {
      return res.status(400).json({ error: 'Invalid postId' });
    }
  
    try {
      const likeDeleted = await deleteLike(req, res, postId); // Passe o postId aqui
      if (!likeDeleted) {
        return res.status(404).json({ error: 'Like not found or could not be deleted' });
      }
  
      await decrementLikes(postId); // Certifique-se de que decrementLikes funcione corretamente
      return res.json({ message: 'Like deleted successfully' }); // Adicione uma resposta de sucesso aqui
    } catch (error) {
      console.error('Error delete like', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default LikeController;