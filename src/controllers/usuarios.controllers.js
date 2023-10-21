import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import bcrypt from "bcrypt";


export const listarUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find();
    res.status(200).json(listaUsuarios);
  } catch (error) {
    res.status(404).json({ mensaje: "no se pudieron encontrar los usuarios" });
  }
};

export const crearUsuarios = async (req, res)=>{
  try{
    //manejar los errores de la validación
    const errors = validationResult(req);
    //errors.isEmpty() devuelve false si hay errores
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
    }

    const {emailUsuario,password} = req.body;

    //verificar si el email ya existe
    //let usuario = await Usuario.findOne({email: req.body.email}); devuelve null
    let usuario = await Usuario.findOne({emailUsuario}); //devuelve null
    if (usuario){
      //si el usuario existe
      return res.status(400).json({mensaje: "Ya existe un usuario con el correo enviado",})
    }
    
      //guardamos el nuevo usuario en la BD
      usuario = new Usuario(req.body);
      //guardar el usuario en la BD con la pass encriptada, se le llama saltos al código, por eso "salt"
      const salt = bcrypt.genSaltSync(); //va a dar (10) vueltas, si quiero más Ej:(15)
      usuario.password = bcrypt.hashSync(password, salt);

      await usuario.save();

      res.status(201).json({mensaje:"usuario creado", usuario: usuario.nombreUsuario, uid: usuario._id})
  } 
  catch(error){console.log(error)
  res.status(400).json({mensaje: "El usuario no pudo ser creado",})}
}

export const borrarUsuarios = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ mensaje: "error, no se pudo borrar dicho usuario" });
  }
};
