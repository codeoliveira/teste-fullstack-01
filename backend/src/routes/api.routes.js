const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const usuariosRoutes = require('./../modules/Usuarios/Usuarios.routes');
const categoriasRoutes = require('./../modules/Categorias/Categorias.routes');
const produtosRoutes = require('./../modules/Produtos/Produtos.routes');
const pedidosRoutes = require('./../modules/Pedidos/Pedidos.routes');
const logsRoutes = require('./../modules/Logs/Logs.routes');

router.use('/usuarios', usuariosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/produtos', produtosRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/logs', logsRoutes);

router.get('/test', (req, res) => {
    res.send(res.json('Test route. API running ok!'));
})



module.exports = router;