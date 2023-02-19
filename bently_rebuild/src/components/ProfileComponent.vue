<template>
    <v-app id="inspire">
    <v-main class="v-main grey lighten-3">
    
        
            <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
          
                
                <h2> 
                Hello {{user.username}}!
                ID: {{user.id }} </h2>
               pic: {{user.pic }}
                <h2 class="userinfo" v-if="user.isAdmin === true">
                    You are an ADMIN!
                </h2>
                <!-- <v-button
                @click.prevent="logoutUser()"
                class="btn btn-danger btn-large">
                Logout
                </v-button> -->
                <!-- <img src="../assets/LeviStrauss_headshot.jpg">Profiel Pic -->
                <!-- <img :src="require(`../assets/${user.pic}`)"> -->
                <!-- <img :src="user.pic">Profiel Pic -->
                <!-- <img src="../assets/LeviStrauss_headshot.jpg"> -->
               <!-- <v-img :src="require(`../assets/${user.pic}`)"></v-img> -->
                <!-- <v-img src="../assets/LeviStrauss_headshot.jpg">Profiel Pic</v-img> -->
            </div>
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