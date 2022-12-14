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
    path: '/edit/user/:id',
    name: 'edit-user',
    component: () => import('../components/EditUserComponent'),
  },
  {
    path: '/edit/item/:id',
    name: 'edit-item',
    component: () => import('../components/EditItemComponent'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComponent'),
  },
  {
    path: '/create-user',
    name: 'create-user',
    component: () => import('../components/CreateUserComponent'),
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
    path: '/items',
    name: 'items',
    component: () => import('../components/AdminItemsComponent'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/AdminUsersComponent'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})



export default router
