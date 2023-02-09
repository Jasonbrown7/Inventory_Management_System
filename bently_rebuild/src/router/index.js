import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewItemsView from '../views/ViewItemsView.vue'
import BrowseView from '../views/BrowseView.vue'
import CreateItemView from '../views/CreateItemView.vue'
import ViewReservationsView from '../views/ViewReservationsView.vue'
import CreateReservationView from '../views/CreateReservationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseView
  },
  {
    path: '/view/items',
    name: 'view-items',
    component: ViewItemsView
  },
  {
    path: '/create/items',
    name: 'create-item',
    component: CreateItemView
  },
  {
    path: '/view/reservations',
    name: 'view-reservations',
    component: ViewReservationsView
  },
  {
    path: '/create/reservations',
    name: 'create-reservations',
    component: CreateReservationView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
