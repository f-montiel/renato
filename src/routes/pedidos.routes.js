import { Router } from 'express';
import { check } from "express-validator";
import { crearPedido, listarPedidos } from '../controllers/pedidos.controllers';
import { eliminarPedido } from '../controllers/pedidos.controllers';

const router = Router();

router.route('/pedidos').get(listarPedidos).post(crearPedido)
router.route('/pedidos/:id').delete(eliminarPedido)

export default router