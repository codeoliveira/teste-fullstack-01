import Vue from 'vue';

import DefaultHeader from './../components/Header/DefaultHeader';

const Body = Vue.extend({
  render() {
    return (
      <div class="home">

        <DefaultHeader></DefaultHeader>

      </div>
    )
  }
});

export default Body;