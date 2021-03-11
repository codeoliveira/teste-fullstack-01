import Vue from 'vue';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3000/';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'http://localhost:3000/api'
        });
    }
})


// axios.interceptors.request.use(
//     (config) => {
//         let token = sessionStorage.getItem('_token');

//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         return config;
//     },

//     (error) => {
//         return Promise.reject(error);
//     }
// );
