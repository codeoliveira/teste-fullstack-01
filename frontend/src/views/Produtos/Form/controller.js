import { mapActions } from 'vuex';

import FormControl from '@/common/form/form.controller';
import ProdutosModel from './../model';
import ProdutoSchema from '../schema';
import $ from 'jquery';

export default {



    mixins: [FormControl, ProdutosModel],

    data() {
        return {
            pagina: {
                status: '',
                title: ''
            },
            form: {
                nome: '',
                preco: '',
                categoria: '',
                id: ''
            }
        }
    },

    mounted() {

        this.form = {
            nome: '',
            preco: '',
            categoria: ''
        }

        this.getState().then(state => {
            this.form = state.produtos.item;
        });


        if (this.getID() !== null) {
            this.getOne(this.$route.params.id).then(res => {
                this.produtos = {
                    ...this.produtos,
                    item: res,
                    action: 'editar'
                }
                this.prepareFirstLoad();
                this.prepareForm();
            });
        }

        this.prepareForm();


    },

    computed: {

        'produtos': {
            get() {
                return this.$store.state.NS_produtos.produtos;
            },
            set(data) {
                this.$store.commit('NS_produtos/setState', data);
            }
        }
    },


    watch: {
        '$route': {
            handler(data) {
                this.prepareForm();
                // this.NS_produtos.status = data.name;
            }
        },
        'produtos': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.form = {
                        nome: data.item.nome || '',
                        preco: data.item.preco || '',
                        categoria: data.item.categoria || '',
                        id: data.item._seq || ''
                    };
                }
            }
        }
    },




    methods: {

        ...mapActions('NS_produtos', ['getOne', 'getAll']),

        getID() {
            let id = typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : null;
            this.produtos = {
                ...this.produtos,
                id
            }
            return id;
        },


        prepareFirstLoad() {

            let id = this.getID();

            let action = typeof this.produtos.action !== 'undefined' ? this.produtos.action : this.$route.name;
            this.produtos = {
                ...this.produtos,
                action: action
            }



        },


        async prepareForm() {

            let filled = await this.fillOptionCategorias();
            if (filled) {
                let id = this.getID();

                this.prepareFirstLoad();

                if (id !== null) {
                    this.pagina.save = 'Atualizar';
                    this.fillForm(this.produtos.item);
                    this.pagina.title = `Editando produto [cód: ${this.produtos.item._seq}]`;
                } else {
                    this.pagina.save = 'Salvar novo';
                    this.resetForm();
                    this.pagina.title = `Novo cadastro`;
                }
            }
        },

        checkForm(e) {

            let validation = ProdutoSchema.validate(this.form);
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
                preco: '',
                categoria: ''
            }
            this.produtos = {
                ...this.produtos,
                item: this.form
            };
        },

        fillForm(item) {
            this.form = item;
        },


        async submitForm(e) {

            e.preventDefault();

            if (!this.checkForm()) {
                return false;
            }

            if (typeof this.produtos.action === 'undefined') return;

            this.produtos.action === 'editar'
                ? this.prepararAtualizarProduto()
                : this.prepararCriarProduto();
            return false;
        },



        prepararCriarProduto() {

            let go = confirm('Deseja prosseguir com este cadastro?');
            if (!go) return false;

            this.alertHTML = '';

            this.criarProduto().then(res => {
                if (res) {
                    this.getAll();
                    this.resetForm();
                }
            }).catch(err => {
                console.log('ERRO', err);
            });

        },


        prepararAtualizarProduto() {

            let go = confirm('Deseja prosseguir com esta atualização?');
            if (!go) return false;

            this.alertHTML = '';

            this.atualizarProduto().then(res => {
                if (res) {
                    this.produtos = {
                        ...this.produtos,
                        action: 'editar',
                        item: this.form
                    }
                }
            }).catch(err => {
                console.log('Produtos.Form ERROR', err);
            });

        },



        async fillOptionCategorias() {

            let res = await this.listarCategorias();

            if (!res) return false;

            let selected = false;
            let categorias = typeof this.produtos.categorias !== 'undefined' ? this.produtos.categorias : {};
            let html = [];
            for (let i = 0; i < categorias.filtered; i++) {
                if (typeof this.form.categoria !== 'undefined') {
                    selected = this.form.categoria == categorias.items[i]._seq ? true : false;
                }
                html.push(<option value={categorias.items[i]._seq} selected={selected}>{categorias.items[i].nome}</option>)
            }

            this.optionCategorias = html;
            return true;
        },







    },





}