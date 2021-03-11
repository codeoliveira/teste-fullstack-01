import { mapActions } from 'vuex';

export default {

    data() {
        return {
            detalhes: {
                nome: '',
                email: '',
                senha: '',
                id: ''
            }
        }
    },



    computed: {
        'usuarios': {
            get() {
                return this.$store.state.NS_usuarios.usuarios;
            },
            set(data) {
                this.$store.commit('NS_usuarios/setUsuarios', data);
            }
        }
    },



    watch: {
        'usuarios': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.detalhes = data.item;
                }
            }
        }
    },



    mounted() {
        this.getState().then(state => {
            this.detalhes = state.usuarios.item;
        });
    },



    methods: {
        ...mapActions('NS_usuarios', ['getState'])
    }

}