import { mapActions } from 'vuex';

import FormControl from '@/common/form/form.controller';
import CategoriasModel from './../model';
import CategoriaSchema from '../schema';
import $ from 'jquery';

export default {



    mixins: [FormControl, CategoriasModel],

    data() {
        return {
            pagina: {
                status: '',
                title: ''
            },
            form: {
                nome: '',
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
            if (typeof state.categorias !== 'undefined') {
                this.form = state.categorias.item;
            }
        });


        if (this.getID() !== null) {
            this.getOne(this.$route.params.id).then(res => {
                this.categorias = {
                    ...this.categorias,
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

        'categorias': {
            get() {
                return this.$store.state.NS_categorias.categorias;
            },
            set(data) {
                this.$store.commit('NS_categorias/setState', data);
            }
        }
    },


    watch: {
        '$route': {
            handler(data) {
                this.prepareForm();
            }
        },
        'categorias': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.form = {
                        nome: data.item.nome || '',
                        id: data.item._seq || ''
                    };
                }
            }
        }
    },




    methods: {

        ...mapActions('NS_categorias', ['getOne', 'getAll']),

        getID() {
            let id = typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : null;
            this.categorias = {
                ...this.categorias,
                id
            }
            return id;
        },


        prepareFirstLoad() {

            let id = this.getID();

            let action = typeof this.categorias.action !== 'undefined' ? this.categorias.action : this.$route.name;
            this.categorias = {
                ...this.categorias,
                action: action
            }



        },


        async prepareForm() {

            let id = this.getID();

            this.prepareFirstLoad();

            if (id !== null) {
                this.pagina.save = 'Atualizar';
                this.fillForm(this.categorias.item);
                this.pagina.title = `Editando categoria [cód: ${this.categorias.item._seq}]`;
            } else {
                this.pagina.save = 'Salvar novo';
                this.resetForm();
                this.pagina.title = `Novo cadastro`;
            }

        },

        checkForm(e) {

            let validation = CategoriaSchema.validate(this.form);
            if (validation.length > 0) {
                this.createNotification('danger center', 'ATENÇÃO', validation[0].message);
                $(`#${validation[0].path}`).focus();
                return false;
            }

            return true;

        },

        resetForm() {
            this.form = {
                nome: ''
            }
            this.categorias = {
                ...this.categorias,
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

            if (typeof this.categorias.action === 'undefined') return;

            this.categorias.action === 'editar'
                ? this.prepararAtualizarCategoria()
                : this.prepararCriarCategoria();
            return false;
        },



        prepararCriarCategoria() {

            let go = confirm('Deseja prosseguir com este cadastro?');
            if (!go) return false;

            this.alertHTML = '';

            this.criarCategoria().then(res => {
                if (res) {
                    this.getAll();
                    this.resetForm();
                }
            }).catch(err => {
                console.log('ERRO', err);
            });

        },


        prepararAtualizarCategoria() {

            let go = confirm('Deseja prosseguir com esta atualização?');
            if (!go) return false;

            this.alertHTML = '';

            this.atualizarCategoria().then(res => {
                if (res) {
                    this.categorias = {
                        ...this.categorias,
                        action: 'editar',
                        item: this.form
                    }
                }
            }).catch(err => {
                console.log('Categorias.Form ERROR', err);
            });

        },










    },





}