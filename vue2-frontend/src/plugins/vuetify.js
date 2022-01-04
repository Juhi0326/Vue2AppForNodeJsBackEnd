import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F44336',
        secondary: '#FFCDD2',
        accent: '#3F51B5',
        error: '#880E4F',
      },
    },
  },
});


