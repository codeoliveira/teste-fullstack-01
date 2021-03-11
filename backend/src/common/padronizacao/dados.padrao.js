

class DadosPadrao {

    constructor() {
        return this;
    }

    prepareReturn = (
        http_status,
        returned,
        message,
        data = null,
        pagination = null,
        search = null,
        sort = null,
        error = null
    ) => {

        // Definimos a estrutura mínima de retorno
        let ret = {
            http_status,
            returned,
            message
        }
        ret.data = data;

        // Se for informado um erro, adicionamos na estrutura de retorno
        if (error !== null) ret.error = error;

        // Se for informado uma paginação, adicionamos na estrutura de retorno
        if (pagination !== null) ret.pagination = pagination;

        // Se for informado uma pesquisa, adicionamos na estrutura de retorno
        if (search !== null) ret.search = search;

        // Se for informado uma ordenação, adicionamos na estrutura de retorno
        if (sort !== null) ret.sort = sort;

        // Retornamos a estrutura correta
        return ret;

    }




    prepareSearch = (search = null) => {

        // Retornamos null caso não seja fornecido dados a serem pesquisados
        if (search === null || search === '') return null;
        // Preparamos o retorno de acordo com a estrutura correta
        // Aqui definimos quais campos são válidos para pesquisa
        let ret;
        if (typeof search === 'string') {
            ret = this.prepareString(search);
        }

        if (typeof search === 'object') {
            ret = this.prepareObject(search);
        }
        // console.log(ret);
        // Retornamos a estrutura correta
        return ret;


    }

    prepareString = (search) => {
        let ret = {
            '$or': [
                { nome: { '$regex': `.*${search}*.` } }
            ]
        };

        return ret;
    }

    prepareObject = (search) => {

        let ret = {};
        ret['$or'] = [];
        for (var key in search) {
            if (key === '_seq') {
                ret['$or'].push({ [key]: parseInt(search[key]) });
            } else if (key === '_id') {
                ret['$or'].push({ [key]: global.db['mongo'].ObjectID(search[key]) });
            } else {
                ret['$or'].push({ [key]: { '$regex': `${search[key]}` } });
            }
        }

        return ret;
    }


    prepareSort = (sort = null) => {

        // Retornamos null caso não seja fornecido ordenação
        if (sort === null || sort === '') return null;

        let ret = {};
        let order;

        // Preparamos o retorno de acordo com a estrutura correta
        Object.keys(sort).forEach((item) => {
            if (sort[item] === 'ASC' || sort[item] == '1') {
                order = 1;
            } else if (sort[item] === 'DESC'
                || sort[item] == '0'
                || sort[item] == '-1'
            ) {
                order = -1;
            }
            ret[item] = order;
        });

        // Retornamos a estrutura correta
        return ret;

    }


    preparePagination = (pagination = null) => {

        // Definimos valores iniciais
        let options = {
            skip: 0,
            start: 0,
            limit: 10
        };

        // Retornamos os valores iniciais padrão caso não seja informado uma paginação
        if (pagination === null || pagination === '') return options;

        // Tratamos a entrada de paginação para iniciar de forma funcional
        pagination.start = typeof pagination.start === 'undefined' ? options.skip : pagination.start;
        pagination.limit = typeof pagination.limit === 'undefined' ? options.limit : pagination.limit;

        // Transformamos em números inteiros
        pagination.start = parseInt(pagination.start);
        pagination.limit = parseInt(pagination.limit);

        // Definimos limitações para limit
        pagination.limit = pagination.limit < 10 ? 10 : pagination.limit;
        pagination.limit = pagination.limit > 1000 ? 1000 : pagination.limit;

        // Definimos limitações para start
        pagination.start = pagination.start < 0 ? 0 : pagination.start;
        pagination.start = pagination.start > 1000 ? 1000 : pagination.start;

        // Definimos o retorno
        options.limit = pagination.limit;
        options.start = pagination.start;
        options.skip = pagination.start * options.limit;

        // Retornamos a estrutura correta
        return options;

    }


    prepareFields = (fields = null) => {

        // Definimos valores iniciais
        let projection = {}

        // Retornamos valores iniciais caso não sejam informados
        // os campos no parametro 'fields'
        if (fields === null) return projection;

        // Retornamos o parametro fields de acordo com 
        // a estrutura correta
        projection = fields;

        // Retornamos a estrutura correta
        return projection;

    }


    prepareDates = (action = 'update') => {

        // Definimos valores iniciais
        let ret = {
            updatedAt: new Date()
        }

        // Adicionamos data de criação para ação create
        if (action === 'create') ret.createdAt = ret.updatedAt;

        // Retornamos a estrutura correta
        return ret;

    }

}


module.exports = DadosPadrao;