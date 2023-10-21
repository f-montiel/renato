import { Router } from "express";
import { login } from "../controllers/login.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/login").post(
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
    ],
    login
  );

export default router