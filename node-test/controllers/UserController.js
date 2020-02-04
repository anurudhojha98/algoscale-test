const userService=require('../services/userService')
module.exports={
    getUsers(req,res){
        try{
            userService.get().then((user)=>{
                return res.status(200).json(
                    user
                );
            }).catch((err)=>{
                return res.status(400).json(
                    {  
                        success:false,
                        message:err.message
                    }
                );
            })
        }catch(err){
            return res.status(500).json(
                {  
                    success:false,
                    message:err.message
                }
            );
        }
    },
    deleteUser(req,res){
        try{
            const {id}=req.params;
            userService.delete(id).then((user)=>{
                return res.status(200).json(
                    {  
                        success:true,
                        res:user
                    }
                );
            }).catch((err)=>{
                return res.status(400).json(
                    {  
                        success:false,
                        message:err.message
                    }
                );
            })
        }catch(err){
            return res.status(500).json(
                {  
                    success:false,
                    message:err.message
                }
            );
        }

    }
}