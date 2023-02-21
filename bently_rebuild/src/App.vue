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

     
       
    <template>

    <v-menu
      bottom
      offset-y
      style="display:block"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          icon to="/profile"
        >
          <v-icon v-if="isLoggedIn === false">mdi-account</v-icon>
          <!-- <v-img v-else :src="require(`../src/assets/${user.pic}`)"></v-img> -->
          
          <v-icon v-else>mdi-account-tie</v-icon>
          <!-- <v-img v-else src="../src/assets/LeviStrauss_headshot.jpg"></v-img> -->
        </v-avatar>
      </template>
      
      <v-list v-if="isLoggedIn === false">
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
          <v-btn v-if="item.title === 'Logout'" :to=item.route  @click="logoutUser" plain>{{ item.title }}</v-btn>
          <v-btn v-else :to=item.route plain> {{ item.title }} </v-btn>
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
import { eventBus } from "./main";
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
      ],
      isLoggedIn: false,

    };
  },
updated(){
  console.log("LOGGEDINUPDATE", this.isLoggedIn);
},

created(){  
    eventBus.$on("userLogin", (data) => {
      console.log("DATA", data);
      this.isLoggedIn = true;

    });
  },
  mounted() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
          this.isLoggedIn = true;
          this.$set(this, "user", response.data.user);
          console.log("MOUNT SUCCESS.")  
       
            // this.user = response.data.user; 
          
        }) 
        .catch((errors) => {  
            console.log("Mount not success hmm!")  
            console.log(errors);
            this.$set(this, "user", {})
            this.isLoggedIn = false;
        })   
      },
      methods: {
        logoutUser() {
        axios.defaults.withCredentials = true;
        let apiURL = `http://localhost:4000/api/auth/logout`;
            axios
            .post(apiURL)
            .then(() => {
                console.log("Logged out.");
                // this.$router.push("/"); 
                // this.$set(this, "user", null)
                this.isLoggedIn = false;
          
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
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
