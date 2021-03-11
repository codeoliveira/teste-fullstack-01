import Vue from 'vue';

import './App.scss';

const App = Vue.extend({
  name: "App",
  render() {
    return (
      <div class="App">
        <router-view></router-view>
        <div id="extras">{this.extras}</div>
      </div>
    )
  }
})

export default App;

