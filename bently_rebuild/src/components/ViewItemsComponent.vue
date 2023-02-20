<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/constrained.vue-->
<!-- eslint-disable -->
<template>
    <v-app>
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar color="grey lighten-3" elevation="0">
              </v-toolbar>  
              <v-sheet rounded="lg">
                <v-subheader>Sort by</v-subheader>
                <v-list rounded="lg">
                  <v-select
                    label="Category"
                    :items="['Water Sports', 'Winter Sports', 'Summer Sports', 'Leisure']"
                    chips
                    multiple
                    solo
                    v-model="selectedCategories"
                    class="m-0"
                  ></v-select>
                  <v-select
                    label="Condition"
                    :items="['New', 'Like New', 'Used', 'Heavily Used', 'Damaged']"
                    chips
                    multiple
                    solo
                    v-model="selectedConditions"
                    class="m-0"
                  ></v-select>
                  <v-select
                    label="Availability"
                    :items="['Available', 'Unavailable']"
                    chips
                    multiple
                    solo
                    v-model="selectedAvailabilities"
                    class="m-0"
                  ></v-select>
  
                  <v-divider class="my-2"></v-divider>
                  <v-subheader>Reports</v-subheader>
                  <v-btn-toggle
                    v-model="text"
                    rounded="0"
                    color="deep-purple-accent-3"
                    group
                  >
                    <v-btn value="clicked">
                      Apply Filters
                    </v-btn>
                  </v-btn-toggle>
                    <v-btn color="primary" outlined @click="exportCsv" class="mt-1 mb-2">Export CSV</v-btn>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-toolbar color="grey lighten-3" elevation="0">
                <v-toolbar-title style="font-size: 30px;">Admin - Inventory</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="primary" :to="{ name: 'create-item' }">Create Item</v-btn>
              </v-toolbar>  

              <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Category</th>
                      <th class="text-left">Availability</th>
                      <th class="text-left">Condition</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredItems" 
                      :key="item._id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.category }}</td>
                      <td>{{ item.availability }}</td>
                      <td>{{ item.condition }}</td>
                      <td>
                        <v-btn
                          class="mr-md-1"
                          color="primary"
                          :to="{ name: 'admin-viewitem', params: { id: item._id } }"
                          small
                        >
                          View Item
                        </v-btn>
                        <v-btn
                          class="ml-md-1 mr-md-1"
                          :to="{ name: 'edit-item', params: { id: item._id } }"
                          color="primary"
                          outlined
                          small
                        >
                          Edit
                        </v-btn>
                        <v-btn
                          class="ml-md-1"
                          @click.prevent="deleteItem(item._id)"
                          color="primary"
                          outlined
                          small
                        >
                          Delete
                        </v-btn>
                      </td>
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
import Papa from 'papaparse';
import FileSaver from 'file-saver';

export default {
  data() {
    return {
      selectedCategories: [],
      selectedConditions: [],
      selectedAvailabilities: [],
      Items: [],
    };
  },
  // mounted() {
  //   axios.defaults.withCredentials = true; 
  //   axios.get("http://localhost:4000/api/auth/admin", {credentials: 'include'})    
  //       .then((response) => {    
  //           console.log(response)    
  //           //this.$set(this, "user", response.data.user)    
  //       })    
  //       .catch((errors) => {    
  //           console.log(errors, 'Cannot view all items unless logged in as admin.')  
  //           this.$router.push("/")  
  //       })
  //     },
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
  computed: {
    filteredItems() {
      if (this.selectedCategories.length === 0 && this.selectedConditions.length === 0 && this.selectedAvailabilities.length === 0) {
        return this.Items;
      }
      return this.Items.filter((item) =>
        (this.selectedCategories.length === 0 || this.selectedCategories.includes(item.category)) &&
        (this.selectedConditions.length === 0 || this.selectedConditions.includes(item.condition)) &&
        (this.selectedAvailabilities.length === 0 || this.selectedAvailabilities.includes(item.availability))
      );
    },
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
    exportCsv() {
      let items = this.Items;
      // Filter items if "Apply Filter" is clicked
      if (this.text === 'clicked') {
        items = this.filteredItems;
      }
      const csv = Papa.unparse(items);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, "inventory.csv");
    }
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}

.v-text-field__details {
  margin-top: 0 !important;
}
</style>
