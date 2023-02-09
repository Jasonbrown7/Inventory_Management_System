import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewItemsView from '../views/ViewItemsView.vue'
import BrowseView from '../views/BrowseView.vue'
import CreateItemComponent from '../views/CreateItemView.vue'

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
    component: CreateItemComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
