<template>
  <div id="app">
    <v-toolbar app 
    color="light"
    elevation="3"
    outlined
    >
      <v-img
        alt="Bently Nevada"
        class="shrink mr-2"
        contain
        :src="require('./assets/logo1.png')"
        transition="scale-transition"
        width="200"
        href="/"
      />
      <v-spacer></v-spacer>
      <v-btn to="/">Home</v-btn>
      <v-btn to="/browse">Browse</v-btn>
      <v-btn to="/view/items">View Items</v-btn>
      <v-btn to="/create/items">Create Items</v-btn>
      <v-btn to="/view/reservations">View Reservations</v-btn>
      <v-btn to="/create/reservations">Create Reservations</v-btn>
      <v-btn to="/view/users">View Users</v-btn>
      <v-btn to="/create/users">Create Users</v-btn>
    </v-toolbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
