<template>
  <v-app id="inspire">
    <v-main class="v-main grey lighten-3">
      <v-container>
        <v-card
          elevation="0"
          class="mx-auto px-md-6 pb-md-6 pt-md-4"
          max-width="600"
        >
          <h3 class="text-center">Create Item</h3>
          <v-form 
            @submit.prevent="handleSubmitForm" 
          >
            <v-container class="justify-center">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    v-model="item.name"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Category"
                    v-model="item.category"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Availability"
                    v-model="item.availability"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Condition"
                    v-model="item.condition"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn block color="danger justify-center" type="submit">Create</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
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