

export default {

    namespaced: true,

    state: {
        produtos: {
            item: {},
            action: 'adicionar'
        }
    },
    getters: {},
    mutations: {
        setState(state, payload) {
            state.produtos = payload;
        }
    },
    actions: {



        getState(context) {
            return context.state;
        },





        async getAll(context, payload) {

            const http = context.rootState.http;
            let cfg = {
                path: '/produtos',
                pagination: '?pagination[start]=0&pagination[start]=1000',
                sort: '&sort[_seq]=DESC'
            }
            let path = `${cfg.path}${cfg.pagination}${cfg.sort}`;
            let res = await http.get(path).then(res => {
                res.data;
                let estado = {
                    ...context.state.produtos,
                    data: res.data.data
                }
                context.commit('setState', estado);
            })
            return context.state;
        },







        async getOne(context, payload) {

            const http = context.rootState.http;
            let path = `/produtos/${payload}`;
            let res = await http.get(path).then(res => {
                let { data } = res.data;
                let estado = {
                    ...context.state.produtos,
                    item: data.items[0]
                }
                context.commit('setState', estado);
            })
            return context.state.produtos.item;
        },





        async create(context, payload) {

            const http = context.rootState.http;
            let path = `/produtos`;
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
            let path = `/produtos/${id}`;
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
            let path = `/produtos/${id}`;
            try {
                let res = await http.delete(path);
                return res;

            } catch (error) {
                throw error;
            }
        }




    }

}