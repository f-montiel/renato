
import Pedido from "../models/pedido";

export const listarPedidos = async (req, res) => {
  try {
    const listaPedidos = await Pedido.find();
    res.status(200).json(listaPedidos);
  } catch (error) {
    res.status(404).json({ mensaje: "Error al listar los pedidos" });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);

    res.status(200).json({ mensaje: "El producto ha sido eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ mensaje: "error al eliminar producto" });
  }
};

export const crearPedido = async (req, res) => {
  try {
    
    const pedido = new Pedido(req.body);

    await pedido.save();
    res.status(201).json({ mensaje: "el pedido fue creado correctamente" });
  } catch (error) {
    res.status(404).json({ mensaje: "error al agregar el pedido" });
  }
};
