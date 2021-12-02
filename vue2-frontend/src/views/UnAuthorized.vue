<template>
  <div>
    <h1>A keresett oldalhoz nincs jogosultságod!</h1>
    <v-row>
        <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-img src="../assets/stop.jpg" class="my-12"></v-img>
      </v-col>
    </v-row>

    <GoBack />
  </div>
</template>

<script>
import GoBack from "../components/GoBack.vue";
export default {
  components: {
    GoBack,
  },
};
</script>

<style>
</style>