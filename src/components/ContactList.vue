<template>
   <v-list variant="flat">
      <v-list-item
         v-for="(contact, index) in contacts"
         :key="contact._id"
         :class="{ active: index === props.activeIndex }"
         @click="updateActiveIndex(index)"
         :title="contact.name"
      >
      </v-list-item>
   </v-list>
</template>

<script setup>
   const props = defineProps({
      contacts: Array,
      activeIndex: Number,
   });

   const emits = defineEmits(['updateActiveIndex']);

   const updateActiveIndex = (index) => {
      emits('updateActiveIndex', index);
      console.log(index);
   };
</script>

<style scoped>
   .v-list {
      height: 240px;
      max-height: 240px;
      overflow-x: scroll;
   }
   .v-list-item.active {
      background-color: rgb(var(--v-theme-primary));
      color: #fff;
   }
</style>
