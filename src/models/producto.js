import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 100,
  },
  descripcion: { type: String, required: true, minLength: 2, maxLength: 100 },
  precio: { type: Number, required: true, min: 10, max: 100000 },
  imagen: { type: String, required: true, minLength: 10, maxLength: 400 },
  categoria: { type: String, required: true },
  cantidad: {
    type: Number,
    default: 1,
  },
});

const Producto = mongoose.model("producto", productoSchema);

export default Producto;
