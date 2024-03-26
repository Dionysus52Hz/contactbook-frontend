<template>
   <v-text-field
      class="pt-4"
      type="text"
      variant="outlined"
      flat
      label="Nhập thông tin cần tìm"
      :hide-details="true"
      @update:modelValue="updateModelValue"
      @keyup.enter="submit"
   >
      <template v-slot:append-inner>
         <v-btn
            :append-icon="mdiMagnify"
            color="primary"
            flat
            @click="submit"
            >Tìm kiếm</v-btn
         >
      </template>
   </v-text-field>
</template>

<script setup>
   import { mdiMagnify } from '@mdi/js';

   const props = defineProps({
      modelValue: {
         type: String,
         default: '',
      },
   });

   const emits = defineEmits(['submit', 'update:modelValue']);

   const updateModelValue = (value) => {
      emits('update:modelValue', value);
   };
   const submit = () => {
      emits('submit');
   };
</script>
