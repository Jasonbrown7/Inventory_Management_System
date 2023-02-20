<!-- <template>
    <body>
    
        <section class="heroimage">
            <div class="d-flex flex-column align-items-center justify-content-center container-fluid">
              <h1 class="text-center">User Login</h1>
              <form @submit.prevent="handleSubmitForm" class="card p-4" style="width: 23rem;">
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              v-model="user.username"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              required
            />
          </div>
  
  
          <div class="form-group">
            <button class="btn btn-danger btn-block" ref="loginbutton" type="submit">Login</button>
          </div>
        </form>
            </div>
        </section>
    </body>
    </template> -->

    <template>
      <v-app id="inspire">
        <v-container class="d-flex">
          <v-form class="mx-auto py-16"  >
          <v-row>

              <v-text-field
                v-model="user.username"
                label="Username"
                required
              ></v-text-field>
           </v-row>
           <v-row>
              <v-text-field
                v-model="user.password"
                label="Password"
                required
              ></v-text-field>
            </v-row>
    
      
        <v-row >
          <v-btn @click.prevent="handleSubmitForm"> Submit </v-btn>
        </v-row>
      </v-form>
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
            this.$router.push("/profile")
            eventBus.$emit("userLogin", true);
            })
            .catch((error) => {
            console.log("Login Fail.", error)
            });
        },
    },
    };

</script>
