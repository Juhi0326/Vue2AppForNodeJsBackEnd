<template>
  <v-app class="container">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Keress a termékek között!" outlined v-model="searchField" class="ml-12"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="3"
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <v-card class="card-class">
          <v-img
            aspect-ratio="1"
            :src="product.imagePath"
            :alt="product.name"
          ></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <div v-if="product.price===product.discountedPrice" class="grey--text ms-4">ár: {{ product.price }}</div>
              <div v-else>ár: <span id="discount">{{product.discountedPrice}}</span></div>
            </v-row>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>    
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="goToProductDetails(product._id)"
            >
              Részletek
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
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
    console.log(this.$route.name)
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
      this.$router.push("/product-details/" + id);
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
            product.discountedPrice = this.formatMoney(product.discountedPrice);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.card-class {
  margin: 50px;
}
#discount {
    color: crimson;
    font-weight: bold;
}
</style>>
