import mongoose from "mongoose";
const {Schema } = mongoose;
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
   username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
   },
   email: {
    type: String,
    lowercase: true,
    required: true,
    unique : true,
    index: {unique : true}
   },
   password : {
        type: String,
        required: true
   },
   tokenConfirm: {
    type: String,
    default: null
   },
   acountConfirmed: {
    type: Boolean,
    default : false
   }
});
userSchema.pre('save', async function(next){
   
   const user = this;
   if(!user.isModified('password')) return next();
   try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
   } catch (error) {
      throw new Error("error al codificar la contraseña");
   }
});
userSchema.methods.comparePassword =  async function(candidatePassword){

   return await bcrypt.compare(candidatePassword, this.password);

}
export default mongoose.model('User', userSchema);

