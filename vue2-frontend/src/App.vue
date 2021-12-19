<template>
  <v-app id="app">
    <NavBar/>
    <br>
      <router-view></router-view>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from  '../src/components/Footer.vue';
export default {
  name: "App",

  components: {
    NavBar,
    Footer
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
