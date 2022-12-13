<template>
  <div class="row">
    <div class="col-md-8 mx-auto">
      <h5>Inventory</h5>
      <table class="table table-striped styled-table">
        <thead class="thead-dark">
          <tr>
            <th style="border-top-left-radius: 10px;">Name</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Condition</th>
            <th style="border-top-right-radius: 10px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Items" :key="item._id">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.availability }} </td>
            <td>{{ item.condition }} </td>
            <td>
              <router-link
                :to="{ name: 'edit-item', params: { id: item._id } }"
                class="btn btn-success"
                >Edit
              </router-link>
              <button
                @click.prevent="deleteItem(item._id)"
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
      <h5>Create Item</h5>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="item.name"
            required
          />
        </div>

        <div class="form-group">
          <label>Category</label>
          <input
            type="text"
            class="form-control"
            v-model="item.category"
            required
          />
        </div>
        
        <div class="form-group">
          <label>Availability</label>
          <input
            type="text"
            class="form-control"
            v-model="item.availability"
            required
          />
        </div>

        <div class="form-group">
          <label>Condition</label>
          <input
            type="text"
            class="form-control"
            v-model="item.condition"
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
      Items: [],
      item: {
        name: "",
        category: "",
        availability: "",
        condition: "",
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
    let itemApiUrl = "http://localhost:4000/api/item";
    axios
      .get(itemApiUrl)
      .then((res) => {
        this.Items = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteItem(id) {
      let itemApiUrl = `http://localhost:4000/api/item/delete/${id}`;
      let indexOfItemArrayItem = this.Items.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(itemApiUrl)
          .then(() => {
            this.Items.splice(indexOfItemArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/item/create";

      axios
        .post(apiURL, this.item)
        .then(() => {
          this.$router.push("items");
          this.item = {
            name: "",
            category: "",
            availability: "",
            condition: "",
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

table {
    margin: 0 auto;
    border-collapse: collapse;
    border-radius: 5px;
    background-color: #ffffff;
}

.btn-success {
  margin-right: 10px;
}

.styled-table thead tr {
    background-color: #abd4ab;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
}

#create-button {
  margin-top: 10px;
}
</style>
