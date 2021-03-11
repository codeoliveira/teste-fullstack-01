const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UsuarioModel = require('./Usuarios.model');
const Usuario = new UsuarioModel();

const DadosPadrao = require('./../../common/padronizacao/dados.padrao');
const DadosStd = new DadosPadrao();

const securityCfg = require('./../../config/security.config');

class UsuariosController {

    constructor() {
        return this;
    }



    LOGIN = async (req, res) => {

        // Consultamos o usuário através do email informado no login
        const result = await Usuario.read({ email: `${req.body.email}` }, { senha: 1 });

        // Se for encontrado um usuário com o email informado, prosseguimos
        if (result.items.length > 0) {

            // Atribuimos o usuário encontrado no banco de dados a variavel registro
            let registro = result.items[0];

            // Comparamos a senha do banco de dados com a senha informada no login
            let compared = await bcrypt.compare(req.body.senha, registro.senha);

            // Se a comparação for verdadeira
            if (compared) {
                // Assinamos um token com os dados do usuário validado e retornamos o token
                jwt.sign({ registro }, securityCfg.jwtSecret, (err, token) => {
                    const ret = DadosStd.prepareReturn(
                        200,
                        true,
                        'OK: Processo concluído com sucesso',
                        { token }
                    )
                    res
                        .status(ret.http_status)
                        .send(ret);
                });
            } else {
                // Usuário não validado, retorna erro de autenticação
                const ret = DadosStd.prepareReturn(
                    401,
                    false,
                    'ERRO: Dados inválidos, verifique os campos email e senha'
                )
                return res
                    .status(ret.http_status)
                    .send(ret);
            }

        } else {
            // Usuário não encontrado através do email de login, retorna erro de autenticação
            const ret = DadosStd.prepareReturn(
                401,
                false,
                'ERRO: Dados inválidos, usuário inexistente'
            )
            return res
                .status(res.http_status)
                .send(ret);
        }


        // TODO: Criar um controle de quantidade de tentativas falhas
        // Caso o número de tentativas exceder o limite definido, bloquear
        // o usuário por IP ou por MAC de rede por um tempo determinado 
        // até que o mesmo possa tentar novamente depois de alguns minutos

    }




    GET_ONE = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Consultamos o registro
        const result = await Usuario.read({ '_seq': `${id}` }, { projection: { senha: 0 } });

