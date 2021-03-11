import Vue from 'vue';

import DetalhesController from './controller';


import './style.scss';

const Detalhes = Vue.extend({

    mixins: [DetalhesController],

    render() {
        return (
            <div class="DetalhesCategoria">
                <div class="body">
                    <div class="col-12 m0 row linha">
                        <div class="col-sm-3 text-right label">Nome: </div>
                        <div class="col-sm-9 valor">{this.detalhes.nome}</div>
                    </div>

                    <div class="col-12 m0 row linha">
                        <div class="col-sm-3 text-right label">Qtde de produtos: </div>
                        <div class="col-sm-9 valor">{10}</div>
                    </div>



                </div>
            </div>
        )
    }

})

export default Detalhes;