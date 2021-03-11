import Schema from 'validate'


const messages = {
    nome: {
        'type': (path) => `O campo ${path} deve ser um tipo 'string'`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    quantidade: {
        'type': (path) => `O campo ${path} deve ser um tipo 'number'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'min': (path) => `O campo ${path} deve ter um valor mínimo de {#limit}`,
        'max': (path) => `O campo ${path} deve ter um valor máximo de {#limit}`,
        'precision': (path) => `O campo ${path} deve ter no máximo {#limit} números decimais`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    email: {
        'type': (path) => `O campo ${path} deve ser um tipo 'email'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'length': (path) => `O campo ${path} deve ter um tamanho de {#limit} caracteres`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    object: {
        'object.unknown': (path) => `O campo ${path} não é aceitável`
    }
}




const PedidoSchema = {

    ADICIONAR_ITEM: new Schema({

        produto: {
            type: String || Number,
            required: true,
            length: { min: 1, max: 11 },
            message: messages.nome
        },

        quantidade: {
            type: String || Number,
            required: true,
            length: { min: 1, max: 13 },
            message: messages.quantidade

        }

    }),

    FINALIZAR_PEDIDO: new Schema({

        email: {
            type: String,
            required: true,
            length: { min: 3, max: 100 },
            message: messages.email
        }

    })

};

export default PedidoSchema;