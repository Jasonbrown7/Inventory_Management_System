<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
        <v-container>
          <v-card
            elevation="0"
            class="mx-auto px-md-6 pb-md-6 pt-md-4"
            max-width="600"
          >
            <h3 class="text-center">Edit Item</h3>
            <v-form 
              @submit.prevent="handleUpdateForm" 
              class="text-center"
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
                    <v-select
                    label="Category"
                    v-model="item.category"
                    :items="['Water Sports', 'Winter Sports', 'Leisure', 'Camping', 'Climbing']"
                    required
                  />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                    label="Current Availability"
                    v-model="item.availability"
                    :items="['Available', 'Unavailable']"
                    required
                  />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                    label="Condition"
                    v-model="item.condition"
                    :items="['New', 'Like New', 'Used', 'Heavily Used', 'Damaged']"
                    required
                  />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-file-input v-model="selectedFiles" label="Select an Image"></v-file-input>
                    <img :src="item.image" v-if="item.image" style="width: 400px;"/>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="danger justify-center" type="submit" class="submit">Update Item</v-btn>
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
          image: "",
        },
        selectedFiles: [],
      };
    },
  //   beforeCreate(){
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
      let apiURL = `http://localhost:4000/api/item/edit/${this.$route.params.id}`;
  
      axios.get(apiURL).then((res) => {
        this.item = res.data;
      });
    },
    methods: {
      handleUpdateForm() {
        let apiURL = `http://localhost:4000/api/item/update/${this.$route.params.id}`;
  
        axios
          .put(apiURL, this.item)
          .then((res) => {
            console.log(res);
            this.$router.push("/view/items");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    watch: {
      selectedFiles() {
        console.log("selected files:", this.selectedFiles);
        console.log("selected files length:", this.selectedFiles.length);
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 600;
            const MAX_HEIGHT = 600;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                console.log("Compressed image size:", blob.size);
                if (blob.size > 16000000) {
                  console.log("Image size still too large");
                } else {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    this.item.image = event.target.result;
                    console.log("this item image:", this.item.image);
                  };
                  reader.readAsDataURL(blob);
                }
              },
              "image/jpeg",
              0.8
            );
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(this.selectedFiles);
      },
    }
  };
  </script>