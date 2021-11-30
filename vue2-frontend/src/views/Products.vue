<template>
  <div>
    <div v-for="(product, index) in filteredProducts" :key="index">
      <v-app id="inspire">
        <v-card class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
              :src="product.imagePath"
              :alt="product.name"
              @click="goToProductDetails(product._id)"
            
          ></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text ms-4">ár: {{product.price}}</div>
            </v-row>

            <div class="my-4 text-subtitle-1">Leírás</div>

            <div>
              {{product.description}}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Kattints a részletekért!</v-card-title>

          <v-card-text> </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="goToProductDetails()"
            >
              Részletek
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/productSevice";
export default {
  name: "Products",
  data() {
    return {
      content: [],
      searchField: "",
      id: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.content.filter((product) => {
        if (
          product.name &&
          product.name.toLowerCase().includes(this.searchField.toLowerCase())
        ) {
          return product;
        } else if (
          product.price &&
          product.price.toString().includes(this.searchField.toLowerCase())
        ) {
          return product;
        }
      });
    },
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    formatMoney(amount) {
      const value = Number(amount).toLocaleString("hu-HU", {
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
      return `${value} Ft`;
    },

    goToProductDetails(id) {
      console.log(id);
      this.$router.push("/Product-details/" + id);
    },

    async getProducts() {
      await ProductService.getProducts().then((response) => {
        this.content = response.data.products;
      });
      this.content.map((product) => {
        product.imagePath = "http://localhost:8081/" + product.imagePath;
      });

      if (this.content) {
        this.content.map((product) => {
          if (typeof product.price === "number") {
            product.price = this.formatMoney(product.price);
          }
        });
      }
    },
  },
};
</script>

<style>
</style>