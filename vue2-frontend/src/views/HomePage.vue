<template>
  <div>
    <div class="d-flex justify-center align-center" v-if="loader">
      <LoadingSpinner />
    </div>
    <div v-if="!loader">
      <v-card class="mx-auto">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="titleImagePath"
          alt=""
        >
          <v-card-title v-if="content">{{
            content.Title.titleDescription
          }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

        <v-card-text class="text--primary">
          <v-row>
            <v-col>
              {{ content.Heading.headingDescription }}
            </v-col>
          </v-row>
          <div>Whitehaven Beach</div>

          <div></div>
        </v-card-text>

        <v-card-actions> </v-card-actions>
      </v-card>
      <v-card class="mx-auto mt-6" v-intersect="showMoreContent" v-if="content">
        <v-img
          v-if="content"
          class="white--text align-end"
          height="200px"
          :src="headingImagePath"
          alt=""
        >
        </v-img>

        <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

        <v-card-text class="text--primary">
          <v-row v-if="content">
            <v-col>
              {{ content.Heading.headingDescription }}
            </v-col>
          </v-row>
          <div>Whitehaven Beach</div>

          <div></div>
        </v-card-text>

        <v-card-actions> </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import HomePageService from "../services/homePageService";
import LoadingSpinner from "../components/LoadingSpinner.vue";
export default {
  name: "HomePage",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isContent: false,
      content: null,
      titleImagePath: "",
      headingImagePath: "",
      loadNewContent: false,
      loader: false,
    };
  },
  created() {
    this.getHomePageData();
    this.loader = true;
  },
  methods: {
    showMoreContent(entries) {
      this.loadNewContent = entries[0].isIntersecting;
      console.log(this.loadNewContent);
    },
    getHomePageData() {
      HomePageService.getHomePage().then(
        (response) => {
          this.content = response.data.HomePage[0];
          this.loader = false;
          this.isContent = true;
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