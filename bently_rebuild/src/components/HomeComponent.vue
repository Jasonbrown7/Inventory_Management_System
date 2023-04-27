<template>
  <v-app>
    <v-main>
      <v-container :class="heroImageClass" fluid fill-height>
        <v-layout align-center justify-center>
          
          <v-flex>
            <h1 class="text-center white--text display-1">Bently Adventures</h1>
            <v-flex xs12 text-center class="mt-5">
              <v-btn 
                v-bind:style="{ 
                background: this.$vuetify.theme.dark == true ? primary : '#26685d' ,
                color: this.$vuetify.theme.dark == true ? primary : 'white'}"  
                large href="/create/users">
                Begin your adventure
              </v-btn>
            </v-flex>
            <v-flex>
              <v-layout justify-center class="pr-9">
                <v-switch 
                  prepend-icon="mdi-light mdi-weather-night"
                  append-icon="mdi-light mdi-weather-sunny"
                  color="white"
                  class="pl-10" 
                  v-model="darkMode"
                />
              </v-layout>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
     return {
      darkMode: true
     }
  },

  computed: {
    heroImageClass() {
      return this.$vuetify.theme.dark ? 'heroimagedark' : 'heroimage';
    }
  },
  watch: {
      darkMode()
      {
        this.toggleDarkMode();
      }
    },
  methods: {
    toggleDarkMode() {
        if (this.darkMode) {
          this.$vuetify.theme.dark = false;
        }
        else {
          this.$vuetify.theme.dark = true;
        }
      }
  }
}
</script>

<style scoped>
.heroimage {
  background-image: url("../assets/hero.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.heroimagedark {
  background-image: url("../assets/bentlydark.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}

.v-switch__icon--append .v-icon { 
  color: white !important;
}

.v-switch__icon--prepend .v-icon { 
  color: white !important;
}

.v-switch .v-icon.mdi.mdi-weather-night,
.v-switch .v-icon.mdi.mdi-weather-sunny {
  color: white !important;
}
</style>
