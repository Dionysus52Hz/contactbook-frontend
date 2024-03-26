<script>
import InputSearch from '../components/InputSearch.vue';
import ContactList from '../components/ContactList.vue';
import ContactService from '../services/contactService';
import ContactCard from '../components/ContactCard.vue';
export default {
   components: {
      InputSearch,
      ContactList,
      ContactCard,
   },

   data() {
      return {
         contacts: [],
         activeIndex: -1,
         searchText: '',
      };
   },

   watch: {
      searchText() {
         this.activeIndex = -1;
      },
   },

   computed: {
      contactStrings() {
         return this.contacts.map((contact) => {
            const { name, email, address, phone } = contact;
            return [name, email, address, phone].join('');
         });
      },

      filteredContacts() {
         if (!this.searchText) return this.contacts;
         return this.contacts.filter((contact, index) => {
            return this.contactStrings[index].includes(this.searchText);
         });
      },

      activeContact() {
         if (this.activeIndex < 0) return null;
         return this.filteredContacts[this.activeIndex];
      },

      filteredContactsCount() {
         return this.filteredContacts.length;
      },
   },

   methods: {
      async retrieveContacts() {
         try {
            this.contacts = await ContactService.getAll();
         } catch (error) {
            console.log(error);
         }
      },

      refreshList() {
         this.retrieveContacts();
         this.activeIndex = -1;
      },

      async removeAllContacts() {
         if (confirm('Ban muon xoa tat ca lien he?')) {
            try {
               await ContactService.deleteAll();
               this.refreshList();
            } catch (error) {
               console.log(error);
            }
         }
      },

      goToAddContact() {
         this.$router.push({ name: 'contact-add' });
      },
      updateActiveIdx(activeIdx) {
         this.activeIndex = activeIdx;
      },
   },
   mounted() {
      this.refreshList();
   },
};
</script>

<style scoped>
.page {
   text-align: left;
   max-width: 750px;
}
</style>

<template>
   <div class="page row">
      <div class="col-md-10">
         <input-search v-model="searchText"></input-search>
      </div>

      <div class="mt-3 col-md-6">
         <h4>
            Danh ba
            <i class="fas fa-address-book"></i>
         </h4>
         <contact-list
            v-if="filteredContactsCount > 0"
            :contacts="filteredContacts"
            :activeIdx="activeIndex"
            @updateActiveIdx="updateActiveIdx"
         ></contact-list>

         <p v-else>Khong co lien he nao</p>

         <div class="mt-3 d-flex justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="refreshList">
               Lam moi
            </button>

            <button class="btn btn-sm btn-success" @click="goToAddContact">
               Them moi
            </button>

            <button class="btn btn-sm btn-danger" @click="removeAllContacts">
               Xoa tat ca
            </button>
         </div>
      </div>

      <div class="mt-3 col-md-6">
         <div v-if="activeContact">
            <h4>
               Chi tiet lien he
               <i class="fas fa-address-card"></i>
            </h4>
            <contact-card :contact="activeContact"></contact-card>
            <router-link
               :to="{
                  name: 'contact-edit',
                  params: { id: activeContact._id },
               }"
            >
               <span class="mt-2 badge text-bg-warning">
                  <i class="fas fa-edit"></i>Hieu chinh
               </span>
            </router-link>
         </div>
      </div>
   </div>
</template>
