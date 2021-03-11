import decode from 'jwt-decode';

const Auth = {

    // computed: {
    //     usuario() {
    //         return this.$store.state.usuario;
    //     }
    // },

    methods: {


        async logIn(email, senha) {

            // TODO: Possibilidade de criptografar os dados antes do post
            try {
                let res = await this.$http.post('/usuarios/login', { email, senha });
                if (res.status === 200) {
                    this.registerToken(res.data.data.token);
                    this.$router.push(this.$route.query.redirect || '/');
                    // this.$router.push({ path: '/' });

                    return true;
                }
                return false;
            } catch (error) {
                if (error) {
                    this.removeToken();
                    return false;
                }
            }

        },



        logOut() {

            this.removeToken();
            this.$router.push(this.$route.query.redirect || '/login');
            return true;

        },



        isLogged() {
            const token = sessionStorage.getItem('_token');

            if (!token) return false;

            const { exp: expiration } = decode(token);
            let usuario = decode(token).registro;
            delete (usuario.senha);

            const isExpired = !!expiration && Date.now() > expiration * 1000;

            if (isExpired) return false;

            // Sucesso
            sessionStorage.setItem('logged', JSON.stringify(usuario));

            return true;

        },


        authenticate(next, yes, no) {
            if (this.isLogged()) {
                next(yes)
            } else {
                next(no)
            }
            return;
        },


        registerToken(token) {
            this.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            sessionStorage.setItem('_token', token);
        },

        removeToken() {
            sessionStorage.removeItem('_token');
            delete (this.$http.defaults.headers.common['Authorization']);
        },

        // Recebe uma instancia do axios como parametro http
        defineHeaderAuthorization(http) {
            http.interceptors.request.use(
                (config) => {
                    let token = sessionStorage.getItem('_token');

                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }

                    return config;
                },

                (error) => {
                    return Promise.reject(error);
                }
            );
        }
    },




};

export default Auth;