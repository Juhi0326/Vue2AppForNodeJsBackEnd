<template>
  <div>
    <v-card class="mx-auto" max-width="700">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      </v-toolbar>

      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex" @click="goTo(card.route)">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end link"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <GoBack />
  </div>
</template>

<script>
import GoBack from "../../components/GoBack.vue";
export default {
  name: "AdminDashboard",
  components: {
    GoBack,
  },
  data: () => ({
    cards: [
      {
        title: "Új termék létrehozása",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12,
        route: "/admin/add-new-product"
      },
      {
        title: "Felhasználók kezelése",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6,
      },
      {
        title: "Rendelések",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6,
      },
    ],
  }),
  methods: {
      goTo(route) {
          this.$router.push(route);
      }
  }
};
</script>

<style scoped>
.link:hover {
    cursor: pointer;
}
</style>>
