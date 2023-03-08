<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
        <v-container class="heroimage" fluid fill-height>
          <v-card
            elevation="10"
            class="mx-auto px-md-6 pb-md-6 pt-md-4"
            min-width="500"
          >
        
            <v-form 
              @submit.prevent="handleSubmitForm" 
            >
              <v-container class="justify-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Username"
                      :rules="[v => !!v || 'Username is required']"
                      v-model="user.username"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      :rules="emailRules"
                      v-model="user.email"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Password"
                      :rules="[v => !!v || 'Password is required']"
                      v-model="user.password"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Confirm Password"
                      :rules="[v => !!v || 'Password is required']"
                      v-model="confirmedPassword"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="danger justify-center" type="submit">Sign Up</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
     
         
              <v-btn plain :to="{ name: 'loginView' }">Already have an account?</v-btn>

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
            confirmedPassword: "",
            user: {
                username: "",
                email: "",
                password: "",
            },
            emailRules: [
            value => {
              if (value) return true

              return 'Email is required.'
            },
            value => {
              if (/.+@.+\..+/.test(value)) return true

              return 'Please enter a valid email.'
              },
            ],
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
        methods: {
            handleSubmitForm() {
            let apiURL = "http://localhost:4000/api/user/create";
            if (this.confirmedPassword != this.user.password){
                window.alert("Passwords do not match.")
                return;
            }
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
