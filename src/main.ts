import './assets/main.css'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/modules/auth';
import enLocale from './locales/en.json'
import esLocale from './locales/es.json'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  legacy: false, // evitar advertencias del modo de legado
  locale: 'es', // idioma por defecto
  messages: {
    en: enLocale,
    es: esLocale
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)


//Verificar la autenticación al cargar la aplicación
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/');
    } else if (to.path === '/' && isAuthenticated) {
      // Si el usuario ya está autenticado e intenta visitar la página de login, redirigirlo a otra página (ej. dashboard)
      next('/home'); // Asegúrate de cambiar '/dashboard' a la ruta a la que quieres redirigir a los usuarios autenticados
    }else {
      next(); // Continuar con la navegación
    }
});




// Obtener la instancia del store de autenticación
const authStore = useAuthStore();

// Verificar si hay un token almacenado y autenticar automáticamente
const storedToken = localStorage.getItem('token');

if (storedToken) {
  authStore.setAuthenticated(true); // Actualiza el estado de autenticación utilizando la mutación
}

//axios configuration
import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)
axios.defaults.baseURL =  import.meta.env.VITE_RUTA_API;

//axios end configuration
import * as buffer from 'buffer';
(window as any).Buffer = buffer.Buffer;

//buffer global
window.Buffer = Buffer

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
