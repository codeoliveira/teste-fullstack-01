import LogModel from "./../model";
import DetalhesLog from './../Detalhes';
import $ from 'jquery';
import { mapActions } from "vuex";

export default {

    mounted() {

        this.getLogs()
        this.extras = '';

    },


    mixins: [LogModel],

    computed: {

        'logs': {
            get() {
                return this.$store.state.NS_logs.logs;
            },
            set(novoEstado) {
                this.$store.commit('NS_logs/setState', novoEstado);
            }
        }
    },




    methods: {
        ...mapActions('NS_logs', ['getAll', 'getOne']),





        redirect(rota = '') {
            if (rota === '') return;

            this.$router.push(rota).catch(() => { });
        },






        async getLogs() {
            let res = await this.getAll();
        },







        async getLog(log) {
            return this.getOne(log._seq);
        },









        add() {

            let novoLogs = {
                ...this.logs,
                action: 'adicionar',
                item: {},
                id: null
            };
            this.logs = novoLogs;
            this.redirect(`/logs/adicionar`);
        },









        async edit(ref = null) {


            if (ref === null) return false;

            if (isNaN(ref._seq)) return false;
            try {
                let item = await this.getLog(ref);
                let novoLogs = {
                    ...this.logs,
                    action: 'editar',
                    item: item,
                    id: item._seq
                };
                this.logs = novoLogs;
                this.redirect(`/logs/editar/${item._seq}`);
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

            this.logs.action = 'adicionar';
            this.logs.item = {};

            let res = await this.removerLog(e, item);
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
            if (this.logs.produtos.filtered > 0) {

                this.createNotification('danger center', 'ERRO: Remoção falhou', `
                Existe(m) ${this.logs.produtos.filtered} produto(s) vinculado(s)
                a esta log.
                <h5>[${item.nome}]</h5>
                Não será possível removê-la enquanto existirem produtos vinculados.
                `);

                return false;
            }

            return true;

        },








        async visualizar(item) {
            let novoLog = {
                ...this.logs,
                item: item
            };
            this.logs = novoLog;
            let modal = await this.createModal(`Detalhes da log`, <DetalhesLog />);
            $(`#${modal}`).modal('show');

            let route = `/logs`;
            this.$router.push(route).catch(() => { })
        },








        buildDataList() {

            let logs = this.logs.data;
            if (typeof logs === 'undefined') return '';

            let html = [];

            for (let i = 0; i < logs.filtered; i++) {
                let item = logs.items[i];

                html.push(<div class="datalist-row row">
                    <div class="col-5 col-md-6 col-lg-8">
                        <h6>{item.action}</h6>
                    </div>
                    <div class="col-7 col-md-6 col-lg-4 text-center options-area ml-auto">
                        <h6>{item.createdAtBR}</h6>
                    </div>
                </div>
                )
            }

            let retorno = (<div class="datalist">
                <div class="datalist-title row">
                    <div class="col-5 col-md-6 col-lg-8">NOME</div>
                    <div class="col-7 col-md-6 col-lg-4 text-center options-area ml-auto">DATA</div>
                </div>
                <div class="datalist-body">
                    {html}
                </div>


            </div>);

            return retorno;

        }




    }


}