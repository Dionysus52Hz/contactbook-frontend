<template>
   <v-app>
      <v-layout>
         <Header></Header>
         <v-main>
            <router-view></router-view>
         </v-main>
      </v-layout>
   </v-app>
</template>

<script setup>
   import Header from './components/Header.vue';
</script>
<style>
   @import './style.css';
</style>
