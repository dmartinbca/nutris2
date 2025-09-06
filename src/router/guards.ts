// src/router/guards.ts
import { useAuthStore } from '@/stores/modules/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    next(); // Permite el acceso a la ruta si está autenticado
  } else {
    next('/'); // Redirige a la página de inicio de sesión si no está autenticado
  }
};
