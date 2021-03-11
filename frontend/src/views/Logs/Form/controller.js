import { mapActions } from 'vuex';

import FormControl from '@/common/form/form.controller';
import LogsModel from './../model';
import LogSchema from '../schema';
import $ from 'jquery';

export default {



    mixins: [FormControl, LogsModel],

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
            log: ''
        }

        this.getState().then(state => {
            if (typeof state.logs !== 'undefined') {
                this.form = state.logs.item;
            }
        });


        if (this.getID() !== null) {
            this.getOne(this.$route.params.id).then(res => {
                this.logs = {
                    ...this.logs,
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

        'logs': {
            get() {
                return this.$store.state.NS_logs.logs;
            },
            set(data) {
                this.$store.commit('NS_logs/setState', data);
            }
        }
    },


    watch: {
        '$route': {
            handler(data) {
                this.prepareForm();
            }
        },
        'logs': {
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

        ...mapActions('NS_logs', ['getOne', 'getAll']),

        getID() {
            let id = typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : null;
            this.logs = {
                ...this.logs,
                id
            }
            return id;
        },


        prepareFirstLoad() {

            let id = this.getID();

            let action = typeof this.logs.action !== 'undefined' ? this.logs.action : this.$route.name;
            this.logs = {
                ...this.logs,
                action: action
            }



        },


        async prepareForm() {

            let id = this.getID();

            this.prepareFirstLoad();

            if (id !== null) {
                this.pagina.save = 'Atualizar';
                this.fillForm(this.logs.item);
                this.pagina.title = `Editando log [cód: ${this.logs.item._seq}]`;
            } else {
                this.pagina.save = 'Salvar novo';
                this.resetForm();
                this.pagina.title = `Novo cadastro`;
            }

        },

        checkForm(e) {

            let validation = LogSchema.validate(this.form);
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
            this.logs = {
                ...this.logs,
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

            if (typeof this.logs.action === 'undefined') return;

            this.logs.action === 'editar'
                ? this.prepararAtualizarLog()
                : this.prepararCriarLog();
            return false;
        },



        prepararCriarLog() {

            let go = confirm('Deseja prosseguir com este cadastro?');
            if (!go) return false;

            this.alertHTML = '';

            this.criarLog().then(res => {
                if (res) {
                    this.getAll();
                    this.resetForm();
                }
            }).catch(err => {
                console.log('ERRO', err);
            });

        },


        prepararAtualizarLog() {

            let go = confirm('Deseja prosseguir com esta atualização?');
            if (!go) return false;

            this.alertHTML = '';

            this.atualizarLog().then(res => {
                if (res) {
                    this.logs = {
                        ...this.logs,
                        action: 'editar',
                        item: this.form
                    }
                }
            }).catch(err => {
                console.log('Logs.Form ERROR', err);
            });

        },










    },





}