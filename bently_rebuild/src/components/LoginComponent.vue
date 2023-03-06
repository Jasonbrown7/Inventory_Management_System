    <template>
      <v-app id="inspire">
        <v-main class="v-main grey lighten-3">
          <v-container>
            <v-card
              elevation="0"
              class="mx-auto px-md-6 pb-md-6 pt-md-4"
              max-width="600"
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
                        label="Password"
                        :rules="[v => !!v || 'Password is required']"
                        v-model="user.password"
                        required
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-btn block color="danger justify-center" type="submit">Login</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-container>
        </v-main>
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
    import { eventBus } from "../main";

    export default {
    data() {
        return {
        user: {},
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
            this.$router.push("/browse")
            this.emit();
            })
            .catch((error) => {
            console.log("Login Fail.", error)
            window.alert("Incorrect Username or Password." );
            });

            
        },
        emit() {
          axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
            .then((response) => {    
              console.log("EMIT", response.data)
              eventBus.$emit("userLogin", response.data.user);
                // this.user = response.data.user; 
              
            }) 
            .catch((errors) => {  
             
                console.log("EMIT",errors);
           
            })  
        }
    },
    };

</script>
