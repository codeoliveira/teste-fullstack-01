import PedidoModel from "./../model";
import DetalhesPedido from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";
import formController from "../../../common/form/form.controller";

export default {

    data() {

        return {
            modalForm: ''
        }

    },

    mounted() {

        this.iniciar();


    },





    mixins: [PedidoModel, formController],




    computed: {

        'pedidos': {
            get() {
                return this.$store.state.NS_pedidos.pedidos;
            },
            set(novoEstado) {
                this.$store.commit('NS_pedidos/setState', novoEstado);
            }
        }

    },


    watch: {
        '$route': {
            handler(data) {
                this.prepareForm();
            }
        },
        'pedidos': {
            handler(data) {
                if (typeof data.item !== 'undefined') {

                }
            }
        }
    },




    methods: {
        ...mapActions('NS_pedidos', ['getAll', 'getOne']),





        async iniciar() {

            this.extras = '';

            await this.getPedidos();
            await this.getProdutosPorID();

            this.htmlCarrinho = await this.gerarCarrinho();
            this.checarCarrinhoAbandonado();

        },




        async getProdutosPorID() {

            if (typeof this.pedidos.produtos === 'undefined') await this.iniciar();
            this.produtosPorID = await this.indexarListaPorID('_seq', this.pedidos.produtos.items);
            let produtos = this.pedidos.produtos;
            produtos = {
                ...produtos,
                itemsPorID: this.produtosPorID
            }
            this.pedidos = {
                ...this.pedidos,
                produtos
            }

        },






        redirect(rota = '') {
            if (rota === '') return;

            this.$router.push(rota).catch(() => { });
        },






        async getPedidos() {
            let res = await this.getAll();
        },







        async getPedido(pedido) {
            return this.getOne(pedido._seq);
        },






        checarCarrinhoAbandonado() {

            let carrinhoAtivo = JSON.parse(localStorage.getItem('_cart'));
            if (carrinhoAtivo !== null) {

                this.createNotification(
                    `primary center`,
                    `Seja bem vindo de volta!`,
                    `Você tem produtos salvos em seu carrinho de compras. <br />
                    Recuperamos eles para que você possa continuar de onde parou.`
                    , 7000);

                // let go = confirm('Você tem itens salvos em seu carrinho de compras. Deseja retomar sua compra?');
                // if (go) {
                this.pedidos = {
                    ...this.pedidos,
                    carrinho: carrinhoAtivo
                }

                // } else {
                //     localStorage.removeItem('_cart');
                // }
            }

        },






        removerProdutoCarrinho(e, item) {

            let carrinho = this.pedidos.carrinho;

            carrinho.produtos = carrinho.produtos.filter((itemCarrinho) => {
                return itemCarrinho.id !== item.id
            });


            if (carrinho.produtos.length === 0) localStorage.removeItem('_cart');

            this.pedidos = {
                ...this.pedidos,
                carrinho
            }

            localStorage.setItem('_cart', JSON.stringify(carrinho));

        },







        async checkoutPedido(item) {

            let modalForm = await this.createModal(`Finalizando pedido`, <DetalhesPedido />);

            $(`#${modalForm}`).modal('show');
            this.pedidos = {
                ...this.pedidos,
                modalForm: modalForm
            }

        },






        gerarCarrinho() {

            if (typeof this.pedidos.carrinho.produtos === 'undefined') return '';
            if (typeof this.pedidos.produtos === 'undefined') return '';

            let html = [];


            html.push(this.gerarListaCarrinho());
            html = this.gerarRetornoCarrinho(html);

            return html;

        },



        gerarListaCarrinho() {

            let html = [];
            let produtosCarrinho = this.pedidos.carrinho.produtos;

            let totalProdutosCarrinho = produtosCarrinho.length;

            for (let i = 0; i < totalProdutosCarrinho; i++) {
                html.push(this.gerarItemCarrinho(produtosCarrinho[i]));
            }

            if (totalProdutosCarrinho <= 0) {
                html = (
                    <div class="col-12 text-center carrinho-vazio">
                        <div>Carrinho Vazio</div>
                    </div>
                );
            }

            return html;


        },




        gerarItemCarrinho(item) {

            let html;

            let produtosPorID = this.produtosPorID;

            if (typeof produtosPorID === 'undefined') return '';

            let produto = produtosPorID[item.id];

            let subtotal = 0;
            subtotal = (item.quantidade * produto.preco);
            subtotal = this.formatarPreco(subtotal);

            html = (<div class="datalist-row row">
                <div class="col-lg-2 d-none d-lg-block text-center"><h5>{item.id}</h5></div>
                <div class="col-lg-5 d-none d-lg-block">
                    {produto.nome}
                    <h4>R$ {this.formatarPreco(produto.preco)}</h4>
                </div>
                <div class="col-5 col-md-6 col-lg-1 text-center"><h4>{item.quantidade}</h4></div>
                <div class="col-5 col-md-6 col-lg-2"><h4>R$ {subtotal}</h4></div>
                <div class="col-7 col-md-6 col-lg-2 text-center options-area ml-auto">
                    <button type="button" class="btn btn-danger btn-sm" onClick={(event) => this.removerProdutoCarrinho(event, item)}>Excluir</button>
                </div>
            </div>
            );

            return html;

        },




        gerarRetornoCarrinho(body = '') {

            let html = [];
            html.push(<div class="datalist">
                <div class="datalist-title row">
                    <div class="col-lg-2 d-none d-lg-block text-center">CÓDIGO</div>
                    <div class="col-5 col-md-6 col-lg-5">PRODUTO / VALOR UN.</div>
                    <div class="col-5 col-md-6 col-lg-1 text-center">QTDE</div>
                    <div class="col-5 col-md-6 col-lg-2">SUBTOTAL</div>
                    <div class="col-7 col-md-6 col-lg-2 text-center options-area ml-auto">OPÇÕES</div>
                </div>
                <div class="datalist-body">
                    {body}
                </div>


            </div>);

            return html;

        },




        async indexarListaPorID(chave, lista) {

            if (typeof lista === 'undefined') return lista;

            let novaLista = {};
            lista.map(item => {
                novaLista[item[chave]] = item;
            });
            return novaLista;
        },




        gerarTotalGeral() {

            let html = [];

            let total = this.calcularTotalGeral();



            html = (<div class="totalGeral">
                <div class="row">
                    <div class="col-12 col-md-6 text-right titulo">TOTAL GERAL</div>
                    <div class="col-12 col-md-6 valor">R$ {total}</div>
                </div>
            </div>);

            return html;

        },


        calcularTotalGeral() {

            let total = 0;

            let produtosPorID = this.produtosPorID;
            if (typeof produtosPorID === 'undefined') return '0,00';

            let produtos = this.pedidos.carrinho.produtos;
            let totalProdutos = produtos.length;
            for (let i = 0; i < totalProdutos; i++) {
                total += produtosPorID[produtos[i].id].preco * produtos[i].quantidade;
            }

            return this.formatarPreco(total);

        },





        formatarPreco(value) {
            value = isNaN(value) ? false : value.toString();
            const val = Number(value.replace(",", "."));
            if (!val) return '0,00';
            const valueString = val.toFixed(2).replace(".", ",");
            return valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }




    }


}