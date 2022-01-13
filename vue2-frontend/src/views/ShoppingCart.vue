<template>
  <div>
    <div v-if="SumOfQuantity != 0">
      <h1>A Kosár tartalma:</h1>
      <br />
      <v-divider></v-divider>
      <div v-for="(product, index) in cartItems2" :key="index" class="my-4">
        <h2>Termék neve: {{ product.name }}</h2>
        <h2>egységár: {{ product.discountedPrice }}</h2>
        <h2>mennyiség: {{ product.quantity }} db</h2>
        <h2>Termék ára összesen: {{ product.subTotal | currency }}</h2>
        <v-divider></v-divider>
      </div>
      <h1>
        A kosárban lévő termékek ára összesen: {{ sumOfCharge | currency }}
      </h1>
      <br />

      <ButtonComp @click="clearCartItems2"> Kosár ürítése </ButtonComp>
      <br />

    </div>

    <div v-else>
      <h1>A kosár üres.</h1>
    </div>
  </div>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";
export default {
  components: {
    ButtonComp,
  },
  data() {
    return {};
  },
  methods: {
    deleteCartItems() {
      console.log("megnyomtam");
      this.$store.dispatch("cart2/clearCart");
    },
    clearCartItems2() {
      console.log("megnyomtam");
      this.$store.dispatch("cart2/clearCart");
    },
    probaAddProduct() {
      let product = { name: "proba2", db: 30 };
      this.$store.dispatch("cart2/addProduct2", product);
    },
    probaDeleteProduct() {
      let product = { name: "proba2", db: 30 };
      this.$store.dispatch("cart2/deleteProduct", product);
    },
  },

  created() {},
  computed: {
    cartItems() {
      return this.$store.getters["cart/getCartItems"];
    },
    cartItems2() {
      return this.$store.getters["cart2/getCartItems2"];
    },
    sumOfCharge() {
      return this.$store.getters["cart2/sumOfCharge"];
    },
    SumOfQuantity() {
      return this.$store.getters["cart2/SumOfQuantity"];
    },
  },

  filters: {
    currency: function (value) {
      if (!value) return "";
      let data = Number(value).toLocaleString("hu-HU", {});
      return `${data} Ft`;
    },
  },
};
</script>

<style>
</style>