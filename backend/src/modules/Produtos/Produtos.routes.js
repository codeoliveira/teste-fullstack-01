// Importamos bibliotecas globais
const express = require('express');

// Importamos o middleware de controle de autenticação
const AutenticacaoMiddleware = require('./../../common/autenticacao/autenticacao.middleware');
const AuthMidd = new AutenticacaoMiddleware();

// Importamos o controller de Produtos e iniciamos uma instância do mesmo
const ProdutosController = require('./Produtos.controller');
const ProdutosControl = new ProdutosController();

// Importamos o middleware de Produtos e iniciamos uma instância do mesmo
const ProdutosMiddleware = require('./Produtos.middleware');
const ProdutosMidd = new ProdutosMiddleware();

// Iniciamos o controle de rotas
const router = express.Router();


// Rota para consultar um registro
router.get('/:id',
    AuthMidd.checarAutorizacao,
    ProdutosControl.GET_ONE
);

// Rota para listar registros
router.get('/',
    AuthMidd.checarAutorizacao,
    ProdutosControl.LIST_ALL
);

// Rota para criar novos registros
router.post('/',
    AuthMidd.checarAutorizacao,
    ProdutosMidd.validarCREATE,
    ProdutosControl.CREATE
);

// Rota para atualizar parcialmente um registro
router.patch('/:id',
    AuthMidd.checarAutorizacao,
    ProdutosMidd.validarPATCH,
    ProdutosControl.PATCH
);

// Rota para substituir um registro
router.put('/:id',
    AuthMidd.checarAutorizacao,
    ProdutosMidd.validarPUT,
    ProdutosControl.PUT
);

// Rota para remover um registro
router.delete('/:id',
    AuthMidd.checarAutorizacao,
    ProdutosControl.DELETE
);



// Exportamos o módulo
module.exports = router;