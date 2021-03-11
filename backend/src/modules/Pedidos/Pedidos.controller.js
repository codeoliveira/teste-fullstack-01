const PedidoModel = require('./Pedidos.model');
const Pedido = new PedidoModel();

const DadosPadrao = require('./../../common/padronizacao/dados.padrao');
const DadosStd = new DadosPadrao();

const ProdutoModel = require('./../Produtos/Produtos.model');
const Produto = new ProdutoModel();

const EmailTemplates = require('./../../common/email/templates/email.templates');
const Email = new EmailTemplates();

const EmailSmtp = require('./../../common/email/email.smtp');
const SMTP = new EmailSmtp();

const SMTPClient = require('emailjs').SMTPClient;

class PedidosController {

    constructor() {
        return this;
    }



    GET_ONE = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Consultamos o registro
        const result = await Pedido.read({ '_id': `${id}` });

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
        projection = DadosStd.prepareFields(projection);
        if (projection !== null) options.projection = projection;

        // Realizamos a consulta
        const result = await Pedido.read(search, options, true);

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

        // TODO: Criar uma checagem de pedidos para evitar duplicidade
        // const result = await Pedido.read(
        //     { nome: `${req.body.nome}` }
        // );
        // if (result.filtered > 0) {
        //     const ret = DadosStd.prepareReturn(
        //         400,
        //         false,
        //         'ERRO: Pedido já registrado',
        //         result,
        //         null,
        //         null,
        //         null
        //     );
        //     return res
        //         .status(ret.http_status)
        //         .send(ret)
        // }

        // Atribuimos os dados a variavel registro
        let registro = req.body;

        // Adicionamos controle de data/hora ao registro
        registro = Object.assign(registro, DadosStd.prepareDates('create'));

        // Preparamos o registro para ser enviado ao banco
        registro = await this.#prepareToDatabase(registro);

        // Processamos o pedido de novo cadastro
        Pedido.create(registro).then((result) => {

            // Retornamos erro caso exista
            if (result.error) {
                const ret = DadosStd.prepareReturn(
                    400,
                    false,
                    'ERRO: Falha ao adicionar novo pedido, tente novamente em alguns segundos',
                    null,
                    null,
                    null,
                    null
                );
                return res.status(res.http_status)
                    .send(ret)
            }

            // Enviamos email
            SMTP.send(result, Email.templatePedidos);

            // Retornamos os dados cadastrados
            const ret = DadosStd.prepareReturn(
                200,
                true,
                'OK: Pedido adicionado com sucesso',
                result,
                null,
                null,
                null
            );
            return res.status(ret.http_status)
                .send(ret);
        });

    }










    DELETE = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Checamos se o registro existe no banco de dados
        const result = await Pedido.read({ '_seq': `${id}` }, {});

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
        const deleted = await Pedido.delete(id);
        let ret;
        if (deleted.ok) {
            ret = DadosStd.prepareReturn(
                200,
                true,
                'OK: Pedido removido com sucesso',
                null,
                null,
                null,
                null
            );
        } else {
            ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Falha ao tentar remover o pedido, tente novamente em alguns segundos',
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






    #prepareToDatabase = async (data = null) => {

        if (data === null) return data;

        // Tranformamos o campo quantidade em um número inteiro
        const tt = data.produtos.length;
        let queryProdutos = [];
        for (let i = 0; i < tt; i++) {
            // Construímos a query para consulta dos produtos
            queryProdutos.push({
                // '_id': global.db['mongo'].ObjectID(data.produtos[i].id)
                '_seq': parseInt(data.produtos[i].id)
            });
        }

        // Preparamos a query de consulta dos produtos
        queryProdutos = { '$or': queryProdutos };
        // Realizamos a consulta pelos produtos da lista
        let dbProdutos = await Produto.read(queryProdutos, {}, true);

        let produtos = [];
        for (let i = 0; i < dbProdutos.filtered; i++) {
            // produtos[dbProdutos.items[i]._id] = dbProdutos.items[i];
            produtos[dbProdutos.items[i]._seq] = dbProdutos.items[i];
        }

        let total = 0;

        for (let i = 0; i < tt; i++) {
            let p = data.produtos[i];
            p.quantidade = parseInt(p.quantidade);
            p.nome = produtos[p.id].nome;
            p.preco = produtos[p.id].preco;
            total += p.preco * p.quantidade;
            data.produtos[i] = p;
        }

        data.total = total.toFixed(2);

        return data;

    }









}




module.exports = PedidosController;