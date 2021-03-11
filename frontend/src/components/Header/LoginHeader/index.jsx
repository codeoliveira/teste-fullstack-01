import Vue from 'vue';

import './style.scss';

const LoginHeader = Vue.extend({
    name: "LoginHeader",
    render() {
        return (
            <div class="LoginHeader">
                <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                    </div>
                </nav>


            </div>
        )
    }
})

export default LoginHeader;