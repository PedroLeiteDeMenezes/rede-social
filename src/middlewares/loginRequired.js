import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id; // Certifique-se de usar 'userId' com 'Id' minúsculo
    console.log('User id definido login required', req.userId);
    req.userEmail = email;
    return next();
  } catch {
    return res.status(401).json({
      errors: ['Expired token or invalid'],
    });
  }
};
