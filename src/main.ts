// External libraries
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

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
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Steps from 'primevue/steps';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Divider from 'primevue/divider';
import Tooltip from 'primevue/tooltip';
import ConfirmPopup from 'primevue/confirmpopup';

// Pinia setup
const pinia = createPinia();

// Components to be used
const toBeUsed = [router, pinia, PrimeVue, ToastService, ConfirmationService];

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
  { name: 'Message', component: Message },
  { name: 'ProgressSpinner', component: ProgressSpinner },
  { name: 'Menubar', component: Menubar },
  { name: 'Avatar', component: Avatar },
  { name: 'Menu', component: Menu },
  { name: 'Steps', component: Steps },
  { name: 'Textarea', component: Textarea },
  { name: 'Dropdown', component: Dropdown },
  { name: 'Divider', component: Divider },
  { name: 'ConfirmPopup', component: ConfirmPopup },
];

// App creation and setup
const app = createApp(App);

toBeUsed.forEach((item) => {
  app.use(item);
});

components.forEach((item) => {
  app.component(item.name, item.component);
});

app.directive('tooltip', Tooltip);

// Mount the app
app.mount('#app');
