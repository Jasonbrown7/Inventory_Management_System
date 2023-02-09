<template>
    <v-app>
      <v-content>
        <v-container class="heroimage" fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex>
              <h1 class="text-center white--text display-1">Bently Adventures</h1>
              <v-flex xs12 text-center class="mt-5">
                <v-btn color="primary" large href="/">Begin your adventure »</v-btn>
                <v-btn color="light" large @click.prevent="logoutUser">Logout</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  <style scoped>
  .heroimage {
    background-image: url("../assets/hero.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
  </style>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    methods: {
      logoutUser() {
        axios.defaults.withCredentials = true;
        let apiURL = `http://localhost:4000/api/auth/logout`;
        axios
          .post(apiURL)
          .then(() => {
            console.log("Logged out.")
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>