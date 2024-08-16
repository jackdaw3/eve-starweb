import { createApp } from "vue";
import ElementPlus from "element-plus";

import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import HighchartsVue from "highcharts-vue";
import HC_more from "highcharts/highcharts-more";
import stockInit from "highcharts/modules/stock";
import grey from "highcharts/themes/grid-light";
import accessibility from 'highcharts/modules/accessibility';
import ContextMenu from '@imengyu/vue3-context-menu'

import App from "./App.vue";
import i18n from "./i18n/i18n";
import store from './store' 
import router from './router' 

import "~/styles/index.scss";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "~/styles/theme.css";
import "uno.css";
import "element-plus/theme-chalk/src/message.scss";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

import { getUserInfo} from './user.js';

accessibility(Highcharts);
exportingInit(Highcharts);
stockInit(Highcharts);
grey(Highcharts);
HC_more(Highcharts);
Highcharts.setOptions({
    lang: {
      thousandsSep: ",",
    },
  });
  
const app = createApp(App);
app.use(ElementPlus);
app.use(i18n); 
app.use(store); 
app.use(router);
app.use(HighchartsVue);
app.use(ContextMenu);
app.config.globalProperties.$Highcharts = Highcharts;
app.config.globalProperties.$getUserInfo = getUserInfo;
app.mount("#app");
