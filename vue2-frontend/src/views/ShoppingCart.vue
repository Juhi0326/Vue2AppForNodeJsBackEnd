<template>
  <div>
    cart items
    {{ cart }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },

  created() {
    this.cart = this.$store.getters["cart/getCartItems"];
    console.log(this.cart);
  },
  computed: {
    cartItems() {
      return this.$store.getters["cart/getCartItems"];
    },
  },
};
</script>

<style>
</style>