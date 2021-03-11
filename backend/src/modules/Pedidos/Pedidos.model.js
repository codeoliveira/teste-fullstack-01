const LogModel = require('../Logs/Logs.model');
const logger = new LogModel();

class Pedido {

    constructor() {
        // Retornamos o proprio objeto
        return this;
    }




    getCollection() {

        // Recuperamos a conexão via variavel global
        const db = global.db['mongodb'];

        // Instanciamos o gerador de auto incremento
        this.getSequence = global.db['mongodb'].sequence;

        // Definimos algumas configurações
        this.cfg = {
            collection: 'pedidos'
        };

        // Retornamos a collection
        return db.collection(this.cfg.collection);

    }





    create = async (body) => {

        // Pegamos a collection
        const col = this.getCollection();
        try {
            // Geramos um _seq auto incrementado
            body._seq = await this.getSequence(this.cfg.collection);
            // Efetuamos o cadastro
            let data = await col.insertOne(body);
            // Criamos o log
            this.#createLog('create', '', data.ops[0]);
            // Retornamos os dados cadastrados
            return data.ops[0];
        } catch (err) {
            // Retornamos erros caso não aconteça o create
            return err;
        }

    }





    read = async (search, options = {}, list = false) => {

        // Preparamos o id caso este seja informado
        if (search !== null && typeof search._id !== 'undefined') {
            search._id = global.db['mongo'].ObjectID(search._id);
        }
        // Preparamos o _seq caso este seja informado
        if (search !== null && typeof search._seq !== 'undefined') {
            search._seq = parseInt(search._seq);
        }

        try {
            let data = { total: 0, filtered: 0 };
            // Pegamos a collection
            const col = this.getCollection();
            // Efetuamos a consulta
            data.items = await col.find(search, options).toArray();
            if (list == true) {
                // Contamos a quantidade de registros existentes
                data.total = await col.estimatedDocumentCount({});
            } else {
                delete (data.total);
            }
            // Contamos os registros retornados
            data.filtered = await col.countDocuments(search, options);
            // Retornamos o resultado
            return data;
        } catch (err) {
            // Retornamos erros caso não aconteça o read
            return err
        }

    }

    count = async (search, options) => {
        // Preparamos o id caso este seja informado
        if (search !== null && typeof search._id !== 'undefined') {
            search._id = global.db['mongo'].ObjectID(search._id);
        }

        try {
            // Contamos os registros retornados
            const data = await col.countDocuments(search, options);
            // Retornamos o resultado
            return data;
        } catch (err) {
            // Retornamos erros caso não aconteça o read
            return err
        }
    }








    delete = async (id = '') => {

        // Pegamos a collection
        const col = this.getCollection();

        // Checamos e preparamos o id
        let key = '_id';
        if (id !== '') {
            if (id.length === 24) {
                id = global.db['mongo'].ObjectID(id);
            } else {
                key = '_seq';
                id = parseInt(id);
            }
        } else {
            return { error: true }
        }
        try {
            // Efetuamos o delete
            const data = await col.findOneAndDelete({ [key]: id });
            // Criamos o log
            this.#createLog('delete', data.value, '');
            // Retornamos o resultado
            return data;
        } catch (err) {
            // Retornamos erros caso não aconteça o update
            return err;
        }

    }



    #createLog = (action, dataAntes, dataDepois) => {

        const actions = {
            create: `Criou pedido ${dataDepois._seq} - carrinho: ${dataDepois.carrinho}`,
            delete: `Deletou pedido ${dataAntes._seq} - carrinho: ${dataAntes.carrinho}`
        }

        let log = {
            user: {
                _id: global.user._id,
                nome: global.user.nome
            },
            action: actions[action]
        };

        logger.create(log).catch(err => {
            console.log(err);
        });

    }


}

module.exports = Pedido;