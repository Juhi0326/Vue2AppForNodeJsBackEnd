<template>
<div>
  <Button
    @click="$router.back()"
    class="ma-2"
    propColor="red"
    :propRounded="true"
    :propDark="true"
  >
    visszalépek
  </Button>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
};
</script>

<style>
</style>