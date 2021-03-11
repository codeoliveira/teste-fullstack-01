const SchemaMiddleware = require('./../../common/schema/schema.middleware');
const SchemaVal = new SchemaMiddleware();

const PedidoSchema = require('./Pedido.schema');

class PedidoMiddleware {

    constructor() {
        return this;
    }

    // Validacao de schema do objeto para CREATE
    validarCREATE = async (req, res, next) => {
        await SchemaVal.validarSCHEMA(req, res, next, PedidoSchema.DEFAULT);
    }

}

module.exports = PedidoMiddleware;