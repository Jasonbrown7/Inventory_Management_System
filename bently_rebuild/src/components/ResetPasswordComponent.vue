<template>
    <v-app id="inspire">
      <v-main class="v-main grey lighten-3">
        <v-container class="heroimage" fluid fill-height>
          <v-card elevation="10" class="mx-auto px-md-6 pb-md-6 pt-md-4" min-width="500">
            <v-form class="ma-2" @submit.prevent="handleSubmitForm">
              <v-container class="justify-center">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Old Password"
                      :rules="[v => !!v || 'Old Password is required']"
                      v-model="passwords.oldPassword"
                      :append-icon="showPassword.old ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword.old ? 'text' : 'password'"
                      @click:append="showPassword.old = !showPassword.old"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="New Password"
                      :rules="[v => !!v || 'New Password is required']"
                      v-model="passwords.newPassword"
                      :append-icon="showPassword.new ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword.new ? 'text' : 'password'"
                      @click:append="showPassword.new = !showPassword.new"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Confirm New Password"
                      :rules="[v => !!v || 'Confirm New Password is required', v => passwords.newPassword === v || 'Passwords do not match']"
                      v-model="passwords.confirmNewPassword"
                      :append-icon="showPassword.confirmNew ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword.confirmNew ? 'text' : 'password'"
                      @click:append="showPassword.confirmNew = !showPassword.confirmNew"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn block color="primary" type="submit">Reset Password</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-btn block color="edit" to="/profile">Back</v-btn>
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
import axios from 'axios';
  
  export default {
    data() {
      return {
        showPassword: {
          old: false,
          new: false,
          confirmNew: false,
        },
        passwords: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        },
      };
    },
    created() {
      let apiURL = `http://localhost:4000/api/user/edit/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
        this.user = res.data;
      });
    },
    methods: {
      handleUpdateForm() {
        let apiURL = `http://localhost:4000/api/user/update/${this.$route.params.id}`;
        axios
          .put(apiURL, this.user)
          .then((res) => {
            console.log(res);
            console.log(this.$route.params.id)
            
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>