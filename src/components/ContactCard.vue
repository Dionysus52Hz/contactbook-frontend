<template>
   <v-card
      :prepend-icon="mdiAccountDetails"
      title="CHI TIẾT LIÊN HỆ"
      rounded="lg"
      class="text-primary font-weight-bold"
   >
      <v-card-text>
         <v-list>
            <v-list-item
               :prepend-icon="mdiAccount"
               :title="'Tên'"
               :subtitle="contact.name"
            ></v-list-item>
            <v-list-item
               :prepend-icon="mdiEmail"
               :title="'Email'"
               :subtitle="contact.email"
            >
            </v-list-item>
            <v-list-item
               :prepend-icon="mdiMapMarker"
               :title="'Địa chỉ'"
               :subtitle="contact.address"
            ></v-list-item>
            <v-list-item
               :prepend-icon="mdiPhone"
               :title="'Số điện thoại'"
               :subtitle="contact.phone"
            ></v-list-item>
            <v-list-item
               :prepend-icon="mdiHeart"
               :title="'Liên hệ yêu thích'"
               :subtitle="contact.favorite ? 'Có' : 'Không'"
            ></v-list-item>
         </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-item class="pa-4">
         <v-spacer></v-spacer>
         <v-btn
            :prepend-icon="mdiAccountEdit"
            size="small"
            :to="{
               name: 'editContactPage',
               params: { id: contact._id },
            }"
            color="yellow-darken-2"
         >
            Hiệu chỉnh
         </v-btn>
      </v-card-item>
   </v-card>
</template>

<script setup>
   import {
      mdiAccount,
      mdiAccountDetails,
      mdiAccountEdit,
      mdiEmail,
      mdiHeart,
      mdiMapMarker,
      mdiPhone,
   } from '@mdi/js';

   const props = defineProps({
      contact: Object,
   });

   const emits = defineEmits(['editContact']);
</script>

<style scoped>
   .v-list-item__content {
      display: flex;
   }

   .v-btn {
      height: 36px;
      font-weight: 700;
   }
</style>
