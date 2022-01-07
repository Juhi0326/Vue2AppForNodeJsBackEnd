<template>
  <div>
    <div id="app">
      <v-app-bar color="red" dark>
        <v-menu left bottom v-if="userRole === 'admin' && isMobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on"> Admin </v-btn>
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

        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="this.$route.name !== 'ProductsPage'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              @click="goToProductsPage"
              class="ma-3"
            >
              mdi-rugby
            </v-icon>
          </template>
          <span>Termékek</span>
        </v-tooltip>

        <v-tooltip bottom v-if="this.$route.name !== 'HomePage'">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              @click="goToHomePagePage"
              class="ma-3"
            >
              mdi-home
            </v-icon>
          </template>
          <span>Főoldal</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text
              > <span v-show="cartItems>0"> {{cartItems}}</span>
              <v-icon
                v-bind="attrs"
                v-on="on"
                @click="goToCartPage"
                class="ma-3"
              >
                mdi-cart-variant
              </v-icon>
            </v-btn>
          </template>
          <span>Kosár</span>
        </v-tooltip>
        <v-spacer></v-spacer>

        <v-tooltip bottom v-if="!loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click="login">
              mdi-door-closed-lock
            </v-icon>
          </template>
          <span>Bejelentkezés</span>
        </v-tooltip>

        <v-tooltip bottom v-if="loggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click="logout">
              mdi-logout
            </v-icon>
          </template>
          <span>Kijelentkezés</span>
        </v-tooltip>
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
    async logout() {
      try {
        await this.$store.dispatch("cart/clearCart");
        await this.$store.dispatch("auth/logout");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
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
    goToCartPage() {
      this.$router.push("/users/shopping-cart");
    },
    goTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    activeUser() {
      return this.$store.getters["auth/activeUser"];
    },
    loginStatus() {
      return this.$store.getters["auth/loginStatus"];
    },
    cartItems () {
      return this.$store.getters["cart/SumOfQuantity"];
    },

    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    loggedIn() {
      if (this.loginStatus) {
        return this.loginStatus.loggedIn;
      }
      return false;
    },
    currentUser() {
      if (this.activeUser) {
        return this.activeUser.userName;
      }
      return null;
    },
    userImage() {
      if (this.activeUser) {
        return "http://localhost:8081/" + this.activeUser.userImage;
      }
      return null;
    },
    userRole() {
      if (this.activeUser) {
        return this.activeUser.role;
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
          route: "/admin/user-list",
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