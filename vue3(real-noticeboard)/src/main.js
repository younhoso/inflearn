import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue';

import App from './App.vue';
import funcPlugins from './plugins/func';
import objPlugins from './plugins/obj';
import person from './plugins/person';
import router from './router';

const app = createApp(App);
app.use(funcPlugins);
app.use(objPlugins, { name: '소윤호' });
app.use(person, { name: '홍길동' });
app.use(router);
app.mount('#app');
