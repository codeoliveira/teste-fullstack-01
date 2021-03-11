import Vue from 'vue';

import DefaultHeader from './../../components/Header/DefaultHeader';
import Body from './../../components/Body';
import Lista from './Lista';
import controller from './controller';

import './style.scss';

const Home = Vue.extend({


    mixins: [controller],

    render() {
        return (
            <Body>

                <DefaultHeader></DefaultHeader>

                <router-view></router-view>
                <div id="form">{this.formArea}</div>

                <Lista></Lista>

            </Body>

        )
    }

})

export default Home;