// Importamos bibliotecas globais
const express = require('express');

// Importamos o middleware de controle de autenticação
const AutenticacaoMiddleware = require('./../../common/autenticacao/autenticacao.middleware');
const AuthMidd = new AutenticacaoMiddleware();

// Importamos o controller de usuarios e iniciamos uma instância do mesmo
const UsuariosController = require('./../Usuarios/Usuarios.controller');
const UsuariosControl = new UsuariosController();

// Importamos o middleware de usuarios e iniciamos uma instância do mesmo
const UsuariosMiddleware = require('./../Usuarios/Usuarios.middleware');
const UsuariosMidd = new UsuariosMiddleware();

// Iniciamos o controle de rotas
const router = express.Router();

// Rota para login
router.post('/login',
    UsuariosMidd.validarLogin,
    UsuariosControl.LOGIN
);

// Rota para consultar um registro
router.get('/:id',
    AuthMidd.checarAutorizacao,
    UsuariosControl.GET_ONE
);

// Rota para listar usuários
router.get('/',
    AuthMidd.checarAutorizacao,
    UsuariosControl.LIST_ALL
);

// Rota para criar usuários
router.post('/',
    AuthMidd.checarAutorizacao,
    UsuariosMidd.validarCREATE,
    UsuariosControl.CREATE
);

// Rota para atualizar parcialmente usuários
router.patch('/:id',
    AuthMidd.checarAutorizacao,
    UsuariosMidd.validarPATCH,
    UsuariosControl.PATCH
);

// Rota para atualizar usuários
router.put('/:id',
    AuthMidd.checarAutorizacao,
    UsuariosMidd.validarPUT,
    UsuariosControl.PUT
);

// Rota para remover usuários
router.delete('/:id',
    AuthMidd.checarAutorizacao,
    UsuariosControl.DELETE
);



// Exportamos o módulo
module.exports = router;