<template>
   <v-container class="page">
      <v-snackbar
         v-model="notification"
         location="bottom right"
         color="success"
      >
         {{ message }}
         <template v-slot:actions>
            <v-btn
               :icon="mdiClose"
               @click="notification = false"
            ></v-btn>
         </template>
      </v-snackbar>
      <v-row>
         <v-col cols="12">
            <contact-form
               :contact="contact"
               @submitContact="addContact"
            ></contact-form>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup>
   import { mdiClose } from '@mdi/js';
   import ContactForm from '../components/ContactForm.vue';
   import ContactService from '../services/contactService';
   import { ref } from 'vue';

   const contact = ref({});
   const message = ref('');
   const notification = ref(false);

   const addContact = async (data) => {
      try {
         await ContactService.create(data);
         notification.value = true;
         message.value = 'Thêm liên hệ thành công.';
      } catch (error) {
         console.log(error);
      }
   };
</script>
