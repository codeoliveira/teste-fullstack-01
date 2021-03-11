import Vue from 'vue';

import LoginFormController from './controller';
import Auth from './../../modules/auth/auth';

import './style.scss';

const LoginForm = Vue.extend({

    name: "LoginForm",

    mixins: [LoginFormController, Auth],

    render() {
        return (
            <div class="LoginForm">
                <div>

                    <form onSubmit={this.login}>
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div class="form-group">
                                        <label for="email">Usuário</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="email"
                                            aria-describedby="Digite seu email para fazer o login"
                                            onChange={this.changeValue}
                                            value={this.form.email}
                                            placeholder="Digite seu email"

                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="senha">Senha</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="senha"
                                            onChange={this.changeValue}
                                            value={this.form.senha}
                                            placeholder="Digite sua senha"
                                        />
                                    </div>
                                    <div class="loginError">{this.alertHTML}</div>
                                </li>
                            </ul>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-success">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
})

export default LoginForm;