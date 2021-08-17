import { createApp } from 'vue';
import App from './App.vue';
import usePlugins from './plugins';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './styles/index.scss';

const app = createApp(App);

dayjs.locale('zh-ch');
app.config.globalProperties.$dayjs = dayjs;

usePlugins(app);

app.mount('#app');
