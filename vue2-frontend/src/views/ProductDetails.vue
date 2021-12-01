<template>
    <div>{{productId}}</div>
</template>

<script>
export default {
  computed: {
    productId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>