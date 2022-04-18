import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './router';
import store from './store/index';
import mitt from 'mitt';
import api from './utils/api';
import yaHelper from './base/ya-helper';
import http from './utils/request';

import '@/styles/index';

const app = createApp(App);
// app.config.productionTip = false;
app.config.globalProperties.$helper = yaHelper;
app.use(Antd).use(router).use(store);
app.mount('#app');
export const emitter = mitt();
