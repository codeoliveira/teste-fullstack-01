import Vue from 'vue';
import FormController from './controller';

import './style.scss';

const Form = Vue.extend({

    mixins: [FormController],

    render() {

        return (

            <div class="FormProdutos d-flex justify-content-center">
                <div class="col-lg-9 col-md-11 col-sm-12">
                    <div class="card">
                        <form
                            onSubmit={this.submitForm}
                        >
                            <div class="p-3">

                                <div class="title">
                                    <i class="fa fa-plus"></i>Produtos / {this.pagina.title}
                                </div>

                            </div>

                            <div class="FormBody">
                                <div class="form-group">
                                    <label for="nome">Nome do Produto</label>
                                    <input type="text"
                                        class="form-control"
                                        id="nome"
                                        aria-describedby="Digite aqui o nome da produto"
                                        onkeydown={this.changeValue}
                                        onkeyup={this.changeValue}
                                        value={this.form.nome}
                                        placeholder="Digite o nome do produto"
                                    />

                                </div>

                                <div class="form-group">
                                    <label for="preco">Preço</label>
                                    <input type="text"
                                        class="form-control"
                                        id="preco"
                                        aria-describedby="Digite aqui o preço do produto"
                                        onkeydown={this.changeValue}
                                        onkeyup={this.changeValue}
                                        value={this.form.preco}
                                        placeholder="Digite o preço do produto"
                                    />

                                </div>

                                <div class="form-group">
                                    <label for="categoria">Categoria</label>
                                    <select type="text"
                                        class="form-control"
                                        id="categoria"
                                        aria-describedby="Selecione aqui a categoria do produto"
                                        onchange={this.changeValue}
                                        value={this.form.categoria}
                                        placeholder="Selecione a categoria do produto"
                                    >
                                        <option value="">--- SELECIONE UMA CATEGORIA ---</option>
                                        {this.optionCategorias}
                                    </select>
                                </div>
                                {this.alertHTML}

                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-success btn-sm">{this.pagina.save}</button>
                                <button type="button" class="btn btn-warning btn-sm ml-1" onclick={this.resetForm}>Limpar</button>
                                <router-link to="/produtos"><button type="button" class="btn btn-secondary btn-sm ml-1">Fechar</button></router-link>

                            </div>
                        </form>
                    </div>
                </div>
            </div >

        )
    }


})

export default Form;