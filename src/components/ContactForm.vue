<template>
   <v-card rounded="lg">
      <v-card-item
         class="text-primary pa-4"
         :prepend-icon="props.contact._id ? mdiAccountEdit : mdiAccountPlus"
         :title="props.contact._id ? 'CHỈNH SỬA LIÊN HỆ' : 'THÊM LIÊN HỆ MỚI'"
      ></v-card-item>

      <v-divider></v-divider>

      <v-form
         class="pa-4"
         @submit="submitContact"
         @keyup.enter="submitContact"
      >
         <v-text-field
            counter="50"
            v-model="name"
            v-bind="nameProps"
            label="Tên"
            type="text"
            color="primary"
         />

         <v-text-field
            counter="50"
            v-model="email"
            v-bind="emailProps"
            label="Email"
            type="text"
            color="primary"
         />

         <v-text-field
            counter="100"
            v-model="address"
            v-bind="addressProps"
            label="Địa chỉ"
            type="text"
            color="primary"
         />

         <v-text-field
            counter="10"
            v-model="phone"
            v-bind="phoneProps"
            label="Số điện thoại"
            color="primary"
         />

         <v-checkbox
            label="Liên hệ yêu thích"
            v-model="favorite"
            v-bind="favoriteProps"
            :hide-details="true"
         >
         </v-checkbox>
      </v-form>

      <v-divider></v-divider>

      <v-card-item class="pa-4">
         <v-btn
            @click="submitContact"
            color="primary"
            flat
            >Lưu</v-btn
         >
         <v-btn
            class="ms-4"
            color="danger"
            flat
            v-if="props.contact._id"
            @click="deleteContact"
            >Xoá</v-btn
         >
      </v-card-item>
   </v-card>
</template>

<script setup>
   import * as yup from 'yup';
   import { useForm } from 'vee-validate';
   import { mdiAccountPlus, mdiAccountEdit } from '@mdi/js';

   const props = defineProps({
      contact: Object,
   });
   const emits = defineEmits(['submitContact', 'deleteContact']);

   const contactSchema = yup.object().shape({
      name: yup
         .string()
         .required('Tên không được để trống.')
         .min(2, 'Tên phải có ít nhất 2 kí tự.')
         .max(50, 'Tên có tối đa 50 ký tự.'),

      email: yup
         .string()
         .email('Email không đúng định dạng.')
         .max(50, 'Email tối đa 50 ký tự.'),

      address: yup.string().max(100, 'Địa chỉ tối đa 100 ký tự.'),

      phone: yup
         .string()
         .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            'Số điện thoại không hợp lệ.'
         ),
   });

   const { defineField, handleSubmit } = useForm({
      validationSchema: contactSchema,
      initialValues: {
         name: props.contact.name,
         email: props.contact.email,
         address: props.contact.address,
         phone: props.contact.phone,
         favorite: props.contact.favorite,
      },
   });

   const vuetifyConfig = (state) => ({
      props: {
         'error-messages': state.errors,
      },
   });

   const [name, nameProps] = defineField('name', vuetifyConfig);
   const [email, emailProps] = defineField('email', vuetifyConfig);
   const [address, addressProps] = defineField('address', vuetifyConfig);
   const [phone, phoneProps] = defineField('phone', vuetifyConfig);
   const [favorite, favoriteProps] = defineField('favorite', vuetifyConfig);

   const submitContact = handleSubmit((values) => {
      emits('submitContact', values);
      console.log(values);
   });

   const deleteContact = () => {
      emits('deleteContact', props.contact.id);
   };
</script>

<style scoped>
   .v-card {
      max-width: 720px;
      margin: 0 auto;
   }

   .v-form .v-text-field:not(:first-child) {
      margin-top: 12px;
   }
</style>
