<template>
    <v-app id="inspire">
      <v-main 
      v-bind:style="{ background: this.$vuetify.theme.dark == true ? primary : '#EEEEEE'}">
        <v-container>
          <v-card
            elevation="0"
            class="mx-auto px-md-6 pb-md-6 pt-md-4"
            max-width="600"
          >
            <h3 class="text-center">Edit User</h3>
            <v-form 
              @submit.prevent="handleUpdateForm" 
              class="text-center"
            >
              <v-container class="justify-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Username"
                      v-model="user.username"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      v-model="user.email"
                      disabled
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-switch
                      :label="`Admin: ${user.isAdmin}`"
                      v-model="user.isAdmin"
                    
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="danger justify-center" type="submit" class="submit">Update User</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        user: {},
      };
    },
  //   beforeCreate(){
  //   let apiURL = `http://localhost:4000/api/auth/admin`;
  //   axios
  //   .get(apiURL)
  //   .then((res) => {
  //     console.log(res.data)
     
  //   })
  //   .catch(() => {
  //       window.alert("ur not that guy pal!")
  //       this.$router.push("/");
  //     });
  // },
    created() {
      let apiURL = `http://localhost:4000/api/user/edit/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
        this.user = res.data;
      });
    },
    methods: {
      handleUpdateForm() {
        let apiURL = `http://localhost:4000/api/user/update/${this.$route.params.id}`;
        axios
          .put(apiURL, this.user)
          .then((res) => {
            console.log(res);
            console.log(this.$route.params.id)
            
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>