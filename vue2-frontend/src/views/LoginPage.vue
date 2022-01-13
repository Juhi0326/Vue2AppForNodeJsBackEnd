<template>
  <div id="app">
    <v-app id="inspire" class="container">
      <v-row>
        <v-col cols="12" sm="8">
          <div>
            <v-card class="d-flex justify-center mb-6" flat tile>
              <v-card class="ma-2">
                <v-form @submit.prevent="handleLogin">
                  <v-img height="250" src="../assets/door.jpg"></v-img>
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
                        <div v-if="errorMessage" class="px-12 pt-12 red--text">
                          {{ errorMessage }}
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <v-row>
                    <v-col>
                      <ButtonComp
                        class="ma-12"
                        propColor="primary"
                        :propRounded="true"
                        :propDark="true"
                        type="submit"
                      >
                        Belépek
                      </ButtonComp>
                    </v-col>
                    <v-col>
                      <ButtonComp
                        class="ma-12"
                        propColor="primary"
                        :propRounded="true"
                        :propText="true"
                        @click="goToRegisterFormForm"
                      >
                        Regisztráció
                      </ButtonComp>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <ButtonComp
                      class="ma-12 mb-4"
                        :propRounded="true"
                        :propText="true"
                        @click="goToResetPasswordEmail"
                      >
                        Elfelejtett jelszó
                      </ButtonComp>
                    </v-col>
                  </v-row>
                  <!-- <v-btn type="submit" class="ma-12">Submit</v-btn> -->
                </v-form>
              </v-card>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";

export default {
  name: "LoginPage",
  components: {
    ButtonComp,

  },
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
    goToRegisterFormForm() {
      this.$router.push("/RegisterForm");
    },
    goToResetPasswordEmail() {
      this.$router.push("/resetPasswordEmail");
    },

    cancel() {
      this.$router.replace({ name: "HomePage" });
    },
  },
};
</script>


<style>
</style>