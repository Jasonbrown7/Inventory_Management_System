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
            
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-img :src="item.image" class="ml-5 mr-5 mb-5 rounded-lg" style="max-width: 600px; max-height: 400px;"></v-img>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card class="elevation-3">
                    <v-container>
                        <v-card-title style="font-size: 36px;">{{ item.name }}</v-card-title>
                        <v-card-subtitle class="text-md-left">This item is one of Bently Adventure's most popular! Be sure to reserve it before its gone!</v-card-subtitle>
                        <v-card-text class="text-sm-left">Condition: {{ item.condition }}</v-card-text>
                        <v-card-text class="text-sm-left">Availability: {{ item.availability }}</v-card-text>
                        <v-card-text class="text-sm-left">Reviews: [Fantastic, Worked well No Complaints, A little too large for me but good!]</v-card-text>
                    </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-toolbar color="grey lighten-3" elevation="0">
                <v-toolbar-title style="font-size: 30px;" class="text-left">Availability</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="edit" :to="{ name: 'create-reservation' }" class="mr-3">Create Reservation</v-btn>
            </v-toolbar>
            <v-col cols="12" md="12">
                <v-calendar></v-calendar>
            </v-col>
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