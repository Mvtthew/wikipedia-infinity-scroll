import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

Vue.use(BootstrapVue);

Vue.filter('reverse', function(value) {
    // slice to make a copy of array, then reverse the copy
    return value.slice().reverse();
});