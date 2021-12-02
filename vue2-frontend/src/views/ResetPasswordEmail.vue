<template>
  <div>
    <v-app id="inspire" class="container">
      <v-row>
        <v-col cols="3">
          <GoBack />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="12" sm="8">
          <div>
            <v-card class="d-flex justify-center mb-6" flat tile>
              <v-card class="ma-2">
                <v-form @submit.prevent="sendEmail">
                  <v-img max-height="300" max-width="200" src="../assets/kerdojel.png" aspect-ratio="1"></v-img>
                  <v-card-title class="pa-12"
                    >Elfelejtetted a jelszavad?</v-card-title
                  >
                  <v-divider> </v-divider>
                  <v-card-text>
                    Egyet se félj, csak add meg az email címedet, és kattints az
                    Küldés gombra! Az emailben majd kattints a linkre, de arra vigyázz, hogy az elküldéstől számított 1 órán belül
                    szükséges megadni az új jelszót.
                  </v-card-text>
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
                        <div v-if="errorMessage" class="px-12 pt-12 red--text">
                          {{ errorMessage }}
                        </div>
                        <div v-if="message" class="px-12 pt-12 green--text">
                          {{ message }}
                        </div>
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
                        Küldés
                      </Button>
                    </v-col>
                  </v-row>
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
import GoBack from "../components/GoBack.vue";
import authService from "../services/authService";
export default {
  name: "ResetPasswordEmail",
  components: {
    Button,
    GoBack,
  },
  data() {
    return {
      email: "",
      errorMessage: "",
      message: "",
    };
  },
  methods: {
    sendEmail() {
      authService
        .sendResetPasswordEmail(this.email)
        .then((response) => {
          console.log(response.data);
          this.errorMessage = "";
          this.message = response.data.messages;
          this.clear();
        })
        .catch((err) => {
            console.log(err.response.data.Error)
          if (err.response.data.Error) {
            this.errorMessage = err.response.data.Error;
            this.message=''
          }  else {
            this.errorMessage = "ismeretlen hiba történt";
            this.message = ''
          }
        });
    },
    clear() {
      this.email = "";
    },
  },
};
</script>

<style>
</style>