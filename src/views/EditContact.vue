<template>
   <v-container
      class="page"
      v-if="contact"
   >
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
               @submitContact="updateContact"
               @deleteContact="deleteContact"
            >
            </contact-form>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup>
   import ContactForm from '../components/ContactForm.vue';
   import ContactService from '../services/contactService';
   import { ref, onBeforeMount } from 'vue';
   import { useRouter } from 'vue-router';
   import { mdiClose } from '@mdi/js';

   const props = defineProps({
      id: String,
   });

   const contact = ref(null);
   const message = ref('');
   const notification = ref(false);

   const getContact = async (id) => {
      try {
         contact.value = await ContactService.get(id);
      } catch (error) {
         console.log(error);
      }
   };

   const updateContact = async (data) => {
      try {
         await ContactService.update(contact.value._id, data);
         message.value = 'Cập nhật liên hệ thành công';
         notification.value = true;
      } catch (error) {
         console.log(error);
      }
   };

   const router = useRouter();
   const deleteContact = async () => {
      if (confirm('Bạn muốn xoá liên hệ này?')) {
         try {
            await ContactService.delete(contact.value._id);
            router.push({ name: 'homePage' });
         } catch (error) {
            console.log(error);
         }
      }
   };

   onBeforeMount(async () => {
      await getContact(props.id);
   });
</script>
