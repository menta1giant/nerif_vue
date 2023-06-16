import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "the-new-css-reset/css/reset.css";

import Multiselect from '@/components/Base/Multiselect';
import Positioner from '@/components/Base/Positioner';
import Chevron from '@/components/Base/Chevron';
import Popup from '@/components/Base/Popup';
import Switcher from '@/components/Base/Switcher';
import SwitcherField from '@/components/Base/SwitcherField';
import Label from '@/components/Base/Label';
import Icon from '@/components/Base/Icon';
import Button from '@/components/Base/Button';
import Modal from '@/components/Base/Modal';
import Tooltip from '@/components/Base/Tooltip';

createApp(App).use(store).use(router)
.component("nrf-switcher-field", SwitcherField)
.component("nrf-switcher", Switcher)
.component("nrf-label", Label)
.component("nrf-icon", Icon)
.component("nrf-multiselect", Multiselect)
.component("nrf-positioner", Positioner)
.component("nrf-popup", Popup)
.component("nrf-chevron", Chevron)
.component("nrf-button", Button)
.component("nrf-modal", Modal)
.component("nrf-tooltip", Tooltip)
.mount('#app')
