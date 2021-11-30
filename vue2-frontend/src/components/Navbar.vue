<template>
  <div>
    <div id="app">
     <v-app-bar
        color="deep-purple accent-4"
        dense
        light
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Page title</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
  
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
  
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
  
          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>


      <v-navigation-drawer
          permanent
          expand-on-hover
          app
        >
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src=""></v-img>
              </v-list-item-avatar>
            </v-list-item>
  
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6" v-if="currentUser">
                  {{currentUser}}
                </v-list-item-title>
                <v-list-item-subtitle v-if="loggedIn">your role is {{userRole}}</v-list-item-subtitle>
                <v-list-item-subtitle v-if="!loggedIn">your role is gest</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list
            nav
            dense
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Files</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Shared with me</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Starred</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
  </div>
</template>

<script>
export default {

    computed: {
    loggedIn() {
      if (this.$store.state.auth.status.loggedIn) {
        return this.$store.state.auth.status.loggedIn;
      }
      return false
    },
    currentUser() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.userName;
      }
      return null
    },
    userRole() {
      if (this.$store.state.auth.user) {
         return this.$store.state.auth.user.role;
      }
     return null
    },
  },
};
</script>

<style>
</style>