import Vue from 'vue';

import './style.scss';

import controller from './controller';
import formController from '../../../common/form/form.controller';

const Lista = Vue.extend({

    mixins: [controller, formController],

    render() {

        return (
            <div>

                <div class="Logs d-flex justify-content-center">
                    <div class="col-lg-9 col-md-11 col-sm-12">
                        <div class="card">
                            <div class="card-header">
                                <h5>Lista de atividades relacionadas ao usuário</h5>
                            </div>
                            <div class="p-3">

                                <div class="title">
                                    <i class="fa fa-list-ul"></i>Logs
                            </div>

                                {this.buildDataList()}

                            </div>
                            <div class="card-footer">

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