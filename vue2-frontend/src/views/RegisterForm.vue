<template>
  <div id="app">
    <v-app id="inspire" class="container">
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
                <v-form
                  @submit.prevent="handleRegisterForm"
                  ref="registerForm"
                  v-model="formValidity"
                >
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
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="email"
                          label="Email"
                          required
                          class="px-12"
                          :rules="emailRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="password"
                          label="Jelszó"
                          :rules="passwordRules"
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
                          :rules="[
                            password === password2 ||
                              'A két beírt jelszónak egyeznie kell!',
                          ]"
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
                      <ButtonComp
                        class="ma-12"
                        propColor="red"
                        :propRounded="true"
                        :propDark="formValidity"
                        type="submit"
                        :propDisabled="!formValidity"
                      >
                        Regisztrálok!
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
import authService from "../services/authService";
export default {
  name: "RegisterForm",
  components: {
    ButtonComp,
  },
  data: () => ({
    formValidity: false,
    show1: false,
    show2: false,
    userName: "",
    email: "",
    password: "",
    password2: "",
    message: "",
    errorMessage: "",
    FILE: null,
    nameRules: [
      (value) => !!value || "A felhasználónevet kötelező megadni!",
      // eslint-disable-next-line
      (value) =>
        /^[a-zA-ZíÍéÉáÁőŐűŰúÚóÓüÜ0-9-. ]{3,20}$/g.test(value) ||
        " a felhasználó név csak normál karakterekből és számokból állhat, 3-tól 20 karakterig",
    ],
    emailRules: [
      (value) => !!value || "Az email címet kötelező megadni!.",
      (value) =>
        // eslint-disable-next-line
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        "Helytelen email",
    ],
    passwordRules: [
      (value) => !!value || "A jelszót kötelező megadni!.",
      (value) =>
        // eslint-disable-next-line
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,20}$/g.test(
          value
        ) || "A jelszó, nem felel meg a mintának",
    ],
  }),
  computed: {},
  methods: {
    onFileUpload(event) {
      console.log(event);
      this.FILE = event;
    },
    handleRegisterForm() {
      const user = new FormData();
      user.append("userName", this.userName);
      user.append("email", this.email);
      user.append("password", this.password);
      user.append("role", "user");
      user.append("userImage", this.FILE);

      authService
        .RegisterForm(user)
        .then((response) => {
          this.errorMessage = "";
          this.message = response.data.message;
          this.resetForm();
          console.log(response.data);
          this.$store.dispatch("snackBar/showSnackbar", {text: "A regisztráció sikeresen megtörtént!"});
        })
        .catch((err) => {
          
          if (err.response.data.message) {
            this.errorMessage = err.response.data.message;
          } else if (err.response.data.Error.message) {
            this.errorMessage = err.response.data.Error.message;
          } else {
            this.errorMessage = "ismeretlen hiba történt";
          }
          this.$store.dispatch("snackBar/showSnackbar", {text: "Sikertelen regisztráció! Hibaüzenet: " + this.errorMessage});
        });
    },
    checkValidity() {
      console.log(this.formValidity);
    },
    resetForm() {
      console.log(this.$refs.registerForm);
      this.$refs.registerForm.reset();
    },
  },
};
</script>

<style>
</style>