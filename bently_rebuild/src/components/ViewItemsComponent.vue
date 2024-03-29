<!--Vuetify Wireframe Template from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/constrained.vue-->
<!-- eslint-disable -->
<template>
    <v-app>
      <v-main 
        v-bind:style="{ 
          background: this.$vuetify.theme.dark == true 
          ? primary 
          : '#EEEEEE'
        }">
        <v-container>
          <v-row>
            <v-col cols="2">
              <v-toolbar elevation = "0" v-bind:style="{ background: this.$vuetify.theme.dark == true ? '#121212' : '#EEEEEE'}">
              </v-toolbar>  
              <v-sheet rounded="lg" class="sticky-top">
                <v-subheader class="justify-left">Search Items</v-subheader>
                <div style="display: flex; justify-content: center; flex: 1;">
                  <v-text-field v-model="search" append-icon="mdi-magnify" class="mx-3 my-0"></v-text-field>
                </div>
                <v-subheader>Filter by</v-subheader>
                <v-list rounded="lg">
                  <v-select
                    label="Category"
                    :items="['Bikes', 'Bouldering', 'Camping', 'Disc Golf', 'Games', 'Golf', 'Indoor Sports', 'Snow Sports', 'Water Sports', 'Sports Misc.']"
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
                    :items="['Available', 'Service']"
                    chips
                    multiple
                    solo
                    v-model="selectedAvailabilities"
                    class="m-0"
                  ></v-select>
  
                  <v-divider class="ml-3 mr-3"></v-divider>
                  <v-subheader class="justify-left">Reports</v-subheader>
                  <v-radio-group v-model="text" row>
                    <v-radio label="Apply Filters" value="clicked" class="mx-4"></v-radio>
                  </v-radio-group>
                  <div style="display: flex; justify-content: center; flex: 1;">
                    <v-btn color="primary" outlined @click="exportCsv" class="mt-1 mb-2">Export CSV</v-btn>
                  </div>
                  <v-divider class="ma-3"></v-divider>
                  <v-list-item
                    link
                    color="grey-lighten-4"
                    @click="reloadPage()"
                  >
                    <v-list-item-title>
                      Reset Filters
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>
  
            <v-col>
              <v-toolbar elevation ="0" v-bind:style="{ background: this.$vuetify.theme.dark == true ? '#121212' : '#EEEEEE'}">
                <v-toolbar-title style="font-size: 30px;">Admin - Inventory</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip color="white" left>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" outlined @click="handleCsvImport" class="mr-3" v-on="on">Import Items</v-btn>
                  </template>
                  <span>CSV only</span>
                </v-tooltip>
                <v-btn 
                  v-bind:style="{ background: this.$vuetify.theme.dark == true ? primary : '#26685d' ,
                  color: this.$vuetify.theme.dark == true ? primary : 'white'}" 
                  :to="{ name: 'create-item' }">
                  Create Item
                </v-btn>
              </v-toolbar>  
              <v-simple-table>
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Name</th>
                      <th class="text-left">Category</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Condition</th>
                      <th class="text-left">Checked Out</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in paginatedItems" 
                      :key="item._id">
                      <!--stack overflow helped with ID -->
                      <td class="text-left id-tooltip">
                        <v-tooltip open-on-hover bottom elevation="10" color="white" dark  class="tooltip-with-shadow" :open-delay="800" :close-delay="100">
                          <template #activator="{ on }">
                            <span v-on="on">{{ ".."+item._id.substring(item._id.length-3,item._id.length) }}</span>
                            <v-btn small icon @click="copyToClipboard(item._id)">
                              <v-icon x-small>mdi-content-copy</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ item._id }}</span>
                        </v-tooltip>
                      </td>
                      <td class="text-left">{{ item.name }}</td>
                      <td class="text-left">{{ item.category }}</td>
                      <td class="text-left">{{ item.availability }}</td>
                      <td class="text-left">{{ item.condition }}</td>
                      <td class="text-left">{{ item.isCheckedOut | toYesOrNo }}</td>
                      <td class="text-left">
                        <v-btn
                          class="mr-md-1"
                          :color="$vuetify.theme.dark ? undefined : 'primary'"
                          :text-color="$vuetify.theme.dark ? 'primary' : undefined"
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
                <v-pagination
                    v-model="pagination.page"
                    :length="Math.ceil(filteredItems.length / pagination.itemsPerPage)"
                    :items-per-page="pagination.itemsPerPage"
                    color = "#26685d"
                />
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
      itemsFromCsv: [],
      search: '',
      pagination: {
        page: 1,
        itemsPerPage: 15,
      },
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
  // mounted(){
  //   let apiURL = `http://localhost:4000/api/auth/admin`;
  //   axios
  //   .get(apiURL)
  //   .then((res) => {
  //     console.log(res.data)
     
  //   })
  //   .catch(() => {
  //       window.alert("ur not that guy pal!")
  //       this.$router.push("/");
  //     });
  // },
  created() {
    //Item
    let apiURL = "http://localhost:4000/api/item";
    axios
      .get(apiURL)
      .then((res) => {
        this.Items = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //Reservation
    axios
      .get("http://localhost:4000/api/reservation")
      .then((res) => {
        this.Reservations = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    filteredItems() {
      if (this.selectedCategories.length === 0 && this.selectedConditions.length === 0 && this.selectedAvailabilities.length === 0 && !this.search) {
        return this.Items
      }
      return this.Items.filter((item) =>
        (this.selectedCategories.length === 0 || this.selectedCategories.includes(item.category)) &&
        (this.selectedConditions.length === 0 || this.selectedConditions.includes(item.condition)) &&
        (this.selectedAvailabilities.length === 0 || this.selectedAvailabilities.includes(item.availability)) &&
        ((item.name.toLowerCase().includes(this.search.toLowerCase())) || (item._id.includes(this.search)))
      );
    },
    paginatedItems() {
      const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.filteredItems.slice(start, end);
    }
  },
  filters: {
    toYesOrNo(value){
      if (value){
        return "Yes";
      }
      else{
        return "No";
      }
    }
  },
  methods: {
    deleteItem(id) {
      let apiURL = `http://localhost:4000/api/item/delete/${id}`;
      let indexOfArrayItem = this.Items.findIndex((i) => i._id === id);

      let reserved = this.Reservations.some((reservation) => reservation.item === id);
      if (reserved) {
        alert("Cannot delete item because it is currently reserved.");
        return;
      }

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
      let items = this.Items.map(({_id, name, description, category, availability, condition}) => ({_id, name, description, category, availability, condition}));
      
      // Filter items if "Apply Filter" is clicked
      if (this.text === 'clicked') {
        items = this.filteredItems.map(({_id, name, description, category, availability, condition}) => ({_id, name, description, category, availability, condition}));
      }
      
      const csv = Papa.unparse(items);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      FileSaver.saveAs(blob, "inventory.csv");
    },
    // CSV import code from StackOverflow
    handleCsvImport() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv'; // accept only CSV files
      // attaches event listener to input 
      input.onchange = (e) => {
        Papa.parse(e.target.files[0], {
          complete: (results) => {
            // slice first row off (headers) and map columns to attributes
            this.itemsFromCsv = results.data.slice(1).map((row) => ({
              name: row[0],
              category: row[1],
              availability: row[2],
              condition: row[3],
            }));
            axios.post('http://localhost:4000/api/item/bulk', this.itemsFromCsv)
              .then((res) => {
                console.log(res);
                this.$router.push({ name: 'view-items' });
                this.reloadPage()
              })
              .catch((error) => {
                console.log(error);
              });
          },
        });
      };
      input.click();
    },
    reloadPage(){
      window.location.reload()
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
    },
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

.v-tooltip__content {
  background-color: transparent !important;
  color: black !important;
}

.sticky-top {
    position: sticky;
    top: 100px;
}

.tooltip-with-shadow .v-tooltip__content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

td.id-tooltip:hover {
  text-decoration: underline;
}
</style>
