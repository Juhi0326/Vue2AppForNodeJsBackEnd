<template>
  <v-btn
    v-on="$listeners"
    :color="propColor"
    :rounded="propRounded"
    :dark="propDark"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: ["propColor", "propRounded", "propDark"],
};
</script>