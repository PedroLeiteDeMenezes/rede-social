import User from '../models/user';
import * as UserValidation from '../business/validations/UserValidation';
import jwt from 'jsonwebtoken'


class UserController {
  async post(req, res) {
    try {
      const { first_name, last_name, email, password, date_of_birth } = req.body;

      const errors = await UserValidation.validateCreateUser(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password, 
        date_of_birth,
      });
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    // Valida as credenciais do usuário
    const { errors, user } = await UserValidation.validateLoginUser({ email, password });
    if (errors.length > 0) {
      return res.status(401).json({ errors });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  }

  async put(req, res){
    try{
      console.log('User iD', req.params.id);
      console.log('Request Body', req.body);
      await UserValidation.updateUser(req, res)
    }catch(error){
      console.log('Error updating user', error);
      return res.status(500).json({error: 'Internal Server Error'})
    }
  }

  async getbyId(req, res){
     try{
      const userId = req.params.id
      console.log('User iD', userId);

      const user = await UserValidation.getId(req, res)

      if(!user){
        return
      }      
     }catch(error){
      console.log('Error a get User id', error);
      return res.status(500).json({error: 'Internal server error'})
     }
   }

   async getAll(req, res){
    try{
      await UserValidation.getAll(req, res)
    }catch(error){
      console.log('Error get all users', error);
      return res.status(500).json({error: 'Internal Sever error'})

    }
   }

   async deleteUser(req, res){
    try{
      await UserValidation.deleteUser(req, res)
    }catch(error){
      console.log('Error deleted User', error);
      return res.status(500).json({error: 'Internal Server Error'})
    }
   }
}



export default new UserController();