var mongoose = require("mongoose");
var bcrypt=require('bcryptjs');
var userSchema=mongoose.Schema({
  username:String,
  email: String,
  password: String,
  description:String
});
userSchema.pre('save',function(next){
 let user=this;
 if(!user.isModified('password')){
   return next();
 }
 bcrypt.hash(user.password, 10, function(err, hash) {
  if(err) return next(err);
  user.password=hash;
  next()
});
});

module.exports = mongoose.model("User",userSchema);
