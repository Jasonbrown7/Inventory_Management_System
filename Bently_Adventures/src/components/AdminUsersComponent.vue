<template>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <h5>Users</h5>
        <table class="table table-striped styled-table">
          <thead class="thead-dark">
            <tr>
              <th style="border-top-left-radius: 10px;">Username</th>
              <th>Email</th>
              <th>Passwords</th>
              <th style="border-top-right-radius: 10px;">Actions</th>
  
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in Users" :key="user._id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.password }} </td>
              <td>
                <router-link
                  :to="{ name: 'edit-user', params: { id: user._id } }"
                  class="btn btn-success"
                  >Edit
                </router-link>
                <button
                  @click.prevent="deleteUser(user._id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-3 mx-auto">
        <h5>Create User</h5>
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
            <label>Email</label>
            <input
                type="email"
                class="form-control"
                v-model="user.email"
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
            <button class="btn btn-success btn-block" id="create-button">Create</button>
            </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        Users: [],
        user: {
        username: "",
        email: "",
        password: "",
      },
      };
    },
    mounted() {
      axios.defaults.withCredentials = true; 
      axios.get("http://localhost:4000/api/auth/user", {credentials: 'include'})    
          .then((response) => {    
              console.log(response)    
              this.$set(this, "user", response.data.user)    
          })    
          .catch((errors) => {    
              console.log(errors)    
              this.$router.push("/")  
          })
        },
    created() {
      let apiURL = "http://localhost:4000/api/user";
      axios.defaults.withCredentials = true;
      axios
        .get(apiURL)
        .then((res) => {
          this.Users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    methods: {
      deleteUser(id) {
        let apiURL = `http://localhost:4000/api/user/delete/${id}`;
        let indexOfArrayItem = this.Users.findIndex((i) => i._id === id);
  
        if (window.confirm("Do you really want to delete?")) {
          axios
            .delete(apiURL)
            .then(() => {
              this.Users.splice(indexOfArrayItem, 1);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      handleSubmitForm() {
        let apiURL = "http://localhost:4000/api/user/create";

        axios
            .post(apiURL, this.user)
            .then(() => {
            this.$router.push("users");
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

<style>
th, td {
    border: 1px solid #ffffff;
    padding: 0.5em;
}

.btn-success {
  margin-right: 10px;
}


.styled-table tbody tr.active-row {
    font-weight: bold;
}

.styled-table thead tr {
  background-color: #abd4ab;
}

#create-button {
  margin-top: 10px;
}
</style>