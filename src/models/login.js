import mongoose, {Schema} from "mongoose";

const loginSchema = new Schema({
  emailUsuario:{type:String, required:true, unique:true, minLength:10, maxLength:100},
  password:{type:String, required:true, minLength:5, maxLength:100}
})

const Login = mongoose.model('login', loginSchema);

export default Login;