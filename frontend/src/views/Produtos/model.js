import { mapActions } from 'vuex';


export default {


    methods: {


        ...mapActions('NS_produtos', ['getState', 'getAll', 'create', 'update', 'delete']),


        async criarProduto() {

            let produto = this.form;

            try {
                let res = await this.create(produto);
                let { data } = res;
                this.createNotification('success center', 'OK: Cadastro realizado', data.message);
                return true;
            } catch (error) {
                let { data } = error.response;
                this.createNotification('warning center', 'ERRO: Novo cadastro', data.message);
                return false;
            }

        },




        async atualizarProduto() {

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





        async removerProduto(e, item) {

            e.preventDefault();

            try {
                let res = await this.delete(item);
                return { status: true, data: res.data };

            } catch (error) {
                return { status: false, data: error.response };
            }

        },





        async listarCategorias() {
            try {
                let res = await this.$http.get('/categorias/?pagination[start]=0&pagination[limit]=1000&sort[_seq]=DESC');
                let { data } = res.data;
                this.produtos = {
                    ...this.produtos,
                    categorias: data
                };
                return true;

            } catch (error) {
                let { data } = error.response;
                this.createNotification('warning center', 'ERRO: Carregamento de categorias falhou', data.message);
                return false;
            }
        }

    }

}