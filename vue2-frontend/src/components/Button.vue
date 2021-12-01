<template>
  <v-btn v-on="$listeners" rounded color="red" dark>
    <slot></slot>
  </v-btn>
  <!--   <button>
    <slot></slot>
  </button>
 -->
</template>

<script>
export default {};
</script>