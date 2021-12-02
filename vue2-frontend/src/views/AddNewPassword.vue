<template>
  <div>
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
                <v-form @submit.prevent="handleNewPassword">
                  <v-img height="250" src="../assets/pen.jpg"></v-img>
                  <v-card-title class="pa-8">Új jelszó igénylés</v-card-title>
                  <v-divider> </v-divider>
                  <div>
                    <v-row>
                      <v-col>
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
                        Új jelszó megadása
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
import Button from "../components/Button.vue";
import authService from "../services/authService";

export default {
  name: "AddNewPassword",
  components: {
    Button,
  },
  data: () => ({
    show1: false,
    show2: false,
    password: "",
    password2: "",
    message: "",
    errorMessage: "",
  }),
  methods: {
    handleNewPassword() {
        console.log(this.$route.params)
        const id = this.$route.params.id
        const token = this.$route.params.token
        authService.receiveNewPassword(id, token, {password: this.password}).then((response) => {
            this.errorMessage= ''
            this.message = response.data
        }).catch((err) => {
            console.log(err.response.data)
            this.message = ''
            this.errorMessage = err.response.data.message
        })
    },
    clear() {
      this.userName = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
    },
  },
};
</script>

<style>
</style>