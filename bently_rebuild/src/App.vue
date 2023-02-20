<template>
  <div id="app">
    <v-app id="inspire">
    <v-app-bar app 
    color="light"
    elevation="0"
    outlined
    >
      <a href="/">
        <v-img
          alt="Bently Nevada"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo1.png')"
          width="200"
          height="56"
          href="/"
        />
      </a>
      <v-spacer></v-spacer>
     
      <v-btn to="/browse" plain>Browse</v-btn>
      <v-btn to="/view/items" plain>Inventory</v-btn>
      <v-btn to="/view/reservations" plain>Reservations</v-btn>
      <!-- <v-btn to="/create/reservations" plain>Create Reservations</v-btn> -->
      <v-btn to="/view/users" plain>Users</v-btn>
      <!-- <v-btn to="/create/users" plain>Create Users</v-btn> -->

     
       <v-btn to="/browse/itempage" plain>ItemPage</v-btn>
    <template>

    <v-menu
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          icon to="/profile"
        >
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </template>

      <v-list v-if="user === null">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-btn :to=item.route plain>{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, index) in loggedInItems"
          :key="index"
        >
          <v-btn :to=item.route plain>{{ item.title }}</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

  </template>
    </v-app-bar>
    <router-view/>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
     return {
      user: {},
      items: [
        { title: "Log In", route:  `/login` },
        { title: "Sign Up", route: `/create/users`}
      ],
      loggedInItems: [
        { title: "Profile", route: "/profile"},
        { title: "Logout", route: "/"}
      ]

    };
  },
  mounted() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
            console.log(response);
            this.$set(this, "user", response.data.user)   
            // this.user = response.data.user; 
            console.log(this.user)
        }) 
        .catch((errors) => {    
            console.log(errors)
            this.$set(this, "user", null)
            console.log(this.user)
        })   
      },
  beforeUpdate() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
            console.log(response);
            this.$set(this, "user", response.data.user)   
            // this.user = response.data.user; 
            console.log(this.user)
        }) 
        .catch((errors) => {    
            console.log(errors)
            this.$set(this, "user", null)
            console.log(this.user)
        })   
      }
    }
</script>

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
