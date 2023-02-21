<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-card
            elevation="0"
            class="mx-auto px-md-6 pb-md-6 pt-md-4"
            max-width="600"
          >
            <h3 class="text-center">Create User</h3>
            <v-form 
              @submit.prevent="handleSubmitForm" 
            >
              <v-container class="justify-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Username"
                      v-model="user.username"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      v-model="user.email"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Password"
                      v-model="user.password"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="danger justify-center" type="submit">Create</v-btn>
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
            user: {
                username: "",
                email: "",
                password: "",
            },
            };
        },
        methods: {
            handleSubmitForm() {
            let apiURL = "http://localhost:4000/api/user/create";

            axios
                .post(apiURL, this.user)
                .then(() => {
                this.$router.push("/view/users");
                this.user = {
                    username: "",
                    email: "",
                    password: "",
                };
                })
                .catch((error) => {
                console.log(error);
                });
            },
        },
    };
</script>
