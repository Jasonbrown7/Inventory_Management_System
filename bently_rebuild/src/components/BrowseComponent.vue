<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/extended-toolbar.vue-->
<template>
  <v-app id="inspire">  
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col sm="6">
            <v-select label="Category" :items="dropdownItems"></v-select>
          </v-col>
          <v-switch class="pt-5"
            v-model="switch1"
            :label="`Available: ${switch1.toString()}`"
          ></v-switch>
        </v-row>

        <v-row>
          <v-col
            v-for="(item, index) in Items"
            :key="index"
            cols="4"
          >
            <v-card height="200">
              <v-card-title>{{ item.name }}</v-card-title>
              <v-card-text>
                <p>Category: {{ item.category }}</p>
                <p>Availability: {{ item.availability }}</p>
                <p>Condition: {{ item.condition }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
      defaultDropdown: 'Any Category',
      dropdownItems: ['WinterSports', 'SummerSports', 'WaterSports'],
      switch1: true,
      Items: [],
    }),

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
  }
</script>
