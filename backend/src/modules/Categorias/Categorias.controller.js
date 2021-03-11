const CategoriaModel = require('./Categorias.model');
const Categoria = new CategoriaModel();

const DadosPadrao = require('./../../common/padronizacao/dados.padrao');
const DadosStd = new DadosPadrao();

class CategoriasController {

    constructor() {
        return this;
    }



    GET_ONE = async (req, res) => {

        // Extraímos o id
        const id = req.params.id;

        // Consultamos o registro
        const result = await Categoria.read({ '_seq': `${id}` }, {});


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
        const result = await Categoria.read(search, options, true);

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

        // Checamos se o nome informado já está contido no cadastro
        const result = await Categoria.read(
            { nome: `${req.body.nome}` }
        );
        if (result.filtered > 0) {
            const ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Categoria já registrada',
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

        // Preparamos o registro para ser enviado ao banco
        registro = this.#prepareToDatabase(registro);

        // Processamos o pedido de novo cadastro
        Categoria.create(registro).then((result) => {

            // Retornamos erro caso exista
            if (result.error) {
                const ret = DadosStd.prepareReturn(
                    400,
                    false,
                    'ERRO: Falha ao adicionar nova categoria, tente novamente em alguns segundos',
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
                'OK: Categoria adicionada com sucesso',
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
        const result = await Categoria.read({ '_seq': `${id}` }, DadosStd.prepareFields({ _id: 1 }));

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

        // Preparamos o registro para ser enviado ao banco
        registro = this.#prepareToDatabase(registro);

        // Preparamos a estrutura correta para o processo de patch
        registro = { '$set': registro };

        // Atualizamos o usuário
        const updated = await Categoria.patch(id, registro, { projection: DadosStd.prepareFields() });
        const ret = DadosStd.prepareReturn(
            200,
            true,
            'OK: Categoria atualizada com sucesso',
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
        const result = await Categoria.read({ '_seq': `${id}` }, {});

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

        // Preparamos o registro para ser enviado ao banco
        registro = this.#prepareToDatabase(registro);

        // Atualizamos o registro
        const updated = await Categoria.update(id, registro, { projection: DadosStd.prepareFields() });
        const ret = DadosStd.prepareReturn(
            200,
            true,
            'Ok: Categoria substituida com sucesso',
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
        const result = await Categoria.read({ '_seq': `${id}` }, {});

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
        const deleted = await Categoria.delete(id);
        let ret;
        if (deleted.ok) {
            ret = DadosStd.prepareReturn(
                200,
                true,
                'OK: Categoria removida com sucesso',
                null,
                null,
                null,
                null
            );
        } else {
            ret = DadosStd.prepareReturn(
                400,
                false,
                'ERRO: Falha ao tentar remover a categoria, tente novamente em alguns segundos',
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






    #prepareToDatabase = (data = null) => {

        if (data === null) return data;

        return data;

    }




}




module.exports = CategoriasController;