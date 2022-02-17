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
        <v-btn v-model="fab" color="red" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark small color="green" @click="goToUserList">
            <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Felhasználók kezelése</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark small color="indigo" @click="goToProductCreation">
            <v-icon v-bind="attrs" v-on="on">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Termék létrehozás</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab dark small color="red" @click="GoToDeliveryPage">
            <v-icon v-bind="attrs" v-on="on">mdi-application-export</v-icon>
          </v-btn>
        </template>
        <span>Rendelések kezelése</span>
      </v-tooltip>

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
  methods: {
    goToUserList() {
      this.$router.push("/admin/user-list");
    },
    goToProductCreation() {
      this.$router.push("/admin/add-new-product");
    },
    GoToDeliveryPage() {
      console.log('irány a rendelések oldal!')
    }
  }
};
</script>

<style>
</style>