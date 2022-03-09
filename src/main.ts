import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import router from './routes';

const app = createApp(App);
// app.config.productionTip = false; 
app.use(Antd).use(router);
app.mount('#app');