<template>
  <div class="container">
    <h1 v-if="isContent">{{ content.Title.titleDescription }}</h1>
    <img :src="titleImagePath" alt="" class="responsive" />
    <h3 v-if="isContent">{{ content.Heading.headingDescription }}</h3>
    <img :src="headingImagePath" alt="" class="responsive" />
  </div>
</template>

<script>
import HomePageService from "../services/homePageService";
export default {
  name: "HomePage",
  data() {
    return {
      isContent : false,
      content: null,
      titleImagePath: "",
      headingImagePath: "",
    };
  },
  created() {
    this.getHomePageData();
  },
  methods: {
    getHomePageData() {
      HomePageService.getHomePage().then(
        (response) => {
          this.content = response.data.HomePage[0];
          this.isContent = true
          console.log(this.content);
          this.titleImagePath =
            "http://localhost:8081/" + this.content.Title.titleImagePath;
          this.headingImagePath =
            "http://localhost:8081/" + this.content.Heading.headingImagePath;
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