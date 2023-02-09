<template>
    <v-app id="inspire">
      <v-app-bar flat>
        <v-container class="fill-height d-flex align-center">
          <v-avatar
            class="me-10 ms-4"
            color="grey-darken-1"
            size="32"
          ></v-avatar>
  
          <v-btn
            v-for="link in links"
            :key="link"
            variant="text"
          >
            {{ link }}
          </v-btn>
  
          <v-spacer></v-spacer>
          <v-responsive max-width="260">
            <v-text-field
              density="compact"
              hide-details
              variant="solo"
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>
  
      <v-main class="bg-grey-lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list rounded="lg">
                  <v-list-item
                    v-for="n in 5"
                    :key="n"
                    link
                  >
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item>
  
                  <v-divider class="my-2"></v-divider>
  
                  <v-list-item
                    link
                    color="grey-lighten-4"
                  >
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Category</th>
                      <th class="text-left">Availability</th>
                      <th class="text-left">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in items" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.category }}</td>
                      <td>{{ item.availability }}</td>
                      <td>{{ item.condition }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
            </v-col>
          </v-row>

  
        </v-container>
      </v-main>
    </v-app>
  </template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      Items: [],
      links: [
          'Category',
          'Availabilility',
          'Popularity',
          'Condition',
        ],
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
