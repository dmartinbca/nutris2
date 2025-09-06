import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { requireAuth } from './guards'; // Importa el guard
import LoginView from '@/views/LoginView.vue'
import RestorePasswordView from '@/views/RestorePasswordView.vue'
import HomeView from '@/views/HomeView.vue'
import YourProductsView from '@/views/YourProductsView.vue'
import CustomizaTableView from '@/views/CustomizaTableView.vue';
import CustomizeView from '@/views/CustomizeView.vue';
import YourOrderView from '@/views/YourOrderView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/restore-password',
    name: 'RestorePassword',
    component: RestorePasswordView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth
  },
  {
    path: '/your-products',
    name: 'your-products',
    component: YourProductsView,
    meta: { requiresAuth: true  },
    beforeEnter: requireAuth
  },
  {
    path: '/customize',
    name: 'customize',
    component: CustomizaTableView,
    meta: { requiresAuth: true  },
    beforeEnter: requireAuth
  },
  {
    path: '/customize-edit/:id',
    name: 'customaize-edit',
    component: CustomizeView,
    meta: { requiresAuth: true  },
    beforeEnter: requireAuth
  },
  {
    path: '/your-order',
    name: 'your-order',
    component: YourOrderView,
    meta: { requiresAuth: true  },
    beforeEnter: requireAuth
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Guard global para limpiar el estado de los acordeones
router.beforeEach((to, from, next) => {
  // Solo limpia si NO vienes de un guardado
  if (!localStorage.getItem('accordion-keep')) {
    for (let i = 2; i <= 4; i++) { // Ajusta el rango según tus acordeones
      localStorage.removeItem(`container-toggle-${i}`);
    }
  }
  // Borra la marca siempre (para que solo dure una recarga)
  localStorage.removeItem('accordion-keep');
  next();
});
export default router;
