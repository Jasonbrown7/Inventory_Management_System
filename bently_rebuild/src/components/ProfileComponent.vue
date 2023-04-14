<template>
    <v-app id="inspire">
    <v-main class="v-main">
        <v-container class="heroimage" fluid fill-height >
  
            <v-card
              elevation="1c"
              class="mx-auto px-md-6 pb-md-6 pt-md-4"
              min-width="500"
            >
            <v-card-title class="text-h5 mb-1">Profile</v-card-title>
            <v-row><v-divider ></v-divider></v-row>
            <v-row>
                <v-col>
                    <v-avatar
                    size="200"
                    >
                    <v-img
                    :src="user.pic"></v-img>
                </v-avatar>
                  
                    <v-row> <v-btn plain class="mt-4">Change profile picture</v-btn></v-row>
                </v-col>
                <v-col>
                    <v-row>Hello {{user.username}}!</v-row>
                    <v-row>Email: {{user.email}}</v-row>
                    <v-row>Change Password</v-row>
                    <v-row>Dark Mode Toggle</v-row>
            
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
</style>