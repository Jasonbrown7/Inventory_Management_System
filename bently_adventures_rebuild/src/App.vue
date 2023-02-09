



<template>
  <v-app>
  
    <v-toolbar app 
    color="light"
    elevation="3"
    outlined
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link href="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo1.png')"
          transition="scale-transition"
          width="200"
        />
      </router-link>
      <v-spacer></v-spacer>
      <v-btn text>Browse</v-btn>
      <v-btn text>Create Reservations</v-btn>
      <v-btn text>View Reservations</v-btn>
      <v-btn text>Profile</v-btn>
      <v-btn text>Login</v-btn>
      <v-btn text>View Users</v-btn>
      <v-btn text>Create Users</v-btn>
      <v-btn text href="/view/items">View Items</v-btn>
      <v-btn text>Create Items</v-btn>
    </v-toolbar>

    <router-view>
      <HomeComponent />
    </router-view>
  </v-app>
</template>


<script>
import HomeComponent from './components/HomeComponent';

export default {
  name: 'App',

  components: {
    HomeComponent,
  },

  data: () => ({
    //
  }),
};
</script>
