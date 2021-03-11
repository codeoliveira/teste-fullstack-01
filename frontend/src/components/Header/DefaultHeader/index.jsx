import Vue from 'vue';
import './style.scss';
import Auth from './../../../modules/auth/auth';

const DefaultHeader = Vue.extend({

    beforeCreate() {
        let usuario = JSON.parse(sessionStorage.getItem('logged'));
        this.$store.state.usuario = usuario;
        this.usuario = usuario;
        Auth.methods.defineHeaderAuthorization(this.$http);
    },

    mixins: [Auth],

    render() {
        return (
            <div class="DefaultHeader bg-dark">
                <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                    <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <router-link to="/pedidos" class="nav-link" href="#">Pedidos</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/categorias" class="nav-link" href="#">Categorias</router-link>

                            </li>
                            <li class="nav-item">
                                <router-link to="/produtos" class="nav-link" href="#">Produtos</router-link>
                            </li>

                        </ul>

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.usuario.nome}</a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                                    <router-link to="/logs"><a class="dropdown-item" href="#">Ver log de atividades</a></router-link>
                                    <router-link to="/usuarios"><a class="dropdown-item" href="#">Cadastrar novo usuário</a></router-link>
                                    <div class="btn-sair">
                                        <button type="button"
                                            class="btn btn-danger btn-sm"
                                            onClick={this.logOut}
                                        >Sair</button>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        )
    }
})

export default DefaultHeader;