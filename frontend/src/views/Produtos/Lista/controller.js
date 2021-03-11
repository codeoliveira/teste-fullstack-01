import ProdutoModel from "./../model";
import DetalhesProduto from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";

export default {

    mounted() {

        this.getProdutos()
        this.extras = '';

    },


    mixins: [ProdutoModel],

    computed: {

        'produtos': {
            get() {
                return this.$store.state.NS_produtos.produtos;
            },
            set(novoEstado) {
                this.$store.commit('NS_produtos/setState', novoEstado);
            }
        }
    },




    methods: {
        ...mapActions('NS_produtos', ['getAll', 'getOne']),





        redirect(rota = '') {
            if (rota === '') return;

            this.$router.push(rota).catch(() => { });
        },






        async getProdutos() {
            let res = await this.getAll();
        },







        async getProduto(produto) {
            return this.getOne(produto._seq);
        },









        add() {

            let novoProdutos = {
                ...this.produtos,
                action: 'adicionar',
                item: {},
                id: null
            };
            this.produtos = novoProdutos;
            this.redirect(`/produtos/adicionar`);
        },









        async edit(ref = null) {

            if (ref === null) return false;

            if (isNaN(ref._seq)) return false;
            try {
                let item = await this.getProduto(ref);
                let novoProdutos = {
                    ...this.produtos,
                    action: 'editar',
                    item: item,
                    id: item._seq
                };
                this.produtos = novoProdutos;
                this.redirect(`/produtos/editar/${item._seq}`);
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

            this.produtos.action = 'adicionar';
            this.produtos.item = {};

            let res = await this.removerProduto(e, item);
            if (res.status === true) {
                this.createNotification('success center', 'OK: Remoção realizada', res.data.message);
                this.getAll();
                this.add();
            } else {
                this.createNotification('warning center', 'ERRO: Remoção falhou', res.data.message);
            }

        },








        async visualizar(item) {
            let novoProduto = {
                ...this.produtos,
                item: item
            };
            this.produtos = novoProduto;
            let modal = await this.createModal(`Detalhes do produto`, <DetalhesProduto />);
            $(`#${modal}`).modal('show');

            let route = `/produtos`;
            this.$router.push(route).catch(() => { })
        },








        buildDataList() {

            let produtos = this.produtos.data;
            if (typeof produtos === 'undefined') return '';

            let html = [];

            for (let i = 0; i < produtos.filtered; i++) {
                let item = produtos.items[i];

                html.push(<div class="datalist-row row">
                    <div class="col-lg-2 d-none d-lg-block text-center"><h3>{item._seq}</h3></div>
                    <div class="col-5 col-md-6 col-lg-7">
                        <div>{item.nome}</div>
                        <h4 class="s">R$ {item.preco}</h4>
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