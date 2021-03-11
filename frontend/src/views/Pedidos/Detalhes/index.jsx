import Vue from 'vue';
import $ from 'jquery';

import DetalhesController from './controller';


import './style.scss';

const Detalhes = Vue.extend({

    mixins: [DetalhesController],

    render() {
        return (
            <div class="DetalhesPedido">
                <div class="body">
                    <form
                        onSubmit={this.submitFormPedido}
                    >
                        <div class="FormBody">

                            <div class="row">
                                <div class="col-12 col-md-12">
                                    <div class="form-group">
                                        <label for="email">Email do cliente</label>
                                        <input type="text"
                                            class="form-control"
                                            id="email"
                                            aria-describedby="Digite aqui o email do cliente"
                                            onkeydown={this.changeValue}
                                            onkeyup={this.changeValue}
                                            value={this.form.email}
                                            placeholder="Digite o email do cliente"
                                        />

                                    </div>
                                </div>

                            </div>

                            {this.alertHTML}

                        </div>

                        <div class="footer">
                            <button type="submit" class="btn btn-success btn-sm">FINALIZAR ESTE PEDIDO</button>
                            <button type="button" class="btn btn-danger btn-sm ml-1" onClick={() => $(`#${this.pedidos.modalForm}`).modal('hide')} >VOLTAR</button>
                            {/* <router-link to="/pedidos" class="text-right"><button type="button" class="btn btn-danger btn-sm ml-1">VOLTAR</button></router-link> */}

                        </div>
                    </form>


                </div>
            </div>
        )
    }

})

export default Detalhes;