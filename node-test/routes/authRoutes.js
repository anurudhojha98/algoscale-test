
const authController=require('../controllers/AuthController');
const {userSignUpValidation,userLoginValidation,validate}=require('../middlewares/validator')
module.exports=(app,router)=>{

    router.post('/signup',userSignUpValidation(),validate,authController.signUp);

    router.post('/login',userLoginValidation(),validate,authController.login);

    app.use('/auth',router)
}