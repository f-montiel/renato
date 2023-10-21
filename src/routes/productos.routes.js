import { Router } from 'express';
import { listarProductos, crearProducto, obtenerProducto, borrarProducto, editarProducto } from '../controllers/productos.controllers';
import { check } from "express-validator";

const router = Router();

router.route('/productos').get(listarProductos).post([
  check("nombreProducto").notEmpty().withMessage('El nombre es un dato obligatorio')
  .isLength({min:2, max:100}).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  check("descripcion").notEmpty().withMessage('La descripción es obligatoria')
  .isLength({min:2, max:100}).withMessage('La descripción debe tener entre 2 y 100 caracteres'),
  check("precio").notEmpty().withMessage('El precio es un dato obligatorio')
  .isNumeric().withMessage('El precio es un dato numérico')
  .custom((value)=>{if (value >= 10 && value <=100000){return true}else{throw new Error('El precio debe estar entre 10 y 100000')}}),
  check("imagen").notEmpty().withMessage('la imagen es un dato obligatorio')
  .isLength({min:2, max:400}).withMessage('La imagen debe tener entre 2 y 400 caracteres')
  .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/).withMessage('URL inválida'),
  check('categoria').notEmpty().withMessage('La categoría no puede estar vacía')
  .isIn(['Pizzas', 'Pastas', 'Empanadas', 'Bebidas', 'Postres']).withMessage('Debe ingresar una categoría válida')
],crearProducto)

//obtener un producto de manera individual, se tiene que hacer una ruta aparte porque una ruta no puede tener dos peticiones "get" (en realidad no puede tener dos peticiones iguales)
router.route('/productos/:id').get(obtenerProducto).delete(borrarProducto).put(editarProducto)
export default router