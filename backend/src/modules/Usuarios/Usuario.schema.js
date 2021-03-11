const Joi = require('joi');

const messages = {
    nome: {
        'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'string.min': `O campo '{#key}' deve ter um tamanho mínimo de {#limit} caracteres`,
        'string.max': `O campo '{#key}' deve ter um tamanho máximo de {#limit} caracteres`,
        'any.required': `O campo '{#key}' é obrigatório`
    },

    email: {
        'string.base': `O campo '{#key}' deve ser um tipo 'email'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'any.required': `O campo '{#key}' é obrigatório`
    },

    senha: {
        'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'string.min': `O campo '{#key}' deve ter um tamanho mínimo de {#limit} caracteres`,
        'string.max': `O campo '{#key}' deve ter um tamanho máximo de {#limit} caracteres`,
        'any.required': `O campo '{#key}' é obrigatório`
    }
}




const schema = {

    CREATE: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(40)
            .required()
            .messages(messages.nome),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages(messages.email),

        senha: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(3)
            .max(30)
            .required()
            .messages(messages.senha)

    }),



    PATCH: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(40)
            .messages(messages.nome),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .messages(messages.email),

    }),



    PUT: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(40)
            .required()
            .messages(messages.nome),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages(messages.email)

    }),

}

module.exports = schema;