<template>
  <div class=" container-fluid p-0 m-0 w-100 " style="height:100vh;">
    <div class="d-flex p-0 w-100">


      <NavSidebar v-if="shouldShowSidebar" id="menu" class="col-3 col-xxl-2 p-0 "/>

      <main  ref="mainElement" class="col p-0 position-relative" style="overflow-y: auto; height: 100vh;">
        <!-- Agrega contenido para que el scroll funcione -->
        <transition name="fade">
          <div class="lenguage z-3"  v-if="isLanguageVisible">
            <select v-model="selectedLanguage" @change="changeLanguage" class="custom-select">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        
        </transition>

          <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/modules/auth';
import NavSidebar from '@/components/NavSidebar.vue';
import { computed, ref, onMounted,  onUnmounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  components: {
    NavSidebar,
  },
  setup() {
    const authStore = useAuthStore();
    const { locale } = useI18n();
    const selectedLanguage = ref(locale.value);
    const isSidebarVisible = ref(false); // Inicialmente oculto en móviles
    const isLanguageVisible = ref(true)

    const mainElement = ref(null);

    // Cambia el idioma
    const changeLanguage = () => {
      locale.value = selectedLanguage.value;
    }

    // Estado de autenticación
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    
    // Computed property para determinar si el sidebar debe ser visible
    const shouldShowSidebar = computed(() => {
        // Muestra si está autenticado y si es visible o si es una pantalla grande
        return isAuthenticated.value && (isSidebarVisible.value || window.innerWidth >= 525);
    });
    
    // Método para alternar la visibilidad del sidebar
    const toggleSidebar = () => {
      isSidebarVisible.value = !isSidebarVisible.value;
    };

    // Función para manejar el evento scroll
    const handleScroll = () => {
      // Aquí puedes acceder a las propiedades del scroll del elemento
      if (mainElement.value) {
       
        const scrollPosition = mainElement.value.scrollTop;

        if (scrollPosition > 0) {
          isLanguageVisible.value = false; // Ocultar cuando se baja
        } else {
          isLanguageVisible.value = true; // Mostrar cuando se está en la parte superior
        }
      } else {
        const main = document.querySelector('main');
        if (main) {
          const scrollPosition = main.scrollTop;

          if (scrollPosition > 0) {
            isLanguageVisible.value = false; // Ocultar cuando se baja
          } else {
            isLanguageVisible.value = true; // Mostrar cuando se está en la parte superior
          }

        }
      }
    };

    // Agregar el listener al evento scroll en el montaje del componente
    onMounted(async () => {
      await nextTick();
      if (mainElement.value) {
        mainElement.value.addEventListener('scroll', handleScroll);
      } else {
        const main = document.querySelector('main');
        if (main) {
          main.addEventListener('scroll', handleScroll);
        }
      }
    });

    // Eliminar el listener al evento scroll en el desmontaje del componente
    onUnmounted(() => {
      if (mainElement.value) {
        mainElement.value.removeEventListener('scroll', handleScroll);
      } else {
        const main = document.querySelector('main');
        if (main) {
          main.removeEventListener('scroll', handleScroll);
        }
      }
    });

    return {
      isAuthenticated,
      selectedLanguage,
      changeLanguage,
      toggleSidebar,
      shouldShowSidebar, // Asegúrate de exportar esta propiedad
      isSidebarVisible,   // Exporta si necesitas acceder a ella para depuración
      isLanguageVisible,
    };
  },
};
</script>

<style scoped>
.lenguage {
  position: fixed;
  right: 10px;
  top: 10px;
}
.error {
  color: red;
}

.custom-select {
  background-color: white;
  display: block;
  margin-left: auto;
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-size: 1.13em;
  font-weight: 700;
  color: var(--textButton);
  border: solid 2px var(--textButton);
  border-radius: 30px;
  padding: .37rem 1.26rem;
  max-width: max-content;
  text-decoration: none;
  transition: all 0.3s ease;
  appearance: none; /* Elimina el estilo predeterminado /
  -webkit-appearance: none; / Para navegadores basados en WebKit /
  -moz-appearance: none; / Para Firefox */
  cursor: pointer;
}

.custom-select:hover {
  color: white;
  background-color: var(--textButton);
  transform: scale(1.05);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
