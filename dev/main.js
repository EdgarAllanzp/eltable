import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import DemoBlock from './components/demo-block';
import 'highlight.js/styles/github.css';
import './style.scss';
import Eltable from '../src/index';

Vue.use(ElementUI);
Vue.component('demo-block', DemoBlock);
Vue.component('eltable', Eltable);

new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
});
