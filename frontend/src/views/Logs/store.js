import moment from 'moment';

export default {

    namespaced: true,

    state: {
        logs: {
            item: {},
            action: 'adicionar',
            produtos: {}
        }
    },
    getters: {},
    mutations: {
        setState(state, payload) {
            state.logs = payload;
        }
    },
    actions: {



        getState(context) {
            return context.state;
        },





        async getAll(context, payload) {

            const http = context.rootState.http;
            let cfg = {
                path: '/logs',
                pagination: '?pagination[start]=0&pagination[start]=1000',
                sort: '&sort[createdAt]=DESC'
            }
            let path = `${cfg.path}${cfg.pagination}${cfg.sort}`;
            let res = await http.get(path).then(res => {
                res.data;
                let estado = {
                    ...context.state.logs,
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
            let path = `/logs/${payload}`;
            let res = await http.get(path).then(res => {
                let { data } = res.data;
                let estado = {
                    ...context.state.logs,
                    item: data.items[0]
                }
                context.commit('setState', estado);
            })
            return context.state.logs.item;
        },





        async create(context, payload) {

            const http = context.rootState.http;
            let path = `/logs`;
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
            let path = `/logs/${id}`;
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
            let path = `/logs/${id}`;
            try {
                let res = await http.delete(path);
                return res;

            } catch (error) {
                throw error;
            }
        },





        async countProducts(context, payload) {

            const http = context.rootState.http;
            const id = payload._seq;
            let cfg = {
                path: '/produtos',
                pagination: '?pagination[start]=0&pagination[start]=1000',
                sort: '&sort[_seq]=DESC',
                search: `&search[log]=${id}`
            }
            let path = `${cfg.path}${cfg.pagination}${cfg.sort}${cfg.search}`;
            await http.get(path).then(res => {
                res.data;
                let estado = {
                    ...context.state.logs,
                    produtos: res.data.data
                }
                context.commit('setState', estado);
            })
            return context.state;

        }




    }

}