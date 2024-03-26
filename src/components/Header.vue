<template>
   <v-app-bar color="primary">
      <v-icon
         class="ms-4"
         :icon="mdiContacts"
      ></v-icon>
      <v-app-bar-title>ỨNG DỤNG QUẢN LÝ DANH BẠ</v-app-bar-title>
      <v-btn
         variant="text"
         flat
         :append-icon="mdiHome"
         @click="goToHomePage"
         >Về trang chủ</v-btn
      >
   </v-app-bar>
</template>

<script setup>
   import { mdiContacts, mdiHome } from '@mdi/js';
   import { useRouter } from 'vue-router';

   const router = useRouter();
   const goToHomePage = () => {
      router.push({
         name: 'homePage',
      });
   };
</script>

<style scoped>
   .v-app-bar {
      position: fixed !important;
      top: 0;
      left: 0;
   }
</style>
