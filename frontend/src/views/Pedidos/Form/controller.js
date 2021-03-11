import { mapActions } from 'vuex';

import FormControl from '@/common/form/form.controller';
import PedidosModel from './../model';
import PedidoSchema from '../schema';
import $ from 'jquery';
import moment from 'moment';

export default {



    mixins: [FormControl, PedidosModel],

    data() {
        return {
            pagina: {
                status: '',
                title: ''
            },
            form: {
                email: '',
                quantidade: '',
                produtos: [],
                _seq: ''
            }
        }
    },

    mounted() {

        this.iniciar();

    },

    computed: {

        'pedidos': {
            get() {
                return this.$store.state.NS_pedidos.pedidos;
            },
            set(data) {
                this.$store.commit('NS_pedidos/setState', data);
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

        ...mapActions('NS_pedidos', ['getOne', 'getAll']),



        async iniciar() {

            this.form = {
                email: '',
                quantidade: '',
                produtos: [],
                produto: '',
                _seq: ''
            }

            await this.getState().then(state => {
                this.form = state.pedidos.item;
            });


            if (this.getID() !== null) {
                this.getOne(this.$route.params.id).then(res => {
                    this.pedidos = {
                        ...this.pedidos,
                        item: res,
                        action: 'editar'
                    }
                    this.prepareFirstLoad();
                    this.prepareForm();
                });
            }

            this.prepareForm();

        },



        getID() {
            let id = typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : null;
            this.pedidos = {
                ...this.pedidos,
                id
            }
            return id;
        },


        prepareFirstLoad() {

            let id = this.getID();

            let action = typeof this.pedidos.action !== 'undefined' ? this.pedidos.action : this.$route.name;
            this.pedidos = {
                ...this.pedidos,
                action: action
            }



        },


        async prepareForm() {

            let filled = await this.fillOptionProdutos();
            if (filled) {

                this.prepareFirstLoad();

                this.pagina.save = 'Adicionar Produto';
                this.resetForm();
                this.pagina.title = `Novo cadastro`;

            }
        },

        checkForm(schema) {

            let validation = PedidoSchema[schema].validate(this.form);
            if (validation.length > 0) {
                this.createNotification('danger center', 'ATENÇÃO', validation[0].message);
                $(`#${validation[0].path}`).focus();
                return false;
            }

            return true;

        },

        resetForm() {
            this.form = {
                nome: '',
                produto: '',
                produtos: []
            }
            this.pedidos = {
                ...this.pedidos,
                item: this.form
            };
        },

        fillForm(item) {
            this.form = item;
        },


        async submitForm(e) {

            e.preventDefault();

            if (!this.checkForm('ADICIONAR_ITEM')) {
                return false;
            }

            this.adicionarProdutoCarrinho();

            return false;

        },



        async submitFormPedido(e) {

            e.preventDefault();

            if (!this.checkForm('FINALIZAR_PEDIDO')) {
                return false;
            }

            if (!this.contarProdutosCarrinho()) {
                return false;
            }

            await this.prepararCriarPedido();

            return false;

        },




        contarProdutosCarrinho() {

            if (this.pedidos.carrinho.produtos.length > 0) {
                return true;
            } else {
                this.createNotification('warning center', 'ATENÇÃO', 'Não existem produtos adicionados no carrinho de compras.');
                return false;
            }

        },




        async prepararCriarPedido() {



            let go = confirm('Deseja prosseguir com este pedido?');
            if (!go) {
                $(`#${this.pedidos.modalForm}`).modal('hide');
                return false;
            }

            this.alertHTML = '';

            let carrinhoID = await this.gerarIDCarrinho();
            this.form = {
                produtos: this.pedidos.carrinho.produtos,
                email: this.form.email,
                carrinho: carrinhoID
            };

            await this.criarPedido(this.form).then(res => {
                if (res) {
                    this.getAll();
                    this.resetForm();
                    this.limparCarrinho();
                    $(`#${this.pedidos.modalForm}`).modal('hide');
                    // let route = `/pedidos`;
                    // this.$router.push(route).catch(() => { })
                }
            }).catch(err => {
                console.log('ERRO', err);
            });

        },


        gerarNumeroRandomicoInteiro(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min))
        },


        limparCarrinho() {

            this.pedidos = {
                ...this.pedidos,
                carrinho: {
                    id: 1,
                    produtos: []
                }
            }

            localStorage.removeItem('_cart');

        },


        async gerarIDCarrinho() {
            let d = new Date();
            return moment().format('YYYYMMDDHHmm') + '-'
                + this.numeroComZerosAEsquerda(this.gerarNumeroRandomicoInteiro(1000, 100000), 6);
        },


        numeroComZerosAEsquerda(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        },


        adicionarProdutoCarrinho() {

            let carrinho = this.pedidos.carrinho;

            let item = {
                id: this.form.produto,
                quantidade: this.form.quantidade
            }

            carrinho.produtos.push(item);

            this.pedidos = {
                ...this.pedidos,
                carrinho: carrinho
            }

            localStorage.setItem('_cart', JSON.stringify(carrinho));

            this.resetForm()

        },









        async fillOptionProdutos() {

            let res = await this.listarProdutos();

            if (!res) return false;

            let selected = false;
            let produtos = typeof this.pedidos.produtos !== 'undefined' ? this.pedidos.produtos : {};

            let html = [];
            for (let i = 0; i < produtos.filtered; i++) {
                if (typeof this.form.produto !== 'undefined') {
                    selected = this.form.produto == produtos.items[i]._seq ? true : false;
                }
                html.push(<option value={produtos.items[i]._seq} selected={selected}>{produtos.items[i].nome}</option>)
            }

            this.optionProdutos = html;
            return true;
        },







    },





}