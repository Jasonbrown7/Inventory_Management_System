import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HomeComponent'),
  },
  {
    path: '/create-users',
    name: 'create-users',
    component: () => import('../components/CreateUserComponent'),
  },
  {
    path: '/view-users',
    name: 'view-users',
    component: () => import('../components/ViewUserComponent'),
  },
  {
    path: '/edit-user/:id',
    name: 'edit-user',
    component: () => import('../components/EditUserComponent'),
  },
  {
    path: '/edit-item/:id',
    name: 'edit-item',
    component: () => import('../components/EditItemComponent'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComponent'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/ProfileComponent'),
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('../components/BrowseComponent'),
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: () => import('../components/ReservationsComponent'),
  },
  {
    path: '/create-items',
    name: 'create-items',
    component: () => import('../components/CreateItemComponent'),
  },
  {
    path: '/view-items',
    name: 'view-items',
    component: () => import('../components/ViewItemComponent'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
