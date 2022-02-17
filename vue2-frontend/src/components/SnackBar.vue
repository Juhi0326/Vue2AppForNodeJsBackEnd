<template>
  <v-snackbar
    top
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true">
        
      {{ snackbar.text }}
      <v-btn flat dark @click="closeSnackbar">Bezár</v-btn>
    
  </v-snackbar>
</template>

<script>
export default {

  computed: {
    snackbar() {
      return this.$store.getters["snackBar/getSnackBar"]
    }
  },
  methods: {
      closeSnackbar() {
          this.$store.dispatch("snackBar/closeSnackbar");
      }
  }
}
</script>

<style>

</style>