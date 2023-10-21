import mongoose from "mongoose";

const { Schema } = mongoose;

const pedidoSchema = new Schema({
  nombrePedido: String,
  fechaPedido: String,
  productoPedido: Array,
});

const Pedido = mongoose.model('pedido', pedidoSchema);

export default Pedido;
