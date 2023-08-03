import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'animate.css';
import '../public/assets/fonts/css/myFonts.scss'
import '../public/assets/styles/element-ui.scss';
import moment from 'moment';
import md5 from 'md5';
import { Progress,Upload, Button, Dialog, Form, FormItem, Input, Tag, Card, MessageBox, Tabs, TabPane, DatePicker, TimePicker, Empty, Calendar, Steps, Step } from 'element-ui';

Vue.component('wingling-progress', Progress);
Vue.component('wingling-upload', Upload);
Vue.component('wingling-button', Button);
Vue.component('wingling-dialog', Dialog);
Vue.component('wingling-form', Form);
Vue.component('wingling-form-item', FormItem);
Vue.component('wingling-input', Input);
Vue.component('wingling-tag', Tag);
Vue.component('wingling-card', Card);
Vue.component('wingling-tabs', Tabs);
Vue.component('wingling-tab-pane', TabPane);
Vue.component('wingling-date-picker', DatePicker);
Vue.component('wingling-time-picker', TimePicker);
Vue.component('wingling-empty', Empty);
Vue.component('wingling-calendar', Calendar);
Vue.component('wingling-steps', Steps);
Vue.component('wingling-step', Step);
Vue.prototype.$moment = moment;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
