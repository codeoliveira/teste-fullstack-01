import { mapActions } from 'vuex';
import formController from '../../../common/form/form.controller';
import FormController from '../Form/controller';

export default {

    data() {
        return {
            form: {
                nome: '',
                preco: '',
                categoria: '',
                id: ''
            }
        }
    },


    mixins: [formController, FormController],


    // computed: {
    //     'pedidos': {
    //         get() {
    //             return this.$store.state.NS_pedidos.pedidos;
    //         },
    //         set(data) {
    //             this.$store.commit('NS_pedidos/setPedidos', data);
    //         }
    //     }
    // },



    watch: {
        'pedidos': {
            handler(data) {
                if (typeof data.item !== 'undefined') {
                    this.form = data.item;
                }
            }
        }
    },



    mounted() {
        this.getState().then(state => {
            this.form = state.pedidos.item;
        });
    },



    methods: {
        ...mapActions('NS_pedidos', ['getState']),





    }

}