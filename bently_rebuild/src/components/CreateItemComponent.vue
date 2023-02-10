<template>
  <v-app id="inspire">
    <v-container>
      <h3 class="text-center">Create Item</h3>
      <v-form @submit.prevent="handleSubmitForm">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Name"
              v-model="item.name"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Category"
              v-model="item.category"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Availability"
              v-model="item.availability"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Condition"
              v-model="item.condition"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn block color="danger" type="submit">Create</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-app>
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
          this.$router.push("/view/items");
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