import Vue from 'vue';
import FormController from './controller';

import './style.scss';

const Form = Vue.extend({

    mixins: [FormController],

    render() {

        return (

            <div class="FormUsuarios d-flex justify-content-center">
                <div class="col-lg-9 col-md-11 col-sm-12">
                    <div class="card">
                        <form
                            onSubmit={this.submitForm}
                        >
                            <div class="p-3">

                                <div class="title">
                                    <i class="fa fa-plus"></i>Usuarios / {this.pagina.title}
                                </div>

                            </div>

                            <div class="FormBody">
                                <div class="form-group">
                                    <label for="nome">Nome do Usuario</label>
                                    <input type="text"
                                        class="form-control"
                                        id="nome"
                                        aria-describedby="Digite aqui o nome da usuario"
                                        onkeydown={this.changeValue}
                                        onkeyup={this.changeValue}
                                        value={this.form.nome}
                                        placeholder="Digite o nome do usuario"
                                    />

                                </div>

                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text"
                                        class="form-control"
                                        id="email"
                                        aria-describedby="Digite aqui o email do usuario"
                                        onkeydown={this.changeValue}
                                        onkeyup={this.changeValue}
                                        value={this.form.email}
                                        placeholder="Digite o email do usuario"
                                    />

                                </div>


                                <div class="form-group" style={`display:${this.usuarios.id ? 'none' : 'block'}`}>
                                    <label for="senha">Senha</label>
                                    <input type="password"
                                        class="form-control"
                                        id="senha"
                                        aria-describedby="Digite aqui a senha do usuario"
                                        onkeydown={this.changeValue}
                                        onkeyup={this.changeValue}
                                        value={this.form.senha}
                                        placeholder="Digite a senha do usuario"
                                    />

                                </div>



                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-success btn-sm">{this.pagina.save}</button>
                                <button type="button" class="btn btn-warning btn-sm ml-1" onclick={this.resetForm}>Limpar</button>
                                <router-link to="/usuarios"><button type="button" class="btn btn-secondary btn-sm ml-1">Fechar</button></router-link>

                            </div>
                        </form>
                    </div>
                </div>
            </div >

        )
    }


})

export default Form;