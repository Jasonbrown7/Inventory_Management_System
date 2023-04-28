<template>
    <v-app id="inspire">
    <v-main class="v-main">
        <v-container :class="heroImageClass" fluid fill-height >
            <v-card
              elevation="1c"
              class="mx-auto px-md-6 pb-md-4 pt-md-4"
              min-width="600"
            >
            <v-card-title class="text-h5 mb-1">Profile</v-card-title>
            <v-row><v-divider ></v-divider></v-row>
            <v-row>
                <v-col>
                    <!-- <v-avatar v-if="selectedImage" size="150">
                        <v-img :src="selectedImage"></v-img>
                    </v-avatar> -->
                    <v-avatar size="150" class="my-2">
                        <v-img :src="user.pic"></v-img>
                    </v-avatar>
                </v-col>
                <v-col>
                    <v-row>
                            <v-card-subtitle>Username: </v-card-subtitle>
                            <v-card-subtitle class="bold" color="black">
                                {{ user.username }}
                            </v-card-subtitle>
                    </v-row>
                    <v-row>
                            <v-card-subtitle>Email: </v-card-subtitle>
                            <v-card-subtitle class="bold" color="black">
                                {{ user.email }}
                            </v-card-subtitle>
                    </v-row>
                    <v-row>
                        <v-card-subtitle>Toggle Dark Mode</v-card-subtitle>
                        <v-switch 
                        v-model="$vuetify.theme.dark"
                        @click="switchTheme()"
                        class="mt-3" 
                        >
                        </v-switch>
                    </v-row>
                    <v-row>
                        <v-btn elevation=0 class="mb-5 ml-4" to="/reset-password">Reset Password</v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row>
                <v-col cols="6" class="mx-2 align-self-center">
                    <v-select
                        v-model="user.pic"
                        :items="images"
                        label="Select an Avatar"
                        item-text="name"
                        item-value="url"
                    ></v-select>
                </v-col>
                <v-col cols="5" class="mx-2 align-self-center">
                    <v-btn @click.prevent="save_user">Save Changes</v-btn>
                </v-col>
            </v-row>
            </v-card>
          </v-container>
    </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data() {
     return {
      user: {},
      darkMode: false,
      images: [
        { name: "Monke", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Monkey.png" },
        { name: "Dog", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Dog.jpg?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Emo", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Emo.png?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Panda", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Panda.png?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Skull", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Pandemic.jpg?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Smiley", url: "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png" },
    ],

    };
  },
  updated(){
    // console.log('updated')
    // this.toggleDarkMode() 
  },
  created() {
    
    axios.defaults.withCredentials = true; 
    axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
        .then((response) => {    
          this.isLoggedIn = true;
          this.$set(this, "user", response.data.user);
          
           
          
        }) 
        .catch((errors) => {  
     
            console.log(errors);
            this.$set(this, "user", {})
            this.isLoggedIn = false;
           
        })   
      },
    methods: {
        // toggleDarkMode() {
           
        //     if (this.user.darkmode) {
        //         this.$vuetify.theme.dark = true;
        //     }
        //     else {
        //         this.$vuetify.theme.dark = false;
        //     }
        // }, 

        switchTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

            localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
        // this.darkMode = this.$vuetify.theme.dark
      },

        save_user(){
            let apiURL = `http://localhost:4000/api/user/update/${this.user.id}`;
            axios
                .put(apiURL, this.user)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error);
                });
                
        },
    },
    // watch: {
    //   darkMode(){
    //     this.toggleDarkMode();
    //   }
    // },

    computed: {
    heroImageClass() {
      return this.$vuetify.theme.dark ? 'heroimagedark' : 'heroimage';
    }
  }
}
</script>

  
<style>
.heroimage {
    display: flex;
    width:100vw;
    height: calc(100vh - 56px);
    background: url("../assets/hero.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    background-attachment: fixed;
}

.heroimagedark {
  background-image: url("../assets/bentlydark.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.heroimage h1 {
    font-size: 50px;
    font-weight: 700;
    color:white;
}
.userinfo {
    color:white;
}
.bold {
    font-weight: bold;
  }
  
</style>