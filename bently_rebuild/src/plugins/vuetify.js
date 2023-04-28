import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#378679',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#d2d2d2',
        secondary: '#DA10DA',
        error: '#f44336',
      }
    },
    dark: localStorage.getItem('theme') === 'dark',
  },
});