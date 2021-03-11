

export default {

    namespaced: true,

    state: {
        usuarios: {
            item: {},
            action: 'adicionar'
        }
    },
    getters: {},
    mutations: {
        setState(state, payload) {
            state.usuarios = payload;
        }
    },
    actions: {



        getState(context) {
            return context.state;
        },





        async getAll(context, payload) {

            const http = context.rootState.http;
            let cfg = {
                path: '/usuarios',
                pagination: '?pagination[start]=0&pagination[start]=1000',
                sort: '&sort[_seq]=DESC'
            }
            let path = `${cfg.path}${cfg.pagination}${cfg.sort}`;
            let res = await http.get(path).then(res => {
                res.data;
                let estado = {
                    ...context.state.usuarios,
                    data: res.data.data
                }
                context.commit('setState', estado);
            })
            return context.state;
        },







        async getOne(context, payload) {

            const http = context.rootState.http;
            let path = `/usuarios/${payload}`;
            let res = await http.get(path).then(res => {
                let { data } = res.data;
                let estado = {
                    ...context.state.usuarios,
                    item: data.items[0]
                }
                context.commit('setState', estado);
            })
            return context.state.usuarios.item;
        },





        async create(context, payload) {

            const http = context.rootState.http;
            let path = `/usuarios`;
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
            let path = `/usuarios/${id}`;
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
            let path = `/usuarios/${id}`;
            try {
                let res = await http.delete(path);
                return res;

            } catch (error) {
                throw error;
            }
        }




    }

}