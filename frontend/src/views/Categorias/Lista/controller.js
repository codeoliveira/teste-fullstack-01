import CategoriaModel from "./../model";
import DetalhesCategoria from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";

export default {

    mounted() {

        this.getCategorias()
        this.extras = '';

    },


    mixins: [CategoriaModel],

    computed: {

        'categorias': {
            get() {
                return this.$store.state.NS_categorias.categorias;
            },
            set(novoEstado) {
                this.$store.commit('NS_categorias/setState', novoEstado);
            }
        }
    },




    methods: {
        ...mapActions('NS_categorias', ['getAll', 'getOne']),





        redirect(rota = '') {
            if (rota === '') return;

            this.$router.push(rota).catch(() => { });
        },






        async getCategorias() {
            let res = await this.getAll();
        },







        async getCategoria(categoria) {
            return this.getOne(categoria._seq);
        },









        add() {

            let novoCategorias = {
                ...this.categorias,
                action: 'adicionar',
                item: {},
                id: null
            };
            this.categorias = novoCategorias;
            this.redirect(`/categorias/adicionar`);
        },









        async edit(ref = null) {


            if (ref === null) return false;

            if (isNaN(ref._seq)) return false;
            try {
                let item = await this.getCategoria(ref);
                let novoCategorias = {
                    ...this.categorias,
                    action: 'editar',
                    item: item,
                    id: item._seq
                };
                this.categorias = novoCategorias;
                this.redirect(`/categorias/editar/${item._seq}`);
            } catch (err) {
                if (typeof err.response !== 'undefined') {
                    let { data } = err.response;
                    this.createNotification('danger center', 'ERRO: Editando registro', data.message);

                } else {
                    console.error('Lista EDIT Error', err);
                }
            };

        },







        async remove(e, item = null) {
            if (item === null) return false;

            let go = confirm('Deseja prosseguir com esta remoção?');
            if (!go) return false;

            let existeProdutos = await this.checarSeExitemProdutos(item);
            if (!existeProdutos) return false;

            this.categorias.action = 'adicionar';
            this.categorias.item = {};

            let res = await this.removerCategoria(e, item);
            if (res.status === true) {
                this.createNotification('success center', 'OK: Remoção realizada', res.data.message);
                this.getAll();
                this.add();
            } else {
                this.createNotification('warning center', 'ERRO: Remoção falhou', res.data.message);
            }

        },




        async checarSeExitemProdutos(item) {

            let count = await this.contarProdutos(item);
            if (this.categorias.produtos.filtered > 0) {

                this.createNotification('danger center', 'ERRO: Remoção falhou', `
                Existe(m) ${this.categorias.produtos.filtered} produto(s) vinculado(s)
                a esta categoria.
                <h5>[${item.nome}]</h5>
                Não será possível removê-la enquanto existirem produtos vinculados.
                `);

                return false;
            }

            return true;

        },








        async visualizar(item) {
            let novoCategoria = {
                ...this.categorias,
                item: item
            };
            this.categorias = novoCategoria;
            let modal = await this.createModal(`Detalhes da categoria`, <DetalhesCategoria />);
            $(`#${modal}`).modal('show');

            let route = `/categorias`;
            this.$router.push(route).catch(() => { })
        },








        buildDataList() {

            let categorias = this.categorias.data;
            if (typeof categorias === 'undefined') return '';

            let html = [];

            for (let i = 0; i < categorias.filtered; i++) {
                let item = categorias.items[i];

                html.push(<div class="datalist-row row">
                    <div class="col-lg-2 d-none d-lg-block text-center"><h3>{item._seq}</h3></div>
                    <div class="col-5 col-md-6 col-lg-7">
                        <h4>{item.nome}</h4>
                    </div>
                    <div class="col-7 col-md-6 col-lg-4 text-center options-area ml-auto">
                        <button type="button" class="btn btn-light btn-sm mr-1" onClick={() => this.visualizar(item)} >Visualizar</button>
                        <button type="button" class="btn btn-primary btn-sm mr-1" onClick={() => this.edit(item)}>Editar</button>
                        <button type="button" class="btn btn-danger btn-sm" onClick={(event) => this.remove(event, item)}>Excluir</button>
                    </div>
                </div>
                )
            }

            let retorno = (<div class="datalist">
                <div class="datalist-title row">
                    <div class="col-lg-2 d-none d-lg-block text-center">ID</div>
                    <div class="col-5 col-md-6 col-lg-7">NOME</div>
                    <div class="col-7 col-md-6 col-lg-4 text-center options-area ml-auto">OPÇÕES</div>
                </div>
                <div class="datalist-body">
                    {html}
                </div>


            </div>);

            return retorno;

        }




    }


}