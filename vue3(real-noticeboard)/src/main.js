import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue';

import App from './App.vue';
import globalComponents from './plugins/global-components';
import router from './router';

const app = createApp(App);
app.use(globalComponents);
app.use(router);
app.mount('#app');
