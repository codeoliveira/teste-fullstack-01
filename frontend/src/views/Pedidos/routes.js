import Form from './Form';
import Home from './index';
import Auth from './../../modules/auth/auth';
const auth = Auth.methods;

export default [
    {
        path: '/pedidos',
        name: 'Pedidos',
        component: Home,
        beforeEnter(_, __, next) {
            auth.authenticate(next, undefined, '/login');
        },
        children: [
            {
                path: 'adicionar',
                name: 'PedidosAdicionar',
                component: Form
            },
            {
                path: 'editar/:id',
                name: 'PedidosEditar',
                component: Form
            }
        ]
    },
    // {
    //     path: '/pedidos/adicionar',
    //     name: 'PedidosAdicionar',
    //     component: Form,
    //     beforeEnter(_, __, next) {
    //         auth.authenticate(next, undefined, '/login');
    //     },
    // }

]