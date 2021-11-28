<template>
<div class="container">
      <h1>{{ content.Title}}</h1>
      <h3>{{ content.Heading}}</h3>
      <img :src="imagePath" alt="" class="responsive">

  </div>
</template>

<script>
import HomePegeService from '../services/homePageSrevice';
export default {
  name: "Home",
  data() {
    return {
      content: '',
      imagePath: ''
    };
  },
    mounted() {
    HomePegeService.getHomePage().then(
      (response) => {
        this.content = response.data.HomePage[0];
        this.imagePath= 'http://localhost:8081/'+this.content.imagePath
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
}
</script>

<style>

</style>