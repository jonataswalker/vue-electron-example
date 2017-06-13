import Vue from 'vue';
import App from './App.vue';
import router from './router';

const app = new Vue({
  router,
  mounted() {
    console.log('mounted');
  },
  render: h => h(App)
});

export { app, router };
