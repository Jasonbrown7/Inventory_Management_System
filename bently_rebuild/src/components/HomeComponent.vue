<template>
  <v-app>
    <v-main>
      <v-container class="heroimage" fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex>
            <h1 class="text-center white--text display-1">Bently Adventures</h1>
            <v-flex xs12 text-center class="mt-5">
              <v-btn color="primary" large href="/create/users">Begin your adventure »</v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.heroimage {
  background-image: url("../assets/hero.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
