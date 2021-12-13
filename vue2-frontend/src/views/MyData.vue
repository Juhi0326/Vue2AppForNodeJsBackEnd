<template>
  <div>
    <h1>Felhasználónevem: {{ user.userName }}</h1>
    <h1>Email címem: {{ user.email }}</h1>
    <h1>Felhasználói jogköröm: {{ user.role }}</h1>
    <h1>
      profil képem:
      <v-avatar>
        <v-img :src="userImage"></v-img>
      </v-avatar>
    </h1>
    <h3>A jelszó biztonsági okból nem látható</h3>
    <br>
    <go-back />
  </div>
</template>

<script>
import GoBack from "../components/GoBack.vue";
export default {
  name: "MyData",
  components: {
      GoBack
  },
  data() {
    return {
      user: null,
    };
  },

  methods: {
    getMyData() {
      this.user = this.$store.state.auth.user;
    },
  },
  created() {
    this.getMyData();
  },

  computed: {
    userImage() {
      if (this.$store.state.auth.user) {
        return "http://localhost:8081/" + this.$store.state.auth.user.userImage;
      }
      return null;
    },
  },
};
</script>

<style>
</style>