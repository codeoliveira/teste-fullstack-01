import Vue from 'vue';

import './style.scss';

import controller from './controller';
import formController from '../../../common/form/form.controller';

const Carrinho = Vue.extend({

    mixins: [controller],

    render() {

        return (
            <div>

                <div class="PedidosCarrinho d-flex justify-content-center">
                    <div class="col-lg-9 col-md-11 col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="row">
                                    <div class="title mr-auto col-12 col-md-6 text-left">
                                        <i class="fa fa-list-ul"></i>Carrinho de Compras
                                    </div>
                                    <div class="col-12 col-md-6 text-right carrinho-menu">
                                        <button type="button" class="btn btn-success btn-sm" onClick={this.checkoutPedido} ><i class="fa fa-shopping-cart"></i>FINALIZAR PEDIDO</button>
                                    </div>
                                </div>
                            </div>
                            <div class="p-3">

                                {this.gerarCarrinho()}

                            </div>
                            <div class="card-footer">
                                {this.gerarTotalGeral()}

                            </div>
                        </div>
                    </div>
                </div>
                { this.extras}
            </div>
        )
    }
})

export default Carrinho;