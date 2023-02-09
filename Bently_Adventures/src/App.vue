<template>
  <v-app>
    <!-- Nav bar -->
    <v-toolbar color="indigo" dark>
      <v-toolbar-title class="mx-3">
        <router-link to="/">
          <img src="./assets/logo.png" alt="Bently Nevada" width="100" height="40">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/browse">Browse</v-btn>
        <v-btn text to="/create/reservations">Create Reservations</v-btn>
        <v-btn text to="/view/reservations">View Reservations</v-btn>
        <v-btn text to="/profile">Profile</v-btn>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/view/users">View Users</v-btn>
        <v-btn text to="/create/users">Create Users</v-btn>
        <v-btn text to="/view/items">View Items</v-btn>
        <v-btn text to="/create/items">Create Items</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- Router view -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
.navbar {
  height: 56px;
  display: flex;
  align-items: center;
}
</style>