import User from '../models/user'

export const checkUserPermission = async (req, res, next) => {
    try{
        //Verify if user exist
        const userId = req.userId
        console.log(userId);
        
        const user  = await User.findByPk(userId);
        console.log('checkuserpermission', user);
        

        if(!user){
            return res.status(404).json({ error: 'User not Found' })
        }

        //Verify if user have permission
        if (parseInt(user.id) !== parseInt(req.userId)) {
          console.log('Permission denied: User does not have permission to update this account');
          return res.status(403).json({ error: "You don't have permission to update this user" });
        }
    
        return next()
    }catch(error){
        return res.status(500).json({ error: error.message })
    }
}