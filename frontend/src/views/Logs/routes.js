import Form from './Form';
import Home from './index';
import Auth from './../../modules/auth/auth';
const auth = Auth.methods;

export default [
    {
        path: '/logs',
        name: 'Logs',
        component: Home,
        beforeEnter(_, __, next) {
            auth.authenticate(next, undefined, '/login');
        },
        children: [
            {
                path: 'adicionar',
                name: 'LogsAdicionar',
                component: Form
            },
            {
                path: 'editar/:id',
                name: 'LogsEditar',
                component: Form
            }
        ]
    }

]