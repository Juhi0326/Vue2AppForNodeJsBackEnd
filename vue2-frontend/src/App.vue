<template>
  <v-app id="app">
    <Navbar/>
    <br>
      <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from "../src/components/Navbar.vue";
export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({}),
  methods: {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
