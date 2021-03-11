// Importamos bibliotecas globais
const express = require('express');

// Importamos o middleware de controle de autenticação
const AutenticacaoMiddleware = require('./../../common/autenticacao/autenticacao.middleware');
const AuthMidd = new AutenticacaoMiddleware();

// Importamos o controller de Pedidos e iniciamos uma instância do mesmo
const PedidosController = require('./Pedidos.controller');
const PedidosControl = new PedidosController();

// Importamos o middleware de Pedidos e iniciamos uma instância do mesmo
const PedidosMiddleware = require('./Pedidos.middleware');
const PedidosMidd = new PedidosMiddleware();

// Iniciamos o controle de rotas
const router = express.Router();


// Rota para consultar um registro
router.get('/:id',
    AuthMidd.checarAutorizacao,
    PedidosControl.GET_ONE
);

// Rota para listar registros
router.get('/',
    AuthMidd.checarAutorizacao,
    PedidosControl.LIST_ALL
);

// Rota para criar novos registros
router.post('/',
    AuthMidd.checarAutorizacao,
    PedidosMidd.validarCREATE,
    PedidosControl.CREATE
);

// Rota para remover um registro
router.delete('/:id',
    AuthMidd.checarAutorizacao,
    PedidosControl.DELETE
);



// Exportamos o módulo
module.exports = router;