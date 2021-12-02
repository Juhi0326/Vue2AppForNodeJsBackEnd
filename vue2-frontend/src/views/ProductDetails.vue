<template>
  <div class="container">
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
              <Button
                v-if="role === 'user' || role === 'admin'"
                @click="AddToCart"
                class="ma-2"
                propColor="red"
                :propRounded="true"
                :propDark="true"
              >
                Beteszem a kosárba
              </Button>
            </v-card-actions>
          </v-card>
        </v-app>
      </v-col>
      <v-col cols="1">
        <GoBack />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productService from "../services/productSevice";
import Button from "../components/Button.vue";
import GoBack from "../components/GoBack.vue";
export default {
  name: "ProductDetails",
  components: {
    Button,
    GoBack,
  },
  data() {
    return {
      content: [],
      productId: null,
      images: [],
      role: "guest",
      //modalOpen: true,
    };
  },
  /*   computed: {
    productId() {
      return this.$route.params.id;
    },
  }, */
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
    AddToCart() {
      console.log("hozzáadtam");
    },
    async getProduct(productId) {
      await productService.getProductById(productId).then((response) => {
        this.content = response.data.product;
        this.content.price = this.formatMoney(this.content.price);
        this.content.discountedPrice = this.formatMoney(
          this.content.discountedPrice
        );
        this.content.imagePath =
          "http://localhost:8081/" + this.content.imagePath;
      });
    },
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },
    getRole() {
      this.role = this.$store.state.auth.user.role;
    },
  },
};
</script>

<style>
</style>