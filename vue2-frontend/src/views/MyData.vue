<template>
  <div>
    <v-row>
      <v-col cols="8"></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="500" v-if="user">
          <v-img :src="user.imagePath" height="300px"></v-img>

          <v-card-title> Felhasználónevem: {{ user.userName }} </v-card-title>
          <v-card-title> Email címem: {{ user.email }} </v-card-title>
          <v-card-title> Felhasználói jogköröm: {{ user.role }} </v-card-title>
          <v-spacer></v-spacer>
          <v-card-subtitle>
            A jelszó biztonsági okokból nem látható
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="show = !show">
              Módosítom az adatokat
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <br />
              <v-card-subtitle>
                Elég csak azt a mezőt kitölteni, amit módosítani szeretnél!
              </v-card-subtitle>

              <v-form
                @submit.prevent="changData"
                ref="changeDataForm"
                v-model="formValidity"
              >
                <div>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="userName"
                        label="Felhasználónév"
                        class="px-12 pt-12"
                        :rules="nameRules"
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        label="Email"
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
                        class="px-12"
                      ></v-text-field>
                      <v-text-field
                        v-model="password2"
                        label="Jelszó újra"
                        :type="show2 ? 'text' : 'password'"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show2 = !show2"
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
                      :propDark="formValidation"
                      type="submit"
                      :propDisabled="!formValidation"
                    >
                      Elküldöm a módosítást!
                    </ButtonComp>
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
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userService from "../services/userService";
import ButtonComp from "../components/ButtonComp.vue";
export default {
  name: "MyData",
  components: {
    ButtonComp,
  },
  data() {
    return {
      formValidity: false,
      user: null,
      show: false,
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
        (value) => {
          if (!value) {
            return true;
          } else {
            return (
              // eslint-disable-next-line
              /^[a-zA-ZíÍéÉáÁöÖőŐűŰúÚóÓüÜ0-9-. ]{3,20}$/g.test(value) ||
              " a felhasználó név csak normál karakterekből és számokból állhat (a pont és a szóköz engedélyezett), 3-tól 20 karakterig"
            );
          }
        },
      ],
      emailRules: [
        (value) => {
          if (!value) {
            return true;
          } else {
            return (
              // eslint-disable-next-line
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Helytelen email"
            );
          }
        },
      ],
      passwordRules: [
        (value) => {
          if (!value) {
            return true;
          } else {
            return (
              // eslint-disable-next-line
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,20}$/g.test(
                value
              ) || "A jelszó, nem felel meg a mintának"
            );
          }
        },
      ],
    };
  },

  methods: {
    getMyData() {
      const userId = this.$route.params.id;
      userService
        .getUserById(userId)
        .then((response) => {
          this.user = response.data;
          this.user.imagePath = "http://localhost:8081/" + this.user.userImage;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async changData() {
      const id = this.$route.params.id;
      const user = new FormData();
      if (this.userName !== "") {
        user.append("userName", this.userName);
        console.log("hozzáadtam a felhasználónevet a változott mezőkhöz");
      }
      if (this.email !== "") {
        user.append("email", this.email);
        console.log("hozzáadtam az email címet a változott mezőkhöz");
      }
      if (this.password !== "") {
        user.append("password", this.password);
        console.log("hozzáadtam a jelszót a változott mezőkhöz");
      }
      if (this.FILE) {
        user.append("userImage", this.FILE);
        console.log("hozzáadtam a képet a változott mezőkhöz");
      }

      //this.resetForm()
      try {
        await userService.changeMyDataById(id, user).then(() => {
          this.getMyData();
          this.resetForm();
          this.$store.dispatch("auth/changeUser", id);
          this.$store.dispatch("snackBar/showSnackbar", {text: "A felhasználói adatok sikeresen megváltoztak!"});
        });
      } catch (error) {
        console.log(error);
      }
    },
    onFileUpload(event) {
      this.FILE = event;
    },
    resetForm() {
      this.$refs.changeDataForm.reset();
    },
  },
  created() {
    this.getMyData();
  },

  computed: {
    formValidation() {
      let fieldCounter = 0;
      let userNameCount = 0;
      let emailCount = 0;
      let passwordCount = 0;
      let password2Count = 0;
      let FILECount = 0;
      this.userName !== "" ? (userNameCount = 1) : (userNameCount = 0);
      this.email !== "" ? (emailCount = 1) : (emailCount = 0);
      this.password !== "" ? (passwordCount = 1) : (passwordCount = 0);
      this.password2 !== "" ? (password2Count = 1) : (password2Count = 0);
      this.FILE !== null ? (FILECount = 1) : (FILECount = 0);

      fieldCounter =
        userNameCount + emailCount + passwordCount + password2Count + FILECount

      if (fieldCounter > 0 && this.formValidity === true) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>