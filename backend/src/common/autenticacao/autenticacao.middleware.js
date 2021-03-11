const jwt = require('jsonwebtoken');
const securityCfg = require('./../../config/security.config');


class AutenticacaoMiddleware {

    constructor() {
        return this;
    }

    checarAutorizacao = async (req, res, next) => {

        // Token = Authorization: Bearer <token>
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {

            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            req.token = token;

            jwt.verify(req.token, securityCfg.jwtSecret, (err, authData) => {
                delete (authData.registro.senha);
                global.user = authData.registro;
                if (err) {
                    return res.status(403)
                        .send({
                            error: err
                        });
                }
                next();
            });


        } else {
            res.status(403)
                .send({
                    error: 'Acesso restrito',
                    message: 'Você precisa efetuar o login para utilizar os recursos da API.'
                });
        }

        // return CategoriasMiddleware;
        return false;

    }




}

module.exports = AutenticacaoMiddleware;