const Joi = require('joi');

const messages = {
    produtos: {
        'array.base': `O campo '{#key}' deve ser um tipo 'lista de produtos'`,
        'array.empty': `O campo '{#key}' deve conter no mínimo 1 produto inserido`,
        'array.min': `O campo '{#key}' deve conter no mínimo 1 produto inserido`,
        'array.max': `O campo '{#key}' deve conter no máximo {#limit} produtos inseridos`,
        'any.required': `O campo '{#key}' é obrigatório e deve conter uma lista de produtos`
    },
    produto: {
        id: {
            'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
            'string.empty': `O campo '{#key}' não pode ser vazio`,
            // 'string.length': `O campo '{#key}' deve ter um tamanho de {#limit} caracteres`,
            'string.min': `O campo '{#key}' deve ter um valor mínimo de {#limit}`,
            'string.max': `O campo '{#key}' deve ter um valor máximo de {#limit}`,
            'any.required': `O campo '{#key}' é obrigatório`
        },
        quantidade: {
            'number.base': `O campo '{#key}' deve ser um tipo 'number'`,
            'number.empty': `O campo '{#key}' não pode ser vazio`,
            'number.min': `O campo '{#key}' deve ter um valor mínimo de {#limit}`,
            'number.max': `O campo '{#key}' deve ter um valor máximo de {#limit}`,
            'number.precision': `O campo '{#key}' deve ser um número inteiro positivo`,
            'any.required': `O campo '{#key}' é obrigatório`
        }

    },
    email: {
        'string.base': `O campo '{#key}' deve ser um tipo 'email'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'any.required': `O campo '{#key}' é obrigatório`
    },
    carrinho: {
        'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'string.min': `O campo '{#key}' deve ter um valor mínimo de {#limit}`,
        'string.max': `O campo '{#key}' deve ter um valor máximo de {#limit}`,
        'any.required': `O campo '{#key}' é obrigatório`
    },


    object: {
        'object.unknown': `O campo '{#key}' não é aceitável`
    }
}


const ProdutoSchema = {
    id: Joi.string()
        .min(0)
        .max(24)
        .required()
        .messages(messages.produto.id),

    quantidade: Joi.number()
        .min(1)
        .max(99999999999)
        .precision(0)
        .required()
        .messages(messages.produto.quantidade)
};

const schema = {

    DEFAULT: Joi.object({

        produtos: Joi.array()
            .items(ProdutoSchema)
            .min(1)
            .max(1000)
            .required()
            .messages(messages.produtos),

        email: Joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages(messages.email),

        carrinho: Joi.string()
            .min(3)
            .max(40)
            .required()
            .messages(messages.carrinho)

    }).messages(messages.object),



}

module.exports = schema;