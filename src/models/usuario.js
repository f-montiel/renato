import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
  nombreUsuario:{type:String, required:true, minLength:3, maxLength:100},
  emailUsuario:{type:String, required:true, unique:true, minLength:10, maxLength:100},
  password:{type:String, required:true, minLength:5, maxLength:100},
  perfil:{type:String, default: "cliente"}
})

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;