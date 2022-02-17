<template>
  <v-app id="app">
    <NavBar/>
    <br>
    <SnackBar />
      <router-view class="container"></router-view>
    <FooterComp />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SnackBar from './components/SnackBar.vue';
import FooterComp from  './components/FooterComp.vue';
export default {
  name: "App",

  components: {
    NavBar,
    FooterComp,
    SnackBar
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
