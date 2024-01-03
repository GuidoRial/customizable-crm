import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';

import Checkbox from 'primevue/checkbox';

import 'primevue/resources/themes/lara-dark-purple/theme.css';
import 'primeicons/primeicons.css';
const pinia = createPinia();

const toBeUsed = [router, pinia, PrimeVue];
const components = [{ name: 'InputText', component: InputText }, { name: 'Checkbox', component: Checkbox }];

const app = createApp(App);

toBeUsed.forEach((item) => {
  app.use(item);
});

components.forEach((item) => {
  app.component(item.name, item.component);
});

app.mount('#app');

// createApp(App).use(router).use(pinia).use(PrimeVue).component('InputText', InputText).mount('#app');
