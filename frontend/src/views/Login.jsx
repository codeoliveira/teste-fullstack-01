import Vue from 'vue';

import LoginHeader from './../components/Header/LoginHeader'
import LoginForm from './../components/LoginForm';


const Body = Vue.extend({

  name: "Login",

  render() {
    return (
      <div class="login">

        <LoginHeader></LoginHeader>

        <LoginForm></LoginForm>


      </div>
    )
  }
});

export default Body;