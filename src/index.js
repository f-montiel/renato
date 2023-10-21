import express from 'express'
import './database'
import cors from 'cors';
import morgan from 'morgan';
import path from 'path'
import productoRouter from '../src/routes/productos.routes'
import usuarioRouter from '../src/routes/usuarios.routes'
import pedidoRouter from '../src/routes/pedidos.routes'
import loginRouter from '../src/routes/login.routes'

const app = express();
app.set('port', process.env.PORT || 4000);
app.listen( app.get('port'), ()=>{console.log('estoy en el puerto ' + app.get('port'))} )


//midlewares: funciones que se ejecutan antes de las rutas
app.use(cors()); //permite conexiones remotas
//permiten interpretar el formato JSON
app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(morgan('dev')) //otorga más información sobre las peticiones en la consola 
//cargar un archivo estático
app.use(express.static(path.join(__dirname, '../public')));

//agrego las rutas
app.use('/pizzeria', productoRouter)
app.use('/pizzeria', usuarioRouter)
app.use('/pizzeria', pedidoRouter)
app.use('/pizzeria', loginRouter)