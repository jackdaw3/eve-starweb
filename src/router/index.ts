import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/info/Privacy.vue'
import FAQ from '../views/info/FAQ.vue'
import LPStore from '../views/loyalty/LpStore.vue'
import LPOrder from '../views/loyalty/LpOrder.vue'
import Market from '../views/market/Market.vue'
import Appraisal from '../views/appraisal/Appraisal.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/lpstore',
    name: 'LpStore',
    component: LPStore
  },
  {
    path: '/lporder/:regionId/:corporationId/:offerId',
    name: 'LpOrder',
    component: LPOrder,
    props: (route) => ({
      ...route.params,
      ...route.query
    })
  },
  {
    path: '/market',
    name: 'Market',
    component: Market
  },
  {
    path: '/appraisal',
    name: 'Appraisal',
    component: Appraisal
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
