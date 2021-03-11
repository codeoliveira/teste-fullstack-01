
import moment from 'moment';

export default {

    namespaced: true,

    state: {
        pedidos: {
            item: {},
            action: 'adicionar',
            carrinho: {
                codigo: 1,
                produtos: []
            }
        }
    },
    getters: {},
    mutations: {
        setState(state, payload) {
            state.pedidos = payload;
        }
    },
    actions: {



        getState(context) {
            return context.state;
        },





        async getAll(context, payload) {

            const http = context.rootState.http;
            let cfg = {
                path: '/pedidos',
                pagination: '?pagination[start]=0&pagination[start]=1000',
                sort: '&sort[_seq]=DESC'
            }
            let path = `${cfg.path}${cfg.pagination}${cfg.sort}`;
            let res = await http.get(path).then(res => {
                res.data;
                let estado = {
                    ...context.state.pedidos,
                    data: res.data.data
                }
                estado.data.items.map(item => {
                    item.createdAtBR = moment(new Date(item.createdAt)).format('DD/MM/YYYY HH:mm:ss');
                    item.updatedAtBR = moment(new Date(item.updatedAt)).format('DD/MM/YYYY HH:mm:ss');
                    return item
                })
                context.commit('setState', estado);
            })
            return context.state;
        },







        async getOne(context, payload) {

            const http = context.rootState.http;
            let path = `/pedidos/${payload}`;
            let res = await http.get(path).then(res => {
                let { data } = res.data;
                let estado = {
                    ...context.state.pedidos,
                    item: data.items[0]
                }
                context.commit('setState', estado);
            })
            return context.state.pedidos.item;
        },





        async create(context, payload) {

            const http = context.rootState.http;
            let path = `/pedidos`;
            try {
                let res = await http.post(path, payload);
                return res;
            } catch (error) {
                throw error;
            }
        },



        async update(context, payload) {

            const http = context.rootState.http;
            const id = payload._seq;
            delete (payload._seq);
            let path = `/pedidos/${id}`;
            try {
                let res = await http.patch(path, payload);
                return res;
            } catch (error) {
                throw error;
            }
        },




        async delete(context, payload) {

            const http = context.rootState.http;
            const id = payload._seq;
            let path = `/pedidos/${id}`;
            try {
                let res = await http.delete(path);
                return res;

            } catch (error) {
                throw error;
            }
        }




    }

}