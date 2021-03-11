const SchemaMiddleware = require('./../../common/schema/schema.middleware');
const SchemaVal = new SchemaMiddleware();

const UserSchema = require('./Usuario.schema');
const UserLogin = require('./../Login/Login.schema');

class UsuariosMiddleware {

    constructor() {
        return this;
    }



    // Validacao de schema do objeto para LOGIN
    validarLogin = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, UserLogin);
    }

    // Validacao de schema do objeto para CREATE
    validarCREATE = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, UserSchema.CREATE);
    }

    // Validacao de schema do objeto para PATCH
    validarPATCH = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, UserSchema.PATCH);
    }

    // Validacao de schema do objeto para PUT
    validarPUT = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, UserSchema.PUT);
    }

}

module.exports = UsuariosMiddleware;