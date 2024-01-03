// External libraries
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-purple/theme.css';
import 'primeicons/primeicons.css';

// Components
import App from './App.vue';
import router from './router';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Password from 'primevue/password';

// Pinia setup
const pinia = createPinia();

// Components to be used
const toBeUsed = [router, pinia, PrimeVue];

// Components with names and corresponding implementations
const components = [
  { name: 'InputText', component: InputText },
  { name: 'Checkbox', component: Checkbox },
  { name: 'Card', component: Card },
  { name: 'Button', component: Button },
  { name: 'InputGroup', component: InputGroup },
  { name: 'InputGroupAddon', component: InputGroupAddon },
  { name: 'Password', component: Password },
];

// App creation and setup
const app = createApp(App);

toBeUsed.forEach((item) => {
  app.use(item);
});

components.forEach((item) => {
  app.component(item.name, item.component);
});

// Mount the app
app.mount('#app');
