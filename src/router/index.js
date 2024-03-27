import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import EditContact from '../views/EditContact.vue';
import AddContact from '../views/AddContact.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
   {
      path: '/',
      name: 'homePage',
      component: Home,
   },

   {
      path: '/contacts/:id',
      name: 'editContactPage',
      component: EditContact,
      props: true,
   },

   {
      path: '/add',
      name: 'addContactPage',
      component: AddContact,
      props: true,
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'notFoundPage',
      component: NotFound,
   },
];

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
});

export default router;
