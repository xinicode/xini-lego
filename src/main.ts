import '@/styles/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import mitt from 'mitt';
import { createApp } from 'vue';
import App from './App.vue';
import yaHelper from './base/ya-helper';
import router from './router';
import store from './store/index';

const app = createApp(App);
// app.config.productionTip = false;
app.config.globalProperties.$helper = yaHelper;
app.use(Antd).use(router).use(store);
app.mount('#app');
export const emitter = mitt();
