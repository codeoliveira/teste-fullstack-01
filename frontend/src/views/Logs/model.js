import { mapActions } from 'vuex';


export default {


    methods: {


        ...mapActions('NS_logs', ['getState', 'getAll', 'create', 'update', 'delete', 'countProducts']),


        async criarLog() {

            let log = this.form;

            try {
                let res = await this.create(log);
                let { data } = res;
                this.createNotification('success center', 'OK: Cadastro realizado', data.message);
                return true;
            } catch (error) {
                let { data } = error.response;
                this.createNotification('warning center', 'ERRO: Novo cadastro', data.message);
                return false;
            }

        },




        async atualizarLog() {

            let id = this.$route.params.id;

            try {
                this.form._seq = id;
                let res = await this.update(this.form);
                let { data } = res;
                this.getAll(this.$http);
                this.createNotification('success center', 'OK: Atualização realizada', data.message);
                return true;

            } catch (error) {
                let data = typeof error.response !== 'undefined' ? error.response.data : error;
                this.createNotification('warning center', 'ERRO: Atualização cancelada', data.message);
                return false;
            }

        },





        async removerLog(e, item) {

            try {
                let res = await this.delete(item);
                return { status: true, data: res.data };

            } catch (error) {
                return { status: false, data: error.response };
            }

        },




        async contarProdutos(item) {

            try {
                let res = await this.countProducts(item);
                return { status: true, data: res.data };

            } catch (error) {
                return { status: false, data: error.response };
            }

        }



    }

}