<template>
  <div>
    <ConfirmDlg ref="confirm" />
    <div v-if="SumOfQuantity != 0">
      <h1>A Kosár tartalma:</h1>
      <br />

      <v-row>
        <v-col sm="12" md="7" class="my-4 overflow-y-auto" id="scroll-target">
          <v-container
            id="scroll-target"
            style="max-height: 1200px"
            class="overflow-y-auto"
          >
            <v-row
              v-scroll:#scroll-target="onScroll"
              justify="center"
              style="height: 1000px"
            >
              <div
                v-for="(product, index) in cartItems2"
                :key="index"
                v-scroll:#scroll-target="onScroll"
              >
                <v-row>
                  <v-col cols="2">
                    <v-img
                      max-width="200"
                      max-height="400"
                      :src="product.imagePath"
                    >
                    </v-img>
                  </v-col>
                  <v-col cols="8">
                    <h2>Termék neve: {{ product.name }}</h2>
                    <h2>egységár: {{ product.discountedPrice }}</h2>
                    <br />
                    <h2>mennyiség:</h2>
                    <h2>{{ product.quantity }} db</h2>

                    <v-btn @click="increase(product._id, product.quantity)"
                      >+</v-btn
                    >

                    <v-btn
                      @click="decrease(product._id, product.quantity)"
                      class="ml-2"
                      >-</v-btn
                    >
                    <h2 class="mt-4">
                      Termék ára összesen: {{ product.subTotal | currency }}
                    </h2>
                    <ButtonComp
                      class="ma-2 my-3"
                      propColor="red"
                      :propRounded="true"
                      :propDark="true"
                      @click="delRecord(
                        product._id, 
                        title='Termék eltávolítása',
                        confirmText='Biztosan el szeretnéd távolítani a terméket a kosárból?'
                        )"
                      >Termék eltávolítása
                    </ButtonComp>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
            </v-row>
          </v-container>
        </v-col>
        <v-col sm="12" md="5" class="mt-8">
          <h1>
            A kosárban lévő termékek ára összesen: {{ sumOfCharge | currency }}
          </h1>
          <h2>kiszállítási díj: {{ deliveryPrice }}</h2>
          <h1 class="mt-6">
            <span id="finalyPrice"
              >Fizetendő összesen: {{ finallyPrice | currency }}</span
            >
          </h1>
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
            @click="delRecord(
                        id='',
                        title='KOsár ürítése',
                        confirmText='Biztosan ki szeretnéd üríteni a kosár tartalmát?'
                        )"
          >
            Kosár ürítése
          </ButtonComp>
          <br />
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <h1>A kosár üres.</h1>
    </div>
  </div>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";
import ConfirmDlg from "../components/ConfirmDlg.vue";
export default {
  components: {
    ButtonComp,
    ConfirmDlg,
  },
  data() {
    return {
      offsetTop: 0,
    };
  },
  methods: {
    async delRecord(productId, title, confirmText) {
      if (
        await this.$refs.confirm.open(
          title,
          confirmText
        )
      ) {
        if (title === 'Termék eltávolítása') {
          this.deleteProduct(productId);
        } else {
          this.deleteCartItems()
        }
        
      }
    },
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
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
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
        return this.sumOfCharge + 1500;
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