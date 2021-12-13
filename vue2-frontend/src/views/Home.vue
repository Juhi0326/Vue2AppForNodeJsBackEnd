<template>
  <div class="container">
    <h1>{{ content.Title.titleDescription }}</h1>
    <img :src="titleImagePath" alt="" class="responsive" />
    <h3>{{ content.Heading.headingDescription }}</h3>
    <img :src="headingImagePath" alt="" class="responsive" />
  </div>
</template>

<script>
import HomePegeService from "../services/homePageService";
export default {
  name: "Home",
  data() {
    return {
      content: null,
      titleImagePath: '',
      headingImagePath: ''
    };
  },
  created() {
    this.getHomePageData()
  },
  methods: {
    getHomePageData() {
      HomePegeService.getHomePage().then(
        (response) => {
          this.content = response.data.HomePage[0];
          console.log(this.content);
          this.titleImagePath =
            "http://localhost:8081/" + this.content.Title.titleImagePath;
           this.headingImagePath = "http://localhost:8081/" + this.content.Heading.headingImagePath
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
  },
};
</script>

<style>
</style>