<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Availability</th>
            <th>Condition</th>

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
                :href="{ name: 'edit-item', params: { id: item._id } }"
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Items: [],
    };
  },
  created() {
    let apiURL = "http://localhost:4000/api/item";
    axios
      .get(apiURL)
      .then((res) => {
        this.Items = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteItem(id) {
      let apiURL = `http://localhost:4000/api/item/delete/${id}`;
      let indexOfArrayItem = this.Items.findIndex((i) => i._id === id);

      if (window.confirm("Do you really want to delete?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Items.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>