        // Se não existir o registro, retornamos a informação
        if (result.items.length === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Não foi possível localizar o registro de acordo com a(s) referência(s)',
                result,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret)
        }

        const ret = DadosStd.prepareReturn(
            200,
            true,
            'OK: Processo concluído com sucesso',
            result,
            null,
            null,
            null
        );
        return res.status(ret.http_status)
            .send(ret)

    }




    LIST_ALL = async (req, res) => {

        let options = {};

        // Capturamos os dados de pesquisa e filtramos
        let search = req.query.search;
        search = DadosStd.prepareSearch(search);

        // Capturamos os dados de paginação e filtramos
        let pagination = req.query.pagination;
        pagination = DadosStd.preparePagination(pagination);
        if (pagination !== null) options = Object.assign(options, pagination);

        // Capturamos os dados de ordenação e filtramos
        let sort = req.query.sort;
        sort = DadosStd.prepareSort(sort);
        if (sort !== null) options.sort = sort;

        // Capturamos os dados de campos retornados e filtramos
        let projection = req.query.fields;
        projection = this.#prepareFields(projection);
        if (projection !== null) options.projection = projection;

        // Realizamos a consulta
        const result = await Usuario.read(search, options, true);

        const ret = DadosStd.prepareReturn(
            200,
            true,
            'OK: Processo concluído com sucesso',
            result,
            pagination,
            req.query.search,
            req.query.sort
        );
        return res
            .status(ret.http_status)
            .send(ret);

    }







    CREATE = async (req, res) => {

        // Checamos se o email informado já está contido no cadastro
        const result = await Usuario.read(
            { email: `${req.body.email}` },
            { projection: { senha: 0 } }
        );
        if (result.filtered > 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Usuário já registrado',
                result,
                null,
                null,
                null
            );
            return res
                .status(ret.http_status)
                .send(ret)
        }

        // Atribuimos os dados a variavel registro
        let registro = req.body;

        // Adicionamos controle de data/hora ao registro
        registro = Object.assign(registro, DadosStd.prepareDates('create'));

        // Processamos o pedido de novo cadastro
        Usuario.create(registro).then((result) => {

            // Retornamos erro caso exista
            if (result.error) {
                const ret = DadosStd.prepareReturn(
                    400,
                    false,
                    'ERRO: Usuário não cadastrado, tente novamente em alguns segundos',
                    null,
                    null,
                    null,
                    null
                );
                return res.status(res.http_status)
                    .send(ret)
            }

            // Retornamos os dados cadastrados
            const ret = DadosStd.prepareReturn(
                200,
                true,
                'OK: Usuário adicionado com sucesso',
                result,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret);
        });

    }






    PATCH = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Checamos se o registro existe no banco de dados
        const result = await Usuario.read({ '_seq': `${id}` }, this.#prepareFields({ _id: 1 }));

        // Se não existir o registro, retornamos a informação
        if (result.filtered === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Registro não encontrado',
                null,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret)
        }

        // Se não existir req.body
        if (Object.keys(req.body).length === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: É necessário fornecer os dados a serem atualizados',
                null,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret)
        }

        // Atribuimos os dados a variavel registro
        let registro = req.body;

        // Adicionamos controle de data/hora ao registro
        registro = Object.assign(registro, DadosStd.prepareDates('update'));

        // Preparamos a estrutura correta para o processo de patch
        registro = { '$set': registro };

        // Atualizamos o usuário
        const updated = await Usuario.patch(id, registro, { projection: this.#prepareFields() });
        const ret = DadosStd.prepareReturn(
            200,
            true,
            'OK: Usuário atualizado com sucesso',
            updated,
            null,
            null,
            null
        );
        return res.status(ret.http_status)
            .send(ret);


    }







    PUT = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Checamos se o registro existe no banco de dados
        const result = await Usuario.read({ '_seq': `${id}` }, {});

        // Se não existir o registro, retornamos a informação
        if (result.filtered === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Registro inexistente',
                null,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret);
        }

        // Se não existir req.body
        if (Object.keys(req.body).length === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: É necessário fornecer os dados a serem atualizados',
                null,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret);
        }

        // Sincronizamos os dados enviados com o registro no banco de dados
        let registro = result.items[0];
        registro = Object.assign(registro, req.body);

        // Adicionamos controle de data/hora ao registro
        registro = Object.assign(registro, DadosStd.prepareDates('update'));

        // Atualizamos o registro
        const updated = await Usuario.update(id, registro, { projection: this.#prepareFields() });
        const ret = DadosStd.prepareReturn(
            200,
            true,
            'Ok: Usuário substituido com sucesso',
            updated,
            null,
            null,
            null
        );
        return res.status(ret.http_status)
            .send(ret);

    }







    DELETE = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Checamos se o registro existe no banco de dados
        const result = await Usuario.read({ '_seq': `${id}` }, {});

        // Se não existir o registro, retornamos a informação
        if (result.filtered === 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Registro inexistente',
                null,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret);
        }

        // Tentamos remover o registro
        const deleted = await Usuario.delete(id);
        let ret;
        if (deleted.ok) {
            ret = DadosStd.prepareReturn(
                200,
                true,
                'OK: Usuário removido com sucesso',
                null,
                null,
                null,
                null
            );
        } else {
            ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Falha ao tentar remover o usuário, tente novamente em alguns segundos',
                null,
                null,
                null,
                null
            );
        }
        // Retornamos o resultado do processo de remoção do registro
        return res.status(ret.http_status)
            .send(ret);

    }





    #prepareFields = (fields = null) => {
        // Retornamos a estrutura correta
        return DadosStd.prepareFields({ senha: 0 });
    }



}




module.exports = UsuariosController;