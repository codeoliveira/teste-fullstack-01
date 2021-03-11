import UsuarioModel from "./../model";
import DetalhesUsuario from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";

export default {

    mounted() {

        this.getUsuarios()
        this.extras = '';

    },


    mixins: [UsuarioModel],

    computed: {

        'usuarios': {
            get() {
                return this.$store.state.NS_usuarios.usuarios;
            },
            set(novoEstado) {
                this.$store.commit('NS_usuarios/setState', novoEstado);
            }
        }
    },




    methods: {
        ...mapActions('NS_usuarios', ['getAll', 'getOne']),





        redirect(rota = '') {
            if (rota === '') return;

            this.$router.push(rota).catch(() => { });
        },






        async getUsuarios() {
            let res = await this.getAll();
        },







        async getUsuario(usuario) {
            return this.getOne(usuario._seq);
        },









        add() {

            let novoUsuarios = {
                ...this.usuarios,
                action: 'adicionar',
                item: {},
                id: null
            };
            this.usuarios = novoUsuarios;
            this.redirect(`/usuarios/adicionar`);
        },









        async edit(ref = null) {

            if (ref === null) return false;

            if (isNaN(ref._seq)) return false;
            try {
                let item = await this.getUsuario(ref);
                let novoUsuarios = {
                    ...this.usuarios,
                    action: 'editar',
                    item: item,
                    id: item._seq
                };
                this.usuarios = novoUsuarios;
                this.redirect(`/usuarios/editar/${item._seq}`);
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

            this.usuarios.action = 'adicionar';
            this.usuarios.item = {};

            let res = await this.removerUsuario(e, item);
            if (res.status === true) {
                this.createNotification('success center', 'OK: Remoção realizada', res.data.message);
                this.getAll();
                this.add();
            } else {
                this.createNotification('warning center', 'ERRO: Remoção falhou', res.data.message);
            }

        },








        async visualizar(item) {
            let novoUsuario = {
                ...this.usuarios,
                item: item
            };
            this.usuarios = novoUsuario;
            let modal = await this.createModal(`Detalhes do usuario`, <DetalhesUsuario />);
            $(`#${modal}`).modal('show');

            let route = `/usuarios`;
            this.$router.push(route).catch(() => { })
        },








        buildDataList() {

            let usuarios = this.usuarios.data;
            if (typeof usuarios === 'undefined') return '';

            let html = [];

            for (let i = 0; i < usuarios.filtered; i++) {
                let item = usuarios.items[i];

                html.push(<div class="datalist-row row">
                    <div class="col-lg-2 d-none d-lg-block text-center"><h3>{item._seq}</h3></div>
                    <div class="col-5 col-md-6 col-lg-7">
                        <h4 class="s">{item.nome}</h4>
                        <div>{item.email}</div>
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