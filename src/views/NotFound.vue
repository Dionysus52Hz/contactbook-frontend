<template>
   <v-container class="page">
      <v-row>
         <v-col
            cols="12"
            class="text-center"
         >
            <h1>Oops, không tìm thấy trang</h1>
         </v-col>
         <v-col
            cols="12"
            class="text-center"
         >
            <v-btn
               color="primary"
               :to="{
                  name: 'homePage',
               }"
               >Quay về trang chủ</v-btn
            >
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup></script>
<style scoped>
   .page {
      height: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
   }
</style>
