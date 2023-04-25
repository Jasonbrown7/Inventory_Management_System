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
              <div>
              <!-- <v-switch class="pl-10" v-model="darkMode">
                <v-btn :value="false">Light</v-btn>
                <v-btn :value="true">Dark</v-btn>
              </v-switch> -->
              </div>
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
      darkMode: null
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
          this.$vuetify.theme.dark = true;
        }
        else {
          this.$vuetify.theme.dark = false;
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
</style>
