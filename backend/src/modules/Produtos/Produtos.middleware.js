const SchemaMiddleware = require('./../../common/schema/schema.middleware');
const SchemaVal = new SchemaMiddleware();

const ProdutoSchema = require('./Produto.schema');

class ProdutoMiddleware {

    constructor() {
        return this;
    }

    // Validacao de schema do objeto para CREATE
    validarCREATE = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, ProdutoSchema.DEFAULT);
    }

    // Validacao de schema do objeto para PATCH
    validarPATCH = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, ProdutoSchema.PATCH);
    }

    // Validacao de schema do objeto para PUT
    validarPUT = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, ProdutoSchema.DEFAULT);
    }

}

module.exports = ProdutoMiddleware;