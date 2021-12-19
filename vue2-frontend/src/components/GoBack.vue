<template>
<div>
  <ButtonComp
    @click="$router.back()"
    class="ma-2"
    propColor="red"
    :propRounded="true"
    :propDark="true"
  >
    visszalépek
  </ButtonComp>
  </div>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";
export default {
  components: {
    ButtonComp,
  },
};
</script>

<style>
</style>