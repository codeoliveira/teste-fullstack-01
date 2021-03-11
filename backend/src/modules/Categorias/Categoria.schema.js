const Joi = require('joi');

const messages = {
    nome: {
        'string.base': `O campo '{#key}' deve ser um tipo 'text'`,
        'string.empty': `O campo '{#key}' não pode ser vazio`,
        'string.min': `O campo '{#key}' deve ter um tamanho mínimo de {#limit} caracteres`,
        'string.max': `O campo '{#key}' deve ter um tamanho máximo de {#limit} caracteres`,
        'string.required': `O campo '{#key}' é obrigatório`
    },


    object: {
        'object.unknown': `O campo '{#key}' não é aceitável`
    }
}




const schema = {

    DEFAULT: Joi.object({

        nome: Joi.string()
            .min(3)
            .max(40)
            .required()
            .messages(messages.nome),



    }).messages(messages.object)

}

module.exports = schema;