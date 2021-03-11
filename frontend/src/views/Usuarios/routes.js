import Form from './Form';
import Home from './index';
import Auth from './../../modules/auth/auth';
const auth = Auth.methods;

export default [
    {
        path: '/usuarios',
        name: 'Usuarios',
        component: Home,
        beforeEnter(_, __, next) {
            auth.authenticate(next, undefined, '/login');
        },
        children: [
            {
                path: 'adicionar',
                name: 'UsuariosAdicionar',
                component: Form
            },
            {
                path: 'editar/:id',
                name: 'UsuariosEditar',
                component: Form
            }
        ]
    },
    // {
    //     path: '/usuarios/adicionar',
    //     name: 'UsuariosAdicionar',
    //     component: Form,
    //     beforeEnter(_, __, next) {
    //         auth.authenticate(next, undefined, '/login');
    //     },
    // }

]