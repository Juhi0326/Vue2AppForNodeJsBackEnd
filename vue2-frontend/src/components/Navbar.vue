<template>
  <div>
    <div id="app">
      <v-app-bar color="red" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-btn
          text
          color="white"
          @click="goToProductsPage"
          v-if="this.$route.name !== 'Products'"
          >Termék lista</v-btn
        >
        <v-btn
          text
          color="white"
          @click="goToHomePagePage"
          v-if="this.$route.name !== 'HomePage'"
          >Főoldal</v-btn
        >
        <v-btn text color="white" @click="login" v-if="!loggedIn"
          >Bejelentkezés</v-btn
        >
        <v-menu left bottom v-if="userRole === 'admin'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on">
              Admin funkciók
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="link in links"
              :key="link.title"
              :cols="link.flex"
              @click="goTo(link.route)"
            >
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text color="white" @click="logout" v-if="loggedIn"
          >Kijelentkezés</v-btn
        >
      </v-app-bar>
    </div>

    <v-navigation-drawer permanent expand-on-hover app v-if="!isMobile">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="userImage"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6" v-if="currentUser">
              {{ currentUser }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="loggedIn"
              >your role is {{ userRole }}</v-list-item-subtitle
            >
            <v-list-item-subtitle v-if="!loggedIn"
              >your role is gest</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link v-if="userRole === 'admin'">
          <v-list-item-icon>
            <v-icon @click="goToAdminDashboard">mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="goToAdminDashboard"
            >Admin Dashboard</v-list-item-title
          >
        </v-list-item>
        <v-list-item link v-if="currentUser">
          <v-list-item-icon>
            <v-icon @click="goToMyDataPage">mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title @click="goToMyDataPage">Adataim</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

  methods: {
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    goToProductsPage() {
      this.$router.push("/products");
    },
    goToHomePagePage() {
      this.$router.push("/");
    },
    goToMyDataPage() {
      this.$router.push("/mydata/" + this.$store.state.auth.user.userId);
    },
    goToAdminDashboard() {
      this.$router.push("/admin/admin-dashboard");
    },
    goTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    loggedIn() {
      if (this.$store.state.auth.status.loggedIn) {
        return this.$store.state.auth.status.loggedIn;
      }
      return false;
    },
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.userName;
      }
      return null;
    },
    userImage() {
      if (this.$store.state.auth.user) {
        return "http://localhost:8081/" + this.$store.state.auth.user.userImage;
      }
      return null;
    },
    userRole() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.role;
      }
      return null;
    },
    links() {
      return [
        {
          title: "Új termék létrehozása",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 12,
          route: "/admin/add-new-product",
        },
        {
          title: "Felhasználók kezelése",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
          route: '/admin/user-list'
        },
        {
          title: "Rendelések",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
      ];
    },
  },
};
</script>

<style>
</style>