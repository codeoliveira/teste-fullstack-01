import Vue from 'vue';
import FormController from './controller';
import Carrinho from './../Carrinho';

import './style.scss';

const Form = Vue.extend({

    mixins: [FormController],

    render() {

        return (
            <div>
                <div class="FormPedidos d-flex justify-content-center">
                    <div class="col-lg-9 col-md-11 col-sm-12">
                        <div class="card">
                            <form
                                onSubmit={this.submitForm}
                            >
                                <div class="p-3">

                                    <div class="title">
                                        <i class="fa fa-plus"></i>Pedidos / Adicionar produtos
                                    </div>

                                </div>

                                <div class="FormBody">

                                    <div class="row">
                                        <div class="col-12 col-md-8">
                                            <div class="form-group">
                                                <label for="produto">Produto</label>
                                                <select type="text"
                                                    class="form-control"
                                                    id="produto"
                                                    aria-describedby="Selecione aqui a produto do pedido"
                                                    onchange={this.changeValue}
                                                    value={this.form.produto}
                                                    placeholder="Selecione a produto do pedido"
                                                >
                                                    <option value="">--- SELECIONE UMA CATEGORIA ---</option>
                                                    {this.optionProdutos}
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <div class="form-group">
                                                <label for="quantidade">Quantidade</label>
                                                <input type="text"
                                                    class="form-control"
                                                    id="quantidade"
                                                    aria-describedby="Digite aqui o quantidade do produto"
                                                    onkeydown={this.changeValue}
                                                    onkeyup={this.changeValue}
                                                    value={this.form.quantidade}
                                                    placeholder="Digite o quantidade do produto"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    {this.alertHTML}

                                </div>

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-success btn-sm">{this.pagina.save}</button>
                                    <button type="button" class="btn btn-warning btn-sm ml-1" onclick={this.resetForm}>Limpar</button>
                                    <router-link to="/pedidos"><button type="button" class="btn btn-secondary btn-sm ml-1">Fechar</button></router-link>

                                </div>
                            </form>
                        </div>
                    </div>
                </div >

                <Carrinho></Carrinho>

            </div>
        )
    }


})

export default Form;