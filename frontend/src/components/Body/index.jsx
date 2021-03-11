import Vue from 'vue';

import './style.scss';

const Body = Vue.extend({

    name: "Body",

    render() {
        return (<div class="Body">
            {this.$slots.default}
        </div>)
    }

});

export default Body;