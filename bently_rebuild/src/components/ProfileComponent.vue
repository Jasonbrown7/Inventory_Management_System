<template>
    <v-app id="inspire">
    <v-main class="v-main">
        <v-container class="heroimage" fluid fill-height >
  
            <v-card
              elevation="1c"
              class="mx-auto px-md-6 pb-md-4 pt-md-4"
              min-width="600"
            >
            <v-card-title class="text-h5 mb-1">Profile</v-card-title>
            <v-row><v-divider ></v-divider></v-row>
            <v-row>
                <v-col>
                    <v-avatar v-if="selectedImage" size="150">
                        <v-img :src="selectedImage"></v-img>
                    </v-avatar>
                    <v-avatar v-else size="150" class="my-2">
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
                        <v-switch class="mt-3" v-model="darkMode">
                        </v-switch>
                    </v-row>
            
                </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row>
                <v-col cols="6" class="mx-2 align-self-center">
                    <v-select
                        v-model="selectedImage"
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
      darkMode: null,
      images: [
        { name: "Monke", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Monkey.png" },
        { name: "Dog", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Dog.jpg?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Emo", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Emo.png?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Panda", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Panda.png?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Skull", url: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Pandemic.jpg?q=50&fit=crop&w=740&dpr=1.5" },
        { name: "Smiley", url: "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Smiley-Face.png" },
    ],
      selectedImage: "",
      profilePicUrl: null,
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
            console.log(errors, "Cannot view profile page unless logged in.")    
            this.$router.push("/login")  
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
                this.$router.push("/"); 
            })
            .catch((error) => {
                console.log(error);
            });
        },
        toggleDarkMode() {
            if (this.darkMode) {
                this.$vuetify.theme.dark = true;
            }
            else {
                this.$vuetify.theme.dark = false;
            }
        }, 
        changeImage() {
            console.log('Selected image:', this.selectedImage);
        },
        save_user(){
            console.log(this.user)
            let apiURL = `http://localhost:4000/api/user/update/${this.user.id}`;
            axios
                .put(apiURL, this.user)
                .then((res) => {
                    this.user = res.data;
                    this.user.pic = this.selectedImage;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    watch: {
      darkMode(){
        this.toggleDarkMode();
      }
    },
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