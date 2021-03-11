

class SchemaMiddleware {

    constructor() {
        return this;
    }



    validar = async (schema, user) => {
        try {
            let validated = await schema.validateAsync(user);
            return validated;
        } catch (error) {
            return { error }
        }
    }




    validarSCHEMA = async (req, res, next, schema) => {

        let data = await this.validar(schema, req.body);
        if (data.error) {
            res.status(400)
                .send({
                    error: 'Erro de validação',
                    message: data.error,
                    // message: user.error.details.map((item) => item.message),
                    data: req.body
                });
        } else {
            next();
        }

    }



}

module.exports = SchemaMiddleware;