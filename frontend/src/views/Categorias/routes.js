import Form from './Form';
import Home from './index';
import Auth from './../../modules/auth/auth';
const auth = Auth.methods;

export default [
    {
        path: '/categorias',
        name: 'Categorias',
        component: Home,
        beforeEnter(_, __, next) {
            auth.authenticate(next, undefined, '/login');
        },
        children: [
            {
                path: 'adicionar',
                name: 'CategoriasAdicionar',
                component: Form
            },
            {
                path: 'editar/:id',
                name: 'CategoriasEditar',
                component: Form
            }
        ]
    }

]