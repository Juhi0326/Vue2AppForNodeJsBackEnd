<template>
  <v-btn
    v-on="$listeners"
    :color="propColor"
    :rounded ="propRounded"
    :dark ="propDark"
    :class="propClass"
    :outlined="PropOutlined"
    :text="propText"
    :disabled="propDisabled" 
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: ['propColor', 'propRounded', 'propDark', 'propClass', 'PropOutlined', 'propText', 'propDisabled'],
};
</script>