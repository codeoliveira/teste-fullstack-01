import PedidoModel from "./../model";
import DetalhesPedido from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";

export default {

    mounted() {

        this.getPedidos()
        this.extras = '';

    },


    mixins: [PedidoModel],

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




    methods: {
        ...mapActions('NS_pedidos', ['getAll', 'getOne']),





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









        add() {

            let novoPedidos = {
                ...this.pedidos,
                action: 'adicionar',
                item: {},
                id: null
            };
            this.pedidos = novoPedidos;
            this.redirect(`/pedidos/adicionar`);
        },









        async edit(ref = null) {

            if (ref === null) return false;

            if (isNaN(ref._seq)) return false;
            try {
                let item = await this.getPedido(ref);
                let novoPedidos = {
                    ...this.pedidos,
                    action: 'editar',
                    item: item,
                    id: item._seq
                };
                this.pedidos = novoPedidos;
                this.redirect(`/pedidos/editar/${item._seq}`);
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

            let res = await this.removerPedido(e, item);
            if (res.status === true) {
                this.createNotification('success center', 'OK: Remoção realizada', res.data.message);
                this.getAll();

                this.pedidos = {
                    ...this.pedidos,
                    action: 'adicionar',
                    item: {}
                }

            } else {
                this.createNotification('warning center', 'ERRO: Remoção falhou', res.data.message);
            }

        },








        async visualizar(item) {
            let novoPedido = {
                ...this.pedidos,
                item: item
            };
            this.pedidos = novoPedido;
            let modal = await this.createModal(`Detalhes do pedido`, <DetalhesPedido />);
            $(`#${modal}`).modal('show');

            let route = `/pedidos`;
            this.$router.push(route).catch(() => { })
        },








        buildDataList() {

            let pedidos = this.pedidos.data;
            if (typeof pedidos === 'undefined') return '';

            let html = [];

            for (let i = 0; i < pedidos.filtered; i++) {
                let item = pedidos.items[i];

                html.push(<div class="datalist-row row">
                    <div class="col-lg-3 d-none d-lg-block text-center">
                        <h3>{item._seq}</h3>
                        <h6>{item.carrinho}</h6>
                    </div>
                    <div class="col-5 col-md-6 col-lg-4">
                        <div>{item.nome}</div>
                        <div>{item.email}</div>
                        <h4 class="s">R$ {item.total}</h4>
                    </div>
                    <div class="col-lg-3 text-center d-none d-lg-block"><h6>{item.createdAtBR}</h6></div>

                    <div class="col-7 col-md-6 col-lg-4 text-center options-area ml-auto">
                        <button type="button" class="btn btn-danger btn-sm" onClick={(event) => this.remove(event, item)}>Excluir</button>
                    </div>
                </div >
                )
            }

            let retorno = (<div class="datalist">
                <div class="datalist-title row">
                    <div class="col-lg-3 d-none d-lg-block text-center">ORDEM/CARRINHO</div>
                    <div class="col-5 col-md-6 col-lg-4">CLIENTE / VALOR</div>
                    <div class="col-5 col-md-6 col-lg-3 text-center d-none d-lg-block">DATA.PEDIDO</div>
                    <div class="col-7 col-md-6 col-lg-2 options-area-header ml-auto">OPÇÕES</div>
                </div>
                <div class="datalist-body">
                    {html}
                </div>


            </div>);

            return retorno;

        }




    }


}