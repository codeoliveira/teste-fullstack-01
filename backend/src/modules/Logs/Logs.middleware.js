const SchemaMiddleware = require('./../../common/schema/schema.middleware');
const SchemaVal = new SchemaMiddleware();

const LogSchema = require('./Log.schema');

class LogMiddleware {

    constructor() {
        return this;
    }

    // Validacao de schema do objeto para CREATE
    validarCREATE = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, LogSchema.DEFAULT);

    }

    // Validacao de schema do objeto para PATCH
    validarPATCH = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, LogSchema.DEFAULT);
    }

    // Validacao de schema do objeto para PUT
    validarPUT = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, LogSchema.DEFAULT);
    }

}

module.exports = LogMiddleware;