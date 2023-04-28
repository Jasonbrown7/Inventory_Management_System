<template>
  <div id="app">
    <v-app id="inspire">
    <v-app-bar app 
    
    elevation="0"
    outlined
    >
      <a href="/">
        <v-img
          alt="Bently Nevada"
          class="shrink mr-2"
          contain
          :src="imageUrl"
          width="200"
          height="56"
          href="/"
        />
      </a>
      <v-spacer></v-spacer>


      
                <!-- <v-switch 
                  id="dark-switch"
                  prepend-icon="mdi-light mdi-weather-sunny"
                  append-icon="mdi-light mdi-weather-night"
                 
                  plain class="nav-btn"
                  v-model="$vuetify.theme.dark"
                  @click="switchTheme()"
                /> -->
              

      <v-btn to="/browse" plain class="nav-btn">Browse</v-btn>
      <v-btn v-if="isLoggedIn" :to="{ name:  'my-reservations', params: { user_id: user.id } }" plain class="nav-btn">My Reservations</v-btn>
      <template v-if="isAdmin === true">
        <v-btn plain class="nav-btn mr-0" id="menu-activator">Admin</v-btn>
        <v-menu activator="#menu-activator" bottom offset-y style="display:block" open-on-hover>
          <v-list>
            <v-list-item
              v-for="(adminPage, index) in adminPages"
              :key="index"
            >
              <v-btn :to=adminPage.route plain>{{ adminPage.title }}</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
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
          <v-icon v-if="isAdmin === true">mdi-account-hard-hat</v-icon>
          <v-icon v-else-if="isLoggedIn === false">mdi-account-outline</v-icon>
          <!-- <v-img v-else :src="require(`../src/assets/${user.pic}`)"></v-img> -->
          <v-icon v-else>mdi-account</v-icon>
          <!-- <v-img :src="user.pic" v-else></v-img> -->
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
      adminPages: [
        { title: "Inventory", route:  `/view/items` },
        { title: "Reservations", route: `/view/reservations`},
        { title: "Users", route: `/view/users`}
      ],
      loggedInItems: [
        { title: "Profile", route: "/profile"},
        { title: "Logout", route: "/"}
      ],
      isLoggedIn: false,
      isAdmin: false,
      // darkMode: this.$vuetify.theme.dark,
    };
  },

created(){  
    eventBus.$on("userLogin", (data) => {
      this.$set(this, "user", data);
      this.isLoggedIn = true;
      this.isAdmin = data.isAdmin;
    });
  },
  mounted() {
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
          this.isLoggedIn = true;
          this.$set(this, "user", response.data.user);
          this.isAdmin = response.data.user.isAdmin;
          console.log("MOUNTED ADMIN", response.data.user.isAdmin)
            // this.user = response.data.user; 
          
        }) 
        .catch((errors) => {  
     
            console.log(errors);
            this.$set(this, "user", {})
            this.isLoggedIn = false;
            this.isAdmin = false;
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
                this.$set(this, "user", {});
                this.isLoggedIn = false;
                this.isAdmin = false;
            })
            .catch((error) => {
                console.log(error);
            });
        },

      //   toggleDarkMode() {
      //   if (this.darkMode) {
      //     this.$vuetify.theme.dark = false;
      //   }
      //   else {
      //     this.$vuetify.theme.dark = true;
      //   }
      // },

      switchTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

        localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
        // this.darkMode = this.$vuetify.theme.dark
      }
    },

    // watch: {
    //   darkMode()
    //   {
    //     this.toggleDarkMode();
    //   }
    // },

    computed: {
      imageUrl() {
        if (this.$vuetify.theme.dark === true) {
          return require('./assets/logo1_copy.png')
        } else {
          return require('./assets/logo1.png')
        } 
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

.nav-btn:hover {
  color: #26685d;
}
</style>
