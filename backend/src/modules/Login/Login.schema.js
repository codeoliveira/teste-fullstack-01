const Joi = require('joi');

const login = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.base': `O campo 'email' deve ser um tipo 'email'`,
            'string.empty': `O campo 'email' não pode ser vazio`,
            'string.required': `O campo 'email' é obrigatório`
        }),

    senha: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
        .messages({
            'string.base': `O campo 'senha' deve ser um tipo 'text'`,
            'string.empty': `O campo 'senha' não pode ser vazio`,
            'string.min': `O campo 'senha' deve ter um tamanho mínimo de {#limit} caracteres`,
            'string.max': `O campo 'senha' deve ter um tamanho máximo de {#limit} caracteres`,
            'string.required': `O campo 'senha' é obrigatório`
        })

})

module.exports = login;