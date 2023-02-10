<template>
    <v-app id="inspire">
          <v-container class="heroimage" fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-12">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title>Login Credentials</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                        <v-form @submit.prevent="handleSubmitForm" class="card p-4" style="width: 23rem;">
                            <v-text-field
                               label="Username"
                               type="text"
                            ></v-text-field>
                            <v-text-field
                               id="password"
                               label="Password"
                               type="password"
                            ></v-text-field>
                         </v-form>
                      </v-card-text>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="btn btn-danger btn-block" ref="loginbutton">Login</v-btn>
                      </v-card-actions>
                   </v-card>
                </v-flex>
             </v-layout>
          </v-container>
    </v-app>
</template>

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

</style>
<script>


    import axios from "axios";
    export default {
    data() {
        return {
        user: {
        },
        };
    },
    methods: {
        handleSubmitForm() {
        let apiURL = "http://localhost:4000/api/auth/login/password";

        axios.defaults.withCredentials = true;
        axios
            .post(apiURL, {username: this.user.username, password: this.user.password})
            .then(() => {
            console.log("Login Success.")
            this.$router.push("/view/users")
        
            })
            .catch((error) => {
            console.log("Login Fail.", error)
            });
        },
    },
    };

</script>
