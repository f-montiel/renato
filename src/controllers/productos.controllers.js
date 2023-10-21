import { validationResult } from "express-validator";
import Producto from "../models/producto";


export const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(404).json({ mensaje: "Error al buscar los productos" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    res.status(201).json({ mensaje: "el producto fue creado correctamente" });
  } catch (error) {
    res.status(404) .json({ mensaje: "ocurrio un error al intentar crear el producto" });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id);
    res.status(200).json(productoBuscado);
  } catch (error) {
    res.status(404).json({ mensaje: "Error, no se pudo obtener el producto" });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ mensaje: "El producto fue eliminado correctamente" });
  } catch (error) {
    res
      .status(404)
      .json({ mensaje: "error, no se pudo encontrar el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {

    await Producto.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({mensaje: "el producto pudo ser editado correctamente"})

  } catch (error) {
    res.status(404).json({mensaje: "error, no se pudo editar el producto"})
  }
};
