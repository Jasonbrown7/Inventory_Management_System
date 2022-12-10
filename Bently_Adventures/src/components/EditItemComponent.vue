<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Update Item</h3>
      <form @submit.prevent="handleUpdateForm">
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
          <button class="btn btn-danger btn-block">Update</button>
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
      item: {},
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.item = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/api/item/update/${this.$route.params.id}`;

      axios
        .put(apiURL, this.item)
        .then((res) => {
          console.log(res);
          this.$router.push("/view/items");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>