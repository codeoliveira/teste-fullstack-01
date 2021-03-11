// Importamos bibliotecas globais
const express = require('express');

// Importamos o middleware de controle de autenticação
const AutenticacaoMiddleware = require('./../../common/autenticacao/autenticacao.middleware');
const AuthMidd = new AutenticacaoMiddleware();

// Importamos o controller de Categorias e iniciamos uma instância do mesmo
const CategoriasController = require('./Categorias.controller');
const CategoriasControl = new CategoriasController();

// Importamos o middleware de Categorias e iniciamos uma instância do mesmo
const CategoriasMiddleware = require('./Categorias.middleware');
const CategoriasMidd = new CategoriasMiddleware();

// Iniciamos o controle de rotas
const router = express.Router();


// Rota para consultar um registro
router.get('/:id',
    AuthMidd.checarAutorizacao,
    CategoriasControl.GET_ONE
);

// Rota para listar registros
router.get('/',
    AuthMidd.checarAutorizacao,
    CategoriasControl.LIST_ALL
);

// Rota para criar novos registros
router.post('/',
    AuthMidd.checarAutorizacao,
    CategoriasMidd.validarCREATE,
    CategoriasControl.CREATE
);

// Rota para atualizar parcialmente um registro
router.patch('/:id',
    AuthMidd.checarAutorizacao,
    CategoriasMidd.validarPATCH,
    CategoriasControl.PATCH
);

// Rota para substituir um registro
router.put('/:id',
    AuthMidd.checarAutorizacao,
    CategoriasMidd.validarPUT,
    CategoriasControl.PUT
);

// Rota para remover um registro
router.delete('/:id',
    AuthMidd.checarAutorizacao,
    CategoriasControl.DELETE
);



// Exportamos o módulo
module.exports = router;