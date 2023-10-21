import { Router } from "express";
import {
  listarUsuarios,
  crearUsuarios,
  borrarUsuarios,
} from "../controllers/usuarios.controllers";
import { check } from "express-validator";

const router = Router();
router
  .route("/usuarios")
  .get(listarUsuarios)
  .post(
    [
      check("emailUsuario")
        .notEmpty()
        .withMessage("El email es un dato obligatorio")
        .isEmail()
        .withMessage("Email inválido"),
      check("password")
        .notEmpty()
        .withMessage("La contraseña es un dato obligatorio")
        .isLength({ min: 5, max: 100 })
        .withMessage("La contraseña debe tener entre 5 y 100 caracteres"),
      check("nombreUsuario")
        .notEmpty()
        .withMessage("El nombre es un dato obligatorio")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe ser entre 3 y 100 caracteres"),
      check("perfil").notEmpty().withMessage("El perfil es un dato obligatorio"),
    ],
    crearUsuarios
  );
router.route("/usuarios/:id").delete(borrarUsuarios);

export default router;
