<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
            <v-container>
                <v-toolbar color="grey lighten-3" elevation="0">
                    <v-toolbar-title style="font-size: 30px;">Item Details</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="edit" :to="{ name: 'view-items' }" class="mr-3">Back</v-btn>
                    <v-btn color="primary" :to="{ name: 'edit-item' }">Edit Item</v-btn>
                </v-toolbar>  
                <v-card elevation="0" class="mt-3">
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-img :src="item.image" class="ma-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card elevation="0" class="mt-3">
                                <v-row>
                                    <v-col>
                                        <v-card-title class="ml-1 text-h6 text-md-h5 text-lg-h4 font-weight-bold">{{ item.name }}</v-card-title>
                                    </v-col>
                                </v-row>
                                <v-divider class="mb-4 ml-3 mr-3"></v-divider>
                                <v-row>
                                    <v-col cols="3">
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Description</v-sheet>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">This item is one of Bently Adventure's most popular! Be sure to reserve it before its gone!</v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Condition</v-sheet>
                                    </v-col>
                                    <v-col  cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                            {{ item.condition }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Availabilility</v-sheet>
                                    </v-col>
                                    <v-col  cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">
                                            {{ item.availability }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-sheet class="pa-1 ml-4 mr-2 mb-1 text-left font-weight-bold">Reviews</v-sheet>
                                    </v-col>
                                    <v-col  cols="9">
                                        <v-sheet class="pa-1 ml-2 mr-2 mb-1 text-left">[  Great  ,  Loved them!  ,  Not my size but worked well  ,  My go-to's  ]</v-sheet>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
            <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                                <div style="font-size: 30px;" class="text-left ml-5 mb-2 text-h6">Past Reservations</div>
                                <v-spacer></v-spacer>
                            <v-simple-table class="ml-5 mr-5">
                                <thead>
                                    <tr>
                                    <th class="text-left">Start</th>
                                    <th class="text-left">End</th>
                                    <th class="text-left">User</th>
                                    <th class="text-left">Resolved</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-left">01/24/23</td>
                                        <td class="text-left">01/27/23</td>
                                        <td class="text-left">Stephanie Gilmore</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">12/20/22</td>
                                        <td class="text-left">12/25/22</td>
                                        <td class="text-left">Kyle Style</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">11/28/22</td>
                                        <td class="text-left">11/29/22</td>
                                        <td class="text-left">Donald McDonald</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">11/21/22</td>
                                        <td class="text-left">11/23/22</td>
                                        <td class="text-left">Jin Yun</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">11/21/22</td>
                                        <td class="text-left">11/23/22</td>
                                        <td class="text-left">Carl Jr</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">10/14/22</td>
                                        <td class="text-left">10/18/22</td>
                                        <td class="text-left">Tyler Joyce</td>
                                        <td class="text-left">Yes</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div class="d-flex flex-row mb-1 bg-surface-variant">
                                <div class="text-left text-h6">Availability</div>
                                <v-spacer></v-spacer>
                                <v-btn @click="$refs.calendar.prev()" plain class="mr-2">Prev</v-btn>
                                <v-btn @click="$refs.calendar.next()" plain class="ml-1">Next</v-btn>
                            </div>
                                <!--Calendar Template from https://v15.vuetifyjs.com/en/components/calendars/ -->
                                <v-layout wrap>
                                    <v-flex xs12 class="mb-3">
                                    <v-sheet height="500">
                                        <v-calendar ref="calendar" color="edit" :events="events"></v-calendar>
                                    </v-sheet>
                                    </v-flex>
                                </v-layout>
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
        item: {
            name: "",
            category: "",
            availability: "",
            condition: "",
            image: "",
        },
        events: [
            {
                name: 'Reserved - Alex Smith',
                start: new Date(2023, 1, 9),
                end: new Date(2023, 1, 12),
                color: 'grey'
            },
            {
                name: 'Reserved - Jessica Keith',
                start: new Date(2023, 1, 17),
                end: new Date(2023, 1, 24),
                color: 'grey'
            }
        ]
      };
    },
    created() {
      let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;
      console.log("item.image", this.item.image)
      axios.get(apiURL).then((res) => {
        this.item = res.data;
      });
    },
  };
</script>

<style scoped>
.rounded-lg {
  border-radius: 70px;
}
</style>