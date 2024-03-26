import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

import router from './router';

const myCustomLightTheme = {
   dark: false,
   colors: {
      background: '#F5F9FC',
      surface: '#FFFFFF',
      primary: '#3D5AFE',
      danger: '#D32F2F',
   },
};

const vuetify = createVuetify({
   ssr: true,
   components,
   directives,
   icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
         mdi,
      },
   },
   theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
         myCustomLightTheme,
      },
   },
});

createApp(App).use(router).use(vuetify).mount('#app');
