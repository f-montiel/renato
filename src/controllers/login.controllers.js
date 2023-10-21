import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Login from "../models/login";

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //verificar si existe un mail como el recibido
    const { emailUsuario, password } = req.body;

    //verificar si el mail ya existe
    let usuario = await Login.findOne({ emailUsuario }); //devuelve null
    if (!usuario) {
      //si el usuario existe
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña inválidos -correo" });
    }
    //verificar si el password corresponde con el pass encriptado en mi DB
    const passwordValido = bcrypt.compareSync(password, usuario.password);

    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Email o contraseña inválidos - contraseña" });
    }

    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombreUsuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "Usuario o contraseña inválidos," });
  }
};
