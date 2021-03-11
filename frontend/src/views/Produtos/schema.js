import Schema from 'validate'


const messages = {
    nome: {
        'type': (path) => `O campo ${path} deve ser um tipo 'string'`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    preco: {
        'type': (path) => `O campo ${path} deve ser um tipo 'number'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'min': (path) => `O campo ${path} deve ter um valor mínimo de {#limit}`,
        'max': (path) => `O campo ${path} deve ter um valor máximo de {#limit}`,
        'precision': (path) => `O campo ${path} deve ter no máximo {#limit} números decimais`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    categoria: {
        'type': (path) => `O campo ${path} deve ser um tipo 'text'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'length': (path) => `O campo ${path} deve ter um tamanho de {#limit} caracteres`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    object: {
        'object.unknown': (path) => `O campo ${path} não é aceitável`
    }
}




const ProdutoSchema = new Schema({

    nome: {
        type: String,
        required: true,
        length: { min: 3, max: 100 },
        message: messages.nome
    },

    preco: {
        type: String || Number,
        required: true,
        length: { min: 3, max: 13 },
        message: messages.preco

    },

    categoria: {
        type: String || Number,
        required: true,
        length: { min: 1, max: 13 },
        message: messages.categoria

    }

});

export default ProdutoSchema;