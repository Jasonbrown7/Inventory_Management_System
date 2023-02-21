import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewItemsView from '../views/ViewItemsView.vue'
import AdminViewItemView from '../views/AdminViewItemView.vue'
import BrowseView from '../views/BrowseView.vue'
import CreateItemView from '../views/CreateItemView.vue'
import EditItemView from '../views/EditItemView.vue'
import EditReservationView from '../views/EditReservationView.vue'
import EditUserView from '../views/EditUserView.vue'
import ViewReservationsView from '../views/ViewReservationsView.vue'
import CreateReservationView from '../views/CreateReservationView.vue'
import ViewUsersView from '../views/ViewUsersView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ItemPageView from '../views/ItemPageView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginView',
    component: LoginView
  },
  {
    path: '/browse',
    name: 'browseView',
    component: BrowseView
  },
  {
    path: '/view/items',
    name: 'view-items',
    component: ViewItemsView
  },
  {
    path: '/view/items/:id',
    name: 'admin-viewitem',
    component: AdminViewItemView
  },
  {

    path: '/browse/itempage/:id',
    name: 'browse-itempage',
    component: ItemPageView
  },
  {
    path: '/create/items',
    name: 'create-item',
    component: CreateItemView
  },
  {
    path: '/edit/item/:id',
    name: 'edit-item',
    component: EditItemView,
  },
  {
    path: '/edit/reservation/:id',
    name: 'edit-reservation',
    component: EditReservationView,
  },
  {
    path: '/edit/user/:id',
    name: 'edit-user',
    component: EditUserView,
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
  {
    path: '/view/users',
    name: 'view-users',
    component: ViewUsersView
  },
  {
    path: '/create/users',
    name: 'create-users',
    component: CreateUserView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
