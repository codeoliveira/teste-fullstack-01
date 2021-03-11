import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home'
import Login from './../views/Login'
import Auth from './../modules/auth/auth';
import e404 from './../views/404';

import categoriasRoutes from './../views/Categorias/routes';
import produtosRoutes from './../views/Produtos/routes';
import usuariosRoutes from './../views/Usuarios/routes';
import pedidosRoutes from './../views/Pedidos/routes';
import logsRoutes from './../views/Logs/routes';

const auth = Auth.methods;

Vue.use(VueRouter)

const routes = [

  ...categoriasRoutes,
  ...produtosRoutes,
  ...usuariosRoutes,
  ...pedidosRoutes,
  ...logsRoutes,

  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(_, __, next) {
      auth.authenticate(next, undefined, '/login');
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(_, __, next) {
      auth.authenticate(next, '/', undefined);
    }
  },



  {
    path: '*',
    name: '404',
    component: e404
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
