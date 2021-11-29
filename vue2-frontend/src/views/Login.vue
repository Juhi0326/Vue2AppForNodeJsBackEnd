<template>
<div id="app">
  <v-app id="inspire">
    <div>
      <v-card
        class="d-flex justify-center mb-6"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
        flat
        tile
        min-width="450"
      >
          <v-card min-width="400" class="ma-6">
          <v-form @submit.prevent="handleLogin">
            <v-img height="300" src=""></v-img>
            <v-card-title class="pa-12">Login Form</v-card-title>
            <v-divider> </v-divider>
            <div>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    required
                    class="px-12 pt-12"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                     @click:append="show1 = !show1"
                    required
                    class="px-12"
                  ></v-text-field>
                  <div v-if="errorMessage"
                  class="px-12 pt-12 red--text"
                  >
                    {{errorMessage}}
                  </div>
                </v-col>
              </v-row>
            </div>
            <v-btn type="submit" class="ma-12">Submit</v-btn>
            <v-btn @click="cancel()" class="ma-12">Cancel</v-btn>
          </v-form>
        </v-card>
      </v-card>
  
     
    </div>
  </v-app>
</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.response.data.messages;
        }
      );
    },

    cancel() {
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>


<style>
</style>