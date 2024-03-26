<template>
   <v-container class="page">
      <v-row>
         <v-col cols="12">
            <input-search v-model="searchText"></input-search>
         </v-col>

         <v-col
            cols="12"
            md="7"
         >
            <v-card
               :prepend-icon="mdiContacts"
               title="DANH SÁCH LIÊN HỆ"
               rounded="lg"
               class="text-primary font-weight-bold"
            >
               <v-divider></v-divider>

               <contact-list
                  v-if="filteredContactsCount > 0"
                  :contacts="filteredContacts"
                  :activeIndex="activeIndex"
                  @updateActiveIndex="updateActiveIdx"
               ></contact-list>

               <p
                  class="text-center pa-4 text-black font-weight-regular"
                  v-else
               >
                  Không có liên hệ nào
               </p>

               <v-divider></v-divider>

               <v-card-item class="px-4 text-center flex-wrap">
                  <v-btn
                     size="small"
                     color="primary"
                     variant="flat"
                     :prepend-icon="mdiRefresh"
                     @click="refreshList"
                  >
                     Làm mới danh sách
                  </v-btn>

                  <v-btn
                     size="small"
                     color="success"
                     variant="flat"
                     :prepend-icon="mdiAccountPlus"
                     @click="goToAddContact"
                  >
                     Thêm liên hệ mới
                  </v-btn>

                  <v-btn
                     size="small"
                     color="danger"
                     variant="flat"
                     :prepend-icon="mdiDelete"
                     @click="removeAllContacts"
                  >
                     Xoá tất cả
                  </v-btn>
               </v-card-item>
            </v-card>
         </v-col>

         <v-col
            md="5"
            v-if="activeContact"
         >
            <contact-card :contact="activeContact"></contact-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script setup>
   import InputSearch from '../components/InputSearch.vue';
   import ContactList from '../components/ContactList.vue';
   import ContactService from '../services/contactService';
   import ContactCard from '../components/ContactCard.vue';
   import { ref, watch, computed, onMounted } from 'vue';
   import { useRouter } from 'vue-router';
   import { mdiContacts, mdiRefresh, mdiAccountPlus, mdiDelete } from '@mdi/js';

   const contacts = ref([]);
   const activeIndex = ref(-1);
   const searchText = ref('');

   watch(searchText, () => {
      activeIndex.value = -1;
   });

   const contactStrings = computed(() => {
      return contacts.value.map((contact) => {
         const { name, email, address, phone } = contact;
         return [name, email, address, phone].join('');
      });
   });

   const filteredContacts = computed(() => {
      if (!searchText.value) return contacts.value;
      return contacts.value.filter((contact, index) => {
         return contactStrings.value[index].includes(searchText.value);
      });
   });

   const activeContact = computed(() => {
      if (activeIndex.value < 0) return null;
      console.log(filteredContacts.value[activeIndex.value]);
      return filteredContacts.value[activeIndex.value];
   });

   const filteredContactsCount = computed(() => {
      return filteredContacts.value.length;
   });

   const retrieveContacts = async () => {
      try {
         contacts.value = await ContactService.getAll();
      } catch (error) {
         console.log(error);
      }
   };

   const refreshList = () => {
      retrieveContacts();
      activeIndex.value = -1;
   };

   const removeAllContacts = async () => {
      if (confirm('Bạn muốn xoá tất cả liên hệ?')) {
         try {
            await ContactService.deleteAll();
            refreshList();
         } catch (error) {
            console.log(error);
         }
      }
   };

   const router = useRouter();
   const goToAddContact = () => {
      router.push({ name: 'addContactPage' });
   };

   const updateActiveIdx = (activeIdx) => {
      activeIndex.value = activeIdx;
   };

   onMounted(() => {
      refreshList();
   });
</script>

<style scoped>
   .v-btn {
      height: 36px;
      margin: 8px;
   }
</style>
