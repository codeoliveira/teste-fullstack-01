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
        'produtos': {
            get() {
                return this.$store.state.NS_produtos.produtos;
            },
            set(data) {
                this.$store.commit('NS_produtos/setProdutos', data);
            }
        }
    },



    watch: {
        'produtos': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.detalhes = data.item;
                }
            }
        }
    },



    mounted() {
        this.getState().then(state => {
            this.detalhes = state.produtos.item;
        });
    },



    methods: {
        ...mapActions('NS_produtos', ['getState'])
    }

}