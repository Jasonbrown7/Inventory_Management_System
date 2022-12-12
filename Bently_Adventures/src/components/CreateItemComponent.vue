<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create Item</h3>
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
          <button class="btn btn-danger btn-block">Create</button>
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
      item: {
        name: "",
        category: "",
        availability: "",
        condition: "",
      },
    };
  },
  methods: {
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
div {
  margin: 20px;
}
</style>