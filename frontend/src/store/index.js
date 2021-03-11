import Vue from 'vue'
import Vuex from 'vuex'

import NS_produtos from './../views/Produtos/store';
import NS_categorias from './../views/Categorias/store';
import NS_usuarios from './../views/Usuarios/store';
import NS_pedidos from './../views/Pedidos/store';
import NS_logs from './../views/Logs/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    http: Vue.prototype.$http
  },
  modules: {
    NS_produtos,
    NS_categorias,
    NS_usuarios,
    NS_pedidos,
    NS_logs,
  }
})
