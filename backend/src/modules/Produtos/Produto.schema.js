const Joi = require('joi');

const messages = {
    nome: {
        'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'string.min': `O campo '{#key}' deve ter um tamanho mínimo de {#limit} caracteres`,
        'string.max': `O campo '{#key}' deve ter um tamanho máximo de {#limit} caracteres`,
        'any.required': `O campo '{#key}' é obrigatório`
    },

    preco: {
        'number.base': `O campo '{#key}' deve ser um tipo 'number'`,
        'number.empty': `O campo '{#key}' não pode ser vazio`,
        'number.min': `O campo '{#key}' deve ter um valor mínimo de {#limit}`,
        'number.max': `O campo '{#key}' deve ter um valor máximo de {#limit}`,
        'number.precision': `O campo '{#key}' deve ter no máximo {#limit} números decimais`,
        'any.required': `O campo '{#key}' é obrigatório`
    },

    categoria: {
        'number.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'number.empty': `O campo '{#key}' não pode ser vazio`,
        'number.length': `O campo '{#key}' deve ter um tamanho de {#limit} caracteres`,
        'any.required': `O campo '{#key}' é obrigatório`
    },

    object: {
        'object.unknown': `O campo '{#key}' não é aceitável`
    }
}




const schema = {

    DEFAULT: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages(messages.nome),

        preco: Joi.number()
            .min(0)
            .max(99999999999.99)
            .precision(2)
            .required()
            .messages(messages.preco),

        categoria: Joi.number()
            .min(0)
            .max(99999999999)
            .precision(0)
            .required()
            .messages(messages.categoria)

    }).messages(messages.object),




    PATCH: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(100)
            .messages(messages.nome),

        preco: Joi.number()
            .min(0)
            .max(99999999999.99)
            .precision(2)
            .messages(messages.preco),

        categoria: Joi.number()
            .min(0)
            .max(99999999999)
            .precision(0)
            .required()
            .messages(messages.categoria)

    }).messages(messages.object)

}

module.exports = schema;