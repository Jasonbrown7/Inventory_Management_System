<template>
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
          <button class="btn btn-danger btn-block" ref="loginbutton">Login</button>
        </div>
      </form>
          </div>
      </section>
  </body>
  </template>

<!-- <template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Login</h3>
      <form @submit.prevent="handleSubmitForm">
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
          <button class="btn btn-danger btn-block" ref="loginbutton">Login</button>
        </div>
      </form>
    </div>
  </div>

  
</template> -->

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
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/auth/login/password";

      
      axios
        .post(apiURL, {username: this.user.username, password: this.user.password})
        .then(() => {
          console.log(this.user.username)
        })
        .catch((error) => {
          console.log("bruh",error);
        });
    },
  },
};


  
//   mounted() {
//     const logInButton = this.$refs.loginbutton;
// const loginForm = document.forms[0];
// console.log(logInButton);
// async function logIn(event) {
//   event.preventDefault();
//   const username = loginForm[0].value;
//   const password = loginForm[1].value;
//   const response = await fetch("/api/create-user", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (response.redirected) window.location.replace(response.url);
// }
// if(logInButton){
//   logInButton.addEventListener("click", logIn);
// }
//   }

//};



</script>