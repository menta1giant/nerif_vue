import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "the-new-css-reset/css/reset.css";

import Switcher from '@/components/Base/Switcher';
import SwitcherField from '@/components/Base/SwitcherField';
import Label from '@/components/Base/Label';
import Icon from '@/components/Base/Icon';

createApp(App).use(store).use(router)
.component("nrf-switcher-field", SwitcherField)
.component("nrf-switcher", Switcher)
.component("nrf-label", Label)
.component("nrf-icon", Icon)
.mount('#app')
