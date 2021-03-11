import Vue from 'vue';

import './style.scss';

import controller from './controller';
import formController from '../../../common/form/form.controller';

const Lista = Vue.extend({

    mixins: [controller, formController],

    render() {

        return (
            <div>

                <div class="Pedidos d-flex justify-content-center">
                    <div class="col-12 col-lg-9">
                        <div class="card">
                            <div class="card-header">
                                <button type="button" class="btn btn-primary btn-sm" onClick={this.add} >Adicionar</button>
                                <router-link to="/"><button type="button" class="btn btn-secondary btn-sm ml-1">Voltar</button></router-link>
                            </div>
                            <div class="p-3">

                                <div class="title">
                                    <i class="fa fa-list-ul"></i>Pedidos
                            </div>

                                {this.buildDataList()}

                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-sm" onClick={this.add} >Adicionar</button>
                                <router-link to="/"><button type="button" class="btn btn-secondary btn-sm ml-1">Voltar</button></router-link>
                            </div>
                        </div>
                    </div>
                </div>
                { this.extras}
            </div>
        )
    }
})

export default Lista;