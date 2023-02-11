<template>
    <body>
    
        <section class="heroimage">
            <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
                <button
                @click.prevent="logoutUser()"
                class="btn btn-danger btn-large">
                Logout
                </button>
          
                <h2 class="userinfo"> 
                Hello {{user.username}}!
                ID: {{user.id }} </h2>
                
                <h2 class="userinfo" v-if="user.isAdmin === true">
                    You are an ADMIN!
                </h2>

            
          </div>
        </section>
    </body>
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