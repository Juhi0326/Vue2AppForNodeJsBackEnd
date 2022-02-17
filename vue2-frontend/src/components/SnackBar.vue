<template>
  <v-snackbar
    top
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true"
  >
    <div class="d-flex justify-space-between align-center">
      {{ snackbar.text }}
      <v-btn class="ml-4" text dark @click="closeSnackbar">Bezár</v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.getters["snackBar/getSnackBar"];
    },
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("snackBar/closeSnackbar");
    },
  },
};
</script>

<style>
</style>