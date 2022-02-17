<template>
  <div class="d-flex align-end flex-column mr-12">
    <v-speed-dial
      v-model="fab"
      top
      left
      direction="bottom"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  data: () => ({
    direction: "bottom",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: false,
    bottom: true,
    left: true,
    transition: "slide-y-reverse-transition",
  }),
};
</script>

<style>
</style>