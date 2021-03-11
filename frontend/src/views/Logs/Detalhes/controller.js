import { mapActions } from 'vuex';

export default {

    data() {
        return {
            detalhes: {
                nome: '',
                preco: '',
                log: '',
                id: ''
            }
        }
    },



    computed: {
        'logs': {
            get() {
                return this.$store.state.NS_logs.logs;
            },
            set(data) {
                this.$store.commit('NS_logs/setLogs', data);
            }
        }
    },



    watch: {
        'logs': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.detalhes = data.item;
                }
            }
        }
    },



    mounted() {
        this.getState().then(state => {
            this.detalhes = state.logs.item;
        });
    },



    methods: {
        ...mapActions('NS_logs', ['getState'])
    }

}