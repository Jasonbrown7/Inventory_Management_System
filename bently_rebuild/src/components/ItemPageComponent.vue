<template>
  <v-app id="inspire">
    <v-container>
      <v-row mt="50">
        <v-col cols="7" class="mt-15">
          <v-img :src="item.image" height="300"/>
        </v-col>
        <v-col cols="5" class="mt-15">
          <v-card style="height: 100%;">
            <v-card-text>
              <v-form class="pt-10">
                <v-text-field label="Desired Check-In Date" type="date" v-model="checkIn" required />
                <v-text-field label="Desired Check-Out Date" type="date" v-model="checkOut" required />
              </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn @click="submit">Check Availability</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <v-card>
            <v-card-title class="headline">{{ item.name }}</v-card-title>
            <v-card-text>
              <p>{{ itemDescription }}</p>
            </v-card-text>
          </v-card>
          <v-card class="mt-3">
            <v-card-title class="headline">Properties</v-card-title>
            <v-card-text>
             <div v-if="item.availability === 'Available'">

             <p>Type: {{ item.category }}</p>
             <p>Availability: <span style="color: green;">{{ item.availability }}</span></p>
             <p>Condition: {{ item.condition }}</p>
          
             </div>
             <div v-else>

              <p>Type: {{ item.category }}</p>
              <p>Availability: <span style="color: red;">{{ item.availability }}</span></p>
              <p>Condition: {{ item.condition }}</p>

             </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-3">
            <v-card-title class="headline">Reviews</v-card-title>
            <v-card-text>
              {{ reviews }}
            </v-card-text>
          </v-card>
        </v-col>
        
        <!-- TEST REMOVE -->
      </v-row>
    </v-container>
  </v-app>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    
    data() {
      return {
        itemImage: "https://via.placeholder.com/300x200",
        itemDescription: "Sample Item Description",
        reviews: ["Great, love it.", "Okay, seen better", "Best item ive seen yet."],
        checkIn: "null",
        checkOut: "null",
        item: null 
    };
  },
  methods: {
    submit() {
      alert("Checking Availability...");
    }
  },

  created() {
     
    let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.item = res.data;
      });

    },
};
</script>
