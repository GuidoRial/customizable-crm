// External libraries
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
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
import Toast from 'primevue/toast';
import TriStateCheckbox from 'primevue/tristatecheckbox';

// Pinia setup
const pinia = createPinia();

// Components to be used
const toBeUsed = [router, pinia, PrimeVue, ToastService];

// Components with names and corresponding implementations
const components = [
  { name: 'InputText', component: InputText },
  { name: 'Checkbox', component: Checkbox },
  { name: 'Card', component: Card },
  { name: 'Button', component: Button },
  { name: 'InputGroup', component: InputGroup },
  { name: 'InputGroupAddon', component: InputGroupAddon },
  { name: 'Password', component: Password },
  { name: 'Toast', component: Toast },
  { name: 'TriStateCheckbox', component: TriStateCheckbox },
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
