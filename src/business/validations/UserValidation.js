import User from '../../models/user'

export async function validateCreateUser(data){
  const errors = []

  if(!data.first_name || typeof data.first_name !== 'string'){
    errors.push('First name is required and mud be a string')
  }

  if (!data.last_name || typeof data.last_name !== 'string') {
    errors.push('Last name is required and must be a string.');
  }

  if (!data.email || typeof data.email !== 'string' || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('A valid email is required.');
  }

  if (!data.password || data.password.length < 6) {
    errors.push('Password is required and must be at least 6 characters.');
  }

  const userExist = await User.findOne({ where: {email: data.email} });
  if(userExist){
    errors.push('A user With tis email already exists')
  }

  return errors;
}

export async function validateLoginUser(data){
  const errors = []
  const {email, password} = data

  if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('A valid email is required.');
  }

  if(!password){
    errors.push('Password is required')
  }

  const user = await User.findOne({ where: {email: email} });
  if(!user){
    errors.push('Invalid credencials')
  }

  return {errors, user}
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id; // Obtém o ID do parâmetro da URL
    console.log('Updated USer with id', userId);
    

    // Busca o usuário no banco de dados
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not Found' });
    }

    // Atualiza o usuário com os dados recebidos no corpo da requisição
    const userUpdate = await user.update(req.body);
    return res.json(userUpdate);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


export async function getId(req, res) {
  try{
    const user = req.params.id //Take id
    console.log("User id", user);

    //Search a user in database  
    const getUser = await User.findByPk(user)
    if(!getUser){
      return res.status(404).json({error: 'User not found'})
    }

    return res.json(getUser)
  }catch(error){
    console.error('Error get user', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAll(req, res) {
  try{
    const {page = 1, limit = 10} = req.query;
    const offset = (page - 1) * limit;

    const getUserAll = await User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'date_of_birth', 'image'],
      limit,
      offset,
    })

    return res.json(getUserAll)
  }catch(error){
    console.error('Erro get all user', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteUser(req, res) {
  try{
    const userId = req.params.id
    console.log('Deleted User with id', userId);

    //Search a user in database
    const user = await User.findByPk(userId);
    if(!user){
      return res.status(404).json({error: 'User not Found'})
    }

    //Delete User
    await user.destroy()
    return res.json({message: `User with id ${userId} deleted succesfully`})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}