<template>
  <div>
    <div v-if="SumOfQuantity != 0">
      <h1>A Kosár tartalma:</h1>
      <br />
      <v-divider></v-divider>
      <div v-for="(product, index) in cartItems2" :key="index" class="my-4">
        <h2>Termék neve: {{ product.name }}</h2>
        <h2>egységár: {{ product.discountedPrice }}</h2>
        <br />
        <v-row>
          <v-col cols="5"> </v-col>
          <h2>mennyiség:</h2>
          <v-col cols="1">
            <v-text-field
              solo
              v-model="product.quantity"
              disabled
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <h2>db</h2>
          </v-col>
          <v-col cols="2">
            <v-btn @click="increase(product._id, product.quantity)">+</v-btn>
            <v-btn @click="decrease(product._id, product.quantity)" class="ml-2"
              >-</v-btn
            >
          </v-col>
        </v-row>
        <h2>Termék ára összesen: {{ product.subTotal | currency }}</h2>
        <ButtonComp
          class="ma-2 my-3"
          propColor="red"
          :propRounded="true"
          :propDark="true"
          @click="deleteProduct(product._id)"
          >Termék eltávolítása
        </ButtonComp>
        <v-divider></v-divider>
      </div>
      <h1>
        A kosárban lévő termékek ára összesen: {{ sumOfCharge | currency }}
      </h1>
      <h2>kiszállítási díj: {{ deliveryPrice }}</h2>
      <h1 class="mt-6"> <span id="finalyPrice">Fizetendő összesen: {{finallyPrice | currency}}</span> </h1>
      <br />

      <ButtonComp
        class="ma-2 my-3"
        propColor="red"
        :propRounded="true"
        :propDark="true"
        >Megrendelem
      </ButtonComp>
      <ButtonComp
        class="ma-2"
        propColor="red"
        :propRounded="true"
        :propText="true"
        @click="clearCartItems2"
      >
        Kosár ürítése
      </ButtonComp>
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
    deleteProduct(productId) {
      this.$store.dispatch("cart2/deleteProductById", productId);
    },
    decrease(productId, quantity) {
      let numberQuantity = parseInt(quantity);
      if (quantity > 1) {
        numberQuantity--;
        this.changeQuantityOfProduct(productId, numberQuantity);
      }
    },
    increase(productId, quantity) {
      let numberQuantity = parseInt(quantity);
      numberQuantity++;
      this.changeQuantityOfProduct(productId, numberQuantity);
    },
    changeQuantityOfProduct(productId, quantity) {
      this.$store.dispatch("cart2/changeQuantityOfProductById", {
        productId,
        quantity,
      });
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
    deliveryPrice() {
      if (this.sumOfCharge > 10000) {
        return "ingyenes ";
      } else {
        return "1 500 Ft";
      }
    },
    finallyPrice() {
      if (this.sumOfCharge > 10000) {
        return this.sumOfCharge;
      } else {
        return this.sumOfCharge+1500;
      }
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
#finalyPrice {
  color: crimson;
}
</style>