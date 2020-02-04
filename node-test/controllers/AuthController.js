const authService=require('../services/authService')
module.exports={

    signUp(req,res){
        try{
            const userDetails=req.body;
            authService.userSignUp(userDetails).then((user)=>{
                return res.status(201).json(
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
            return res.status(401).json(
                {  
                    success:false,
                    message:err.message
                }
            );
        }
    },
    login(req,res){
        try{
            const userDetails=req.body;
            authService.userLogin(userDetails).then((user)=>{
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
            return res.status(401).json(
                {  
                    success:false,
                    message:err.message
                }
            );
        }
    }
}