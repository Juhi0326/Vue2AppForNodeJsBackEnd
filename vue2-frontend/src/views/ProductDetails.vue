<template>
  <div class="container">
    <ConfirmDlg ref="confirm" />
    <v-row>
      <v-col>
        <v-app id="inspire">
          <v-card class="mx-auto my-12" max-width="600" min-width="400">
            <v-img height="550" :src="Product.imagePath"></v-img>

            <v-card-title>{{ Product.name }}</v-card-title>

            <v-card-text>
              <div>
                {{ Product.description }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>ár: {{ Product.price }}</v-card-title>
            <v-card-title v-if="Product.price !== Product.discountedPrice">
              kedvezményes ár: {{ Product.discountedPrice }}</v-card-title
            >
            <v-card-text v-if="Product.price !== Product.discountedPrice">
              A kedvezmény mértéke: {{ Product.discountPercentage }}%
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <ButtonComp
                    v-if="role === 'user' || role === 'admin'"
                    @click="
                      addRecord(
                        (title = 'Termék hozzáadása'),
                        (confirmText =
                          'Biztosan hozzá szeretnéd adni a terméket a kosárhoz?')
                      )
                    "
                    class="ma-2"
                    propColor="red"
                    :propRounded="true"
                    :propDark="true"
                  >
                    Beteszem a kosárba
                  </ButtonComp>
                </v-col>
                <v-col>
                  <v-text-field
                    v-if="role === 'user' || role === 'admin'"
                    v-model="quantity"
                    solo
                    disabled
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    v-if="role === 'user' || role === 'admin'"
                    color="green darken-2"
                    @click="increase"
                    dark
                    ><h2>+</h2></v-btn
                  >
                  <v-btn
                    v-if="role === 'user' || role === 'admin'"
                    color="deep-orange darken-1"
                    dark
                    @click="decrease"
                    class="ml-2"
                    ><h2>-</h2></v-btn
                  ></v-col
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-app>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productService from "../services/productSevice";
import ButtonComp from "../components/ButtonComp.vue";
import ConfirmDlg from "../components/ConfirmDlg.vue";
export default {
  name: "ProductDetails",
  components: {
    ButtonComp,
    ConfirmDlg,
  },
  data() {
    return {
      content: {},
      productId: null,
      images: [],
      role: "guest",
      quantity: 1,
    };
  },

  computed: {
    computedProductId() {
      return this.$route.params.id;
    },
    Product() {
      return this.content;
    },
    computedImages() {
      return this.images;
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProduct(this.productId);
    this.getRole();
  },

  methods: {
    async addRecord(title, confirmText) {
      if (await this.$refs.confirm.open(title, confirmText)) {
        this.AddToCart();
      }
    },
    AddToCart() {
      let product = {};
      Object.assign(product, this.content, { quantity: this.quantity });
      this.$store.dispatch("cart2/addProduct2", product);
      this.$router.push("/users/shopping-cart");
      this.quantity = 1;
      this.openSnackbar();
    },
    async getProduct(productId) {
      await productService.getProductById(productId).then((response) => {
        this.content = response.data.product;
        console.log(this.content);
        let img = this.content.imagePath.split("\\").join("/");
        console.log(img);
        console.log(this.content.imagePath);
        this.content.price = this.formatMoney(this.content.price);
        this.content.discountedPrice = this.formatMoney(
          this.content.discountedPrice
        );
        this.content.imagePath = "http://localhost:8081/" + img;
      });
    },
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },
    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    getRole() {
      if (this.$store.state.auth.user) {
        this.role = this.$store.state.auth.user.role;
      }
    },
    openSnackbar() {
      this.$store.dispatch("snackBar/showSnackbar", {
        text: "A terméket sikeresen hozzáadtuk a kosárhoz!",
      });
    },
  },
};
</script>

<style>

</style>