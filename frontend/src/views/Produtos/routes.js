import Form from './Form';
import Home from './index';
import Auth from './../../modules/auth/auth';
const auth = Auth.methods;

export default [
    {
        path: '/produtos',
        name: 'Produtos',
        component: Home,
        beforeEnter(_, __, next) {
            auth.authenticate(next, undefined, '/login');
        },
        children: [
            {
                path: 'adicionar',
                name: 'ProdutosAdicionar',
                component: Form
            },
            {
                path: 'editar/:id',
                name: 'ProdutosEditar',
                component: Form
            }
        ]
    },
    // {
    //     path: '/produtos/adicionar',
    //     name: 'ProdutosAdicionar',
    //     component: Form,
    //     beforeEnter(_, __, next) {
    //         auth.authenticate(next, undefined, '/login');
    //     },
    // }

]