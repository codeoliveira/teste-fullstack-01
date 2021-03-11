import Schema from 'validate'


const messages = {
    nome: {
        'type': (path) => `O campo ${path} deve ser um tipo 'string'`,
        'length': (path, obj, length) => `O campo ${path} deve ter um tamanho entre ${length.min} e ${length.max} caracteres`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    email: {
        'type': (path) => `O campo ${path} deve ser um tipo 'email'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'length': (path, obj, length) => `O campo ${path} deve ter um tamanho entre ${length.min} e ${length.max} caracteres`,
        'precision': (path) => `O campo ${path} deve ter no máximo {#limit} números decimais`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    senha: {
        'type': (path) => `O campo ${path} deve ser um tipo 'text'`,
        'empty': (path) => `O campo ${path} não pode ser vazio`,
        'length': (path, obj, length) => `O campo ${path} deve ter um tamanho entre ${length.min} e ${length.max} caracteres`,
        'required': (path) => `O campo ${path} é obrigatório`
    },

    object: {
        'object.unknown': (path) => `O campo ${path} não é aceitável`
    }
}




const UsuarioSchema = {

    CREATE: new Schema({

        nome: {
            type: String,
            required: true,
            length: { min: 3, max: 100 },
            message: messages.nome
        },

        email: {
            type: String,
            required: true,
            length: { min: 6, max: 60 },
            message: messages.email

        },

        senha: {
            type: String,
            required: true,
            length: { min: 6, max: 20 },
            message: messages.senha

        }

    }),

    UPDATE: new Schema({

        nome: {
            type: String,
            required: true,
            length: { min: 3, max: 100 },
            message: messages.nome
        },

        email: {
            type: String,
            required: true,
            length: { min: 6, max: 60 },
            message: messages.email

        }

    })
}


export default UsuarioSchema;