import Router from 'vue-router';
import About from 'About';

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/about', component: About }
  ]
});
