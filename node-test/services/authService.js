const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../models/User');
const config=require('../config/config');
const message=require('../common/message')
module.exports={

 async userSignUp(userDetail){
   let existUser =await User.findOne({email:userDetail.email});
   if(!existUser){
    var user = new User(userDetail);
    let savedUser=await user.save();
    if(savedUser){
        let payload={id:savedUser._id};
        let token=jwt.sign(payload,config.SECRET_KEY,{expiresIn:'5h'});
        return {savedUser,token}
    }
   }else{
       throw new Error(message.ALREADY_EXISTS)
   }
 },
 async userLogin(userDetail){
    let user =await User.findOne({email:userDetail.email});
    if(!user){ 
      throw new Error(message.INVALID_EMAIL_PASSWORD);
    }else{
          let hashedPassword=this.hashPassword(userDetail);
          if(hashedPassword){
            let payload = { id: user._id };
            var token = jwt.sign(payload,config.SECRET_KEY,{expiresIn:'5h'});
            return {user,token}
          }
  }
 },
 async hashPassword(user){
    return await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10,(err, hash) =>{
          if (err) reject(err)
          resolve(hash)
        });
      })
      
 }

}