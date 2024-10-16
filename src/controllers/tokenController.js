import * as UserValidation from '../business/validations/UserValidation';
import jwt from 'jsonwebtoken';

class TokenController {
  async post(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid email or password'],
      });
    }

    const user = await UserValidation.userExist(email);

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid User'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid Password'],
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },   // Payload do token
      process.env.TOKEN_SECRET,             // Chave secreta do token
      { expiresIn: process.env.TOKEN_EXPIRATION }  // Tempo de expiração do token
    );

    return res.json({
      token,
      user: { id: user.id, name: user.first_name, email: user.email },
    });
  }
}

export default new TokenController();
