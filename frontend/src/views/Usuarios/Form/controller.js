import { mapActions } from 'vuex';

import FormControl from '@/common/form/form.controller';
import UsuariosModel from './../model';
import UsuarioSchema from '../schema';
import $ from 'jquery';

export default {



    mixins: [FormControl, UsuariosModel],

    data() {
        return {
            pagina: {
                status: '',
                title: ''
            },
            form: {
                nome: '',
                email: '',
                senha: '',
                id: ''
            }
        }
    },

    mounted() {

        this.form = {
            nome: '',
            email: '',
            senha: ''
        }

        this.getState().then(state => {
            this.form = state.usuarios.item;
        });


        if (this.getID() !== null) {
            this.getOne(this.$route.params.id).then(res => {
                this.usuarios = {
                    ...this.usuarios,
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

        'usuarios': {
            get() {
                return this.$store.state.NS_usuarios.usuarios;
            },
            set(data) {
                this.$store.commit('NS_usuarios/setState', data);
            }
        }
    },


    watch: {
        '$route': {
            handler(data) {
                this.prepareForm();
                // this.NS_usuarios.status = data.name;
            }
        },
        'usuarios': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.form = {
                        nome: data.item.nome || '',
                        email: data.item.email || '',
                        senha: data.item.senha || '',
                        id: data.item._seq || ''
                    };
                }
            }
        }
    },




    methods: {

        ...mapActions('NS_usuarios', ['getOne', 'getAll']),

        getID() {
            let id = typeof this.$route.params.id !== 'undefined' ? this.$route.params.id : null;
            this.usuarios = {
                ...this.usuarios,
                id
            }
            return id;
        },


        prepareFirstLoad() {

            let id = this.getID();

            let action = typeof this.usuarios.action !== 'undefined' ? this.usuarios.action : this.$route.name;
            this.usuarios = {
                ...this.usuarios,
                action: action
            }



        },


        async prepareForm() {

            let id = this.getID();

            this.prepareFirstLoad();

            if (id !== null) {
                this.pagina.save = 'Atualizar';
                this.fillForm(this.usuarios.item);
                this.pagina.title = `Editando usuario [cód: ${this.usuarios.item._seq}]`;
            } else {
                this.pagina.save = 'Salvar novo';
                this.resetForm();
                this.pagina.title = `Novo cadastro`;
            }
        },

        checkForm(schema) {

            let validation = UsuarioSchema[schema].validate(this.form);
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
                email: '',
                senha: ''
            }
            this.usuarios = {
                ...this.usuarios,
                item: this.form
            };
        },

        fillForm(item) {
            this.form = item;
        },


        async submitForm(e) {

            e.preventDefault();

            if (typeof this.usuarios.action === 'undefined') return;

            if (this.usuarios.action === 'editar') {
                if (!this.checkForm('UPDATE')) {
                    return false;
                }
                return this.prepararAtualizarUsuario()
            } else {
                if (!this.checkForm('CREATE')) {
                    return false;
                }
                return this.prepararCriarUsuario();
            }
            return false;
        },



        prepararCriarUsuario() {

            let go = confirm('Deseja prosseguir com este cadastro?');
            if (!go) return false;

            this.alertHTML = '';

            this.criarUsuario().then(res => {
                if (res) {
                    this.getAll();
                    this.resetForm();
                }
            }).catch(err => {
                console.log('ERRO', err);
            });

        },


        prepararAtualizarUsuario() {

            let go = confirm('Deseja prosseguir com esta atualização?');
            if (!go) return false;

            this.alertHTML = '';

            this.atualizarUsuario().then(res => {
                if (res) {
                    this.usuarios = {
                        ...this.usuarios,
                        action: 'editar',
                        item: this.form
                    }
                }
            }).catch(err => {
                console.log('Usuarios.Form ERROR', err);
            });

        },




    },





}