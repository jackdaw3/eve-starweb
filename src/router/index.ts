import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import LPStore from '../views/loyalty/LpStore.vue'
import LPOrder from '../views/loyalty/LpOrder.vue'
import Market from '../views/market/Market.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
