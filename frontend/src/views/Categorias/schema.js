import Schema from 'validate'


const messages = {
    nome: {
        'type': (path) => `O campo ${path} deve ser um tipo 'string'`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    object: {
        'object.unknown': (path) => `O campo ${path} não é aceitável`
    }
}




const CategoriaSchema = new Schema({

    nome: {
        type: String,
        required: true,
        length: { min: 3, max: 100 },
        message: messages.nome
    }

});

export default CategoriaSchema;