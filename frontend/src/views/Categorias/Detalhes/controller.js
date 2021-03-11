import { mapActions } from 'vuex';

export default {

    data() {
        return {
            detalhes: {
                nome: '',
                preco: '',
                categoria: '',
                id: ''
            }
        }
    },



    computed: {
        'categorias': {
            get() {
                return this.$store.state.NS_categorias.categorias;
            },
            set(data) {
                this.$store.commit('NS_categorias/setCategorias', data);
            }
        }
    },



    watch: {
        'categorias': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.detalhes = data.item;
                }
            }
        }
    },



    mounted() {
        this.getState().then(state => {
            this.detalhes = state.categorias.item;
        });
    },



    methods: {
        ...mapActions('NS_categorias', ['getState'])
    }

}