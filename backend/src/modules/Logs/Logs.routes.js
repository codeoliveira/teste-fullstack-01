// Importamos bibliotecas globais
const express = require('express');

// Importamos o middleware de controle de autenticação
const AutenticacaoMiddleware = require('./../../common/autenticacao/autenticacao.middleware');
const AuthMidd = new AutenticacaoMiddleware();

// Importamos o controller de Logs e iniciamos uma instância do mesmo
const LogsController = require('./Logs.controller');
const LogsControl = new LogsController();



// Iniciamos o controle de rotas
const router = express.Router();




// Rota para listar registros
router.get('/',
    AuthMidd.checarAutorizacao,
    LogsControl.LIST_ALL
);




// Exportamos o módulo
module.exports = router;