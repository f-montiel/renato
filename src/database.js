import mongoose, { mongo } from "mongoose";

const url = "mongodb+srv://f-montiel:om11062013@cluster0.csnnjye.mongodb.net/renato"

mongoose.connect(url);

const datosConexion = mongoose.connection

datosConexion.once('open', ()=>{
  console.log('BD conectada')
})