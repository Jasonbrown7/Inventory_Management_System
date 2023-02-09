<template>
    <v-app id="inspire">
      <v-container>
        <h3 class="text-center">Create User</h3>
        <v-form @submit.prevent="handleSubmitForm">
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    label="Username"
                    v-model="user.username"
                    required
                />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    label="Email"
                    v-model="user.email"
                    required
                />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                <v-text-field
                    label="Password"
                    v-model="user.password"
                    required
                />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                <v-btn block color="danger">Create</v-btn>
                </v-col>
            </v-row>
        </v-form>
      </v-container>
    </v-app>
</template>


<script>
    import axios from "axios";

    export default {
        data() {
            return {
            user: {
                username: "",
                email: "",
                password: "",
            },
            };
        },
        methods: {
            handleSubmitForm() {
            let apiURL = "http://localhost:4000/api/user/create";

            axios
                .post(apiURL, this.user)
                .then(() => {
                this.$router.push("/view/users");
                this.user = {
                    username: "",
                    email: "",
                    password: "",
                };
                })
                .catch((error) => {
                console.log(error);
                });
            },
        },
    };
</script>
