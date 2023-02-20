<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/extended-toolbar.vue-->
<!-- eslint-disable -->
<template>
  <v-app id="inspire">  
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols ="3">
            <v-select label="Condition" :items="dropdownConditions" v-model="selectedCondition"></v-select>
          </v-col>
          <v-switch class="pt-5"
            v-model="switch1"
            :label="`Available: ${switch1.toString()}`"
          ></v-switch>
        </v-row>
        <div v-if="availability === 'Available'">
            <v-row>
              <v-col
                v-for="(item, index) in Items"
                  v-if="item.availability === 'Available' && item.condition === selectedCondition"
                  :key="index"
                  cols="3"
                >
                  <v-card height="200">
                    <div>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-text>
                      <p>Category: {{ item.category }}</p>
                      <p>Availability: {{ item.availability }}</p>
                      <p>Condition: {{ item.condition }}</p>
                      <v-btn
                      class="mr-md-1"
                      :to="{ name: 'browse-itempage', params: { id: item._id } }"
                      color="primary"
                      small
                      >
                      View Item
                      </v-btn>
                    </v-card-text>
                    </div>
                    
                  </v-card>
              </v-col>
            </v-row>
        </div>

        <div v-else>
            <v-row>
              <v-col
                v-for="(item, index) in Items"
                  v-if="item.availability === 'Not Available' && item.condition === selectedCondition"
                  :key="index"
                  cols="3"
                >
                  <v-card height="200">
                    <div>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-text>
                      <p>Category: {{ item.category }}</p>
                      <p>Availability: {{ item.availability }}</p>
                      <p>Condition: {{ item.condition }}</p>
                      <v-btn
                      class="mr-md-1"
                      :to="{ name: 'browse-itempage', params: { id: item._id } }"
                      color="primary"
                      small
                      >
                      View Item
                      </v-btn>
                    </v-card-text>
                    </div>
                  </v-card>
              </v-col>
            </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import axios from "axios";

  export default {
    data: () => ({
      selectedCategory: null,
      dropdownConditions: [
        {text: 'New', value: 'New'}, 
        {text: 'Used', value: 'Used'}, 
        {text: 'Broken', value: 'Broken'}, 
      ],
      selectedCondition: null,
      switch1: true,
      availability: 'Available',
      Items: [],
    }),

    watch: {
      switch1(newVal) {
        this.availability = newVal ? 'Available' : 'Unavailable';
      },
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
  }
</script>
