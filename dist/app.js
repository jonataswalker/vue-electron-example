/*!
 * vue-electron-boilerplate - v0.0.1
 * Built: Tue Jun 13 2017 11:52:56 GMT-0300 (-03)
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue'), require('vue-router')) :
	typeof define === 'function' && define.amd ? define(['vue', 'vue-router'], factory) :
	(factory(global.Vue,global.VueRouter));
}(this, (function (Vue,Router) { 'use strict';

Vue = 'default' in Vue ? Vue['default'] : Vue;
Router = 'default' in Router ? Router['default'] : Router;

var App = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('h1',[_vm._v("App")]),_c('router-link',{attrs:{"to":"/about"}},[_vm._v("About")]),_c('p',[_c('router-view')],1)],1)},staticRenderFns: [],
  name: 'App'
};

var About = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',[_vm._v("About")])},staticRenderFns: [],
  name: 'About'
};

var router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/about', component: About }
  ]
});

const app = new Vue({
  router,
  mounted() {
    console.log('mounted');
  },
  render: h => h(App)
});

app.$mount('#app');

})));
