<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-toolbar dark color="red" dense flat>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        v-show="!!message"
        class="pa-4"
        v-html="message"
      ></v-card-text>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <ButtonComp
          class="ma-2"
          propColor="red"
          :propRounded="true"
          :propText="true"
          @click.native="cancel"
        >
          Mégsem
        </ButtonComp>

        <ButtonComp
          class="ma-2 my-3"
          propColor="red"
          :propRounded="true"
          :propDark="true"
          @click.native="agree"
        >
          Igen
        </ButtonComp>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ButtonComp from "../components/ButtonComp.vue";

export default {
  components: {
    ButtonComp,
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "red",
        width: 400,
        zIndex: 200,
        noconfirm: false,
      },
    };
  },
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>