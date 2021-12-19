<template>
  <div id="app">
    <v-app id="inspire" class="container">
      <v-row>
        <v-col cols="3">
          <GoBack />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4"> </v-col>
        <v-col cols="12" sm="8" md="6">
          <div>
            <v-card
              class="d-flex justify-center mb-6"
              flat
              tile
              max-width="500"
            >
              <v-card class="ma-2">
                <v-form @submit.prevent="handleRegisterForm" ref="form">
                  <v-img height="250" src="../assets/pen.jpg"></v-img>
                  <v-card-title class="pa-8">Regisztrációs Form</v-card-title>
                  <v-divider> </v-divider>
                  <div>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="userName"
                          label="Felhasználónév"
                          required
                          class="px-12 pt-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          required
                          class="px-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          label="Jelszó"
                          :type="show1 ? 'text' : 'password'"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show1 = !show1"
                          required
                          class="px-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="password2"
                          label="Jelszó újra"
                          :type="show2 ? 'text' : 'password'"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="show2 = !show2"
                          required
                          class="px-12"
                        ></v-text-field>
                        <v-file-input
                          accept="image/*"
                          label="File input"
                          @change="onFileUpload"
                          class="px-12"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </div>
                  <v-row>
                    <v-col>
                      <Button
                        class="ma-12"
                        propColor="primary"
                        :propRounded="true"
                        :propDark="true"
                        type="submit"
                      >
                        Regisztrálok!
                      </Button>
                    </v-col>
                  </v-row>
                  <v-row v-if="errorMessage" class="px-12 pt-12 red--text">
                    <v-col>
                      {{ errorMessage }}
                    </v-col>
                  </v-row>
                  <v-row v-if="message" class="px-12 pt-12 green--text">
                    <v-col>
                      {{ message }}
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
import GoBack from "../components/GoBack.vue";
import Button from "../components/Button.vue";
import authService from "../services/authService";
export default {
  name: "RegisterForm",
  components: {
    GoBack,
    Button,
  },
  data: () => ({
    show1: false,
    show2: false,
    userName: "",
    email: "",
    password: "",
    password2: "",
    message: "",
    errorMessage: "",
    FILE: null,
    rules: {
        required: value => !!value || "Required.",
        email: value => {
          // eslint-disable-next-line
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,20}$/g
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        }
      }
  }),

  computed: {},
  methods: {
    onFileUpload(event) {
       console.log(event)
      this.FILE = event;
     
    },
    handleRegisterForm() {
      const user = new FormData();
      user.append('userName', this.userName)
      user.append('email', this.email)
      user.append('password', this.password)
      user.append('role', 'user')
      user.append('userImage', this.FILE)


      authService
        .RegisterForm(user)
        .then((response) => {
          this.errorMessage = "";
          this.message = response.data.message;
          this.clear();
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.data.message) {
            this.errorMessage = err.response.data.message;
          } else if (err.response.data.Error.message) {
            this.errorMessage = err.response.data.Error.message;
          } else {
            this.errorMessage = "ismeretlen hiba történt";
          }
        });
    },
    clear() {
      this.userName = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.FILE = null;
    },
  },
};
</script>

<style>
</style>