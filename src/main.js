import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'the-new-css-reset/css/reset.css';

import Multiselect from '@/components/Base/Select/Multiselect';
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
import Section from '@/components/Base/Section';
import Input from '@/components/Base/Input';
import Select from '@/components/Base/Select/Select';
import Textarea from '@/components/Base/Textarea';
import RadioButton from '@/components/Base/RadioButton';
import IconButton from '@/components/Base/IconButton';
import Loader from '@/components/Base/Loader';

createApp(App).use(store).use(router)
.component("v-switcher-field", SwitcherField)
.component("v-switcher", Switcher)
.component("v-label", Label)
.component("v-icon", Icon)
.component("v-multiselect", Multiselect)
.component("v-select", Select)
.component("v-positioner", Positioner)
.component("v-popup", Popup)
.component("v-chevron", Chevron)
.component("v-button", Button)
.component("v-modal", Modal)
.component("v-tooltip", Tooltip)
.component("v-section", Section)
.component("v-input", Input)
.component("v-textarea", Textarea)
.component("v-radio-button", RadioButton)
.component("v-icon-button", IconButton)
.component("v-loader", Loader)
.mount('#app')