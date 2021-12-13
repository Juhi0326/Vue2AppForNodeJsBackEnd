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
                <v-form @submit.prevent="addProduct">
                  <v-img height="250" src="../../assets/trefi.jpg"></v-img>
                  <v-card-title class="pa-8"
                    >Új termék hozzáadása Form</v-card-title
                  >
                  <v-divider> </v-divider>
                  <div>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="productName"
                          label="Termék név"
                          required
                          class="px-12 pt-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="price"
                          label="price"
                          required
                          class="px-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="discountPercentage"
                          label="discountPercentage"
                          required
                          class="px-12"
                        ></v-text-field>
                        <v-textarea
                          solo
                          name="input-7-4"
                          label="description"
                          v-model="description"
                          class="px-12"
                        ></v-textarea>
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
                        Hozzáadom a terméket!
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
import GoBack from "../../components/GoBack.vue";
import Button from "../../components/Button.vue";
import productService from "../../services/productSevice";
export default {
  name: "AddNewProduct",
  components: {
    GoBack,
    Button,
  },
  data: () => ({
    productName: "",
    price: "",
    discountPercentage: "",
    description: "",
    message: "",
    errorMessage: "",
    FILE: null,
  }),

  computed: {},
  methods: {
    onFileUpload(event) {
      console.log(event);
      this.FILE = event;
    },
    addProduct() {
      this.price !== ""
        ? (this.price = parseInt(this.price))
        : (this.price = 0);
      this.discountPercentage !== ""
        ? (this.discountPercentage = parseInt(this.discountPercentage))
        : (this.discountPercentage = 0);
      const product = new FormData();
      product.append("name", this.productName);
      product.append("price", this.price);
      product.append("discountPercentage", this.discountPercentage);
      product.append("description", this.description);
      product.append("productImage", this.FILE);

      productService
        .addNewProduct(product)
        .then((response) => {
          this.errorMessage = "";
          if (response.data.error) {
              throw new Error(response.data.error.message)
          } else {
              this.clear();
              this.message = response.data.message;
          }
          //console.log('vagy innen jön?' + response.data.error.message);
        })
        .catch((err) => {
            this.errorMessage = err
            console.log(err)

        });
    },
    clear() {
      this.productName = "";
      this.price = null;
      this.discountPercentage = "";
      this.description = "";
      this.FILE = null;
    },
  },
};
</script>

<style>
</style>