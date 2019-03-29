import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
});
