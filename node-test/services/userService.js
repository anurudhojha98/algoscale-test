const User=require('../models/User');
const message=require('../common/message')
module.exports={

    async get(){
     return await User.find({},['id','username','email']);
    },
    async delete(id){
        let deletedUser=await User.findByIdAndDelete(id);
        if(deletedUser){
            return deletedUser;
        }else{
         throw new Error(message.USER_NOT_FOUND)
        }
    }
}