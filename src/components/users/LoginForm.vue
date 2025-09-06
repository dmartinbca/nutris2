<template>
  <div class="fondo">
    <Loading v-if="isLoading" />
    <div class="container-fluid d-flex align-items-center justify-content-center">
      <div class="card shadow-sm form-container px-4">
        <div class="card-body">
          <!-- Aquí va tu formulario de inicio de sesión -->
          <div class="d-flex flex-column justify-content-center h-100">
            <div>
              <a href="#">
                <img src="/img/arrow.png" alt="" srcset="">
              </a>
            </div>
            <div class="mb-3 d-flex justify-content-center">
              <img src="/img/users.png" alt="users">
            </div>
            <form @submit.prevent="handleSubmit" class="px-sm-5 mx-5">
              <div class="mb-3" :class="{ 'has-error': showErrorServer || showError &&  (!isUsernameValid || !isPasswordValid) }">
                <div class="position-relative">
                  <input type="text" class="form-control w-full" id="nameUser" v-model="username" :placeholder="$t('message.Username')" @input="validateFields">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg" @click="resetField" v-if="username.length > 1 || password.length > 1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>

                </div>
                <div class="position-relative">
                  <input :type="passwordType " class="form-control mt-2 w-full" id="password" v-model="password" :placeholder=" $t('message.Password')" @input="validateFields">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg" @click="togglePasswordVisibility" v-if="passwordType === 'password'">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg" @click="togglePasswordVisibility" v-else>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>



                </div>
                <span v-if="showError && (!isUsernameValid || !isPasswordValid)" class="error-message">{{$t('message.Your account name or password is incorrect')}}</span>
                <span v-if="showErrorServer" class="error-message">{{$t('message.Incorrect credentials Please verify your username and password')}}</span>
              </div>
              <div class="mb-3  d-flex  flex-column flex-sm-row justify-content-center justify-content-sm-between">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">{{$t('message.Rememberme')}}</label>
                </div>
                <div>
                  <RouterLink to="/restore-password" class="a">{{$t('message.Forgot your password')}}</RouterLink>
                </div>
              </div>
              <div class="d-flex justify-content-center" >
                <button type="submit" class="button-color">{{$t('message.Log in')}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useAuthStore } from '@/stores/modules/auth';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import Loading from '../Loading.vue';

  export default {
     components: {
      Loading
    },
    setup() {
      const authStore = useAuthStore();
      const $router = useRouter();
      const username = ref('');
      const password = ref('');
      const showError = ref(false);
      const showErrorServer = ref(false);
      const passwordType = ref('password');
      const isLoading = ref(false);

      // Validación de nombre de usuario
      //const isUsernameValid = computed(() => /^[a-zA-Z0-9]+$/.test(username.value));

      const isUsernameValid = computed(() => {
        const value = username.value;

        // Expresión para nombre de usuario con letras, números y espacios
        const usernameRegex = /^[a-zA-Z0-9 ]+$/;

        // Expresión para correo electrónico válido
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Retorna true si cumple con alguna de las dos expresiones
        return usernameRegex.test(value) || emailRegex.test(value);
      });

      // Validación de contraseña (al menos 6 caracteres)
      const isPasswordValid = computed(() => passwordType.value.length >= 3);

      // Función para manejar el envío del formulario
      // const handleSubmit = async () => {
      //   showError.value = true; // Mostrar errores al enviar el formulario

      //   if (!isUsernameValid.value || !isPasswordValid.value) {
      //     return; // No enviar el formulario si hay campos inválidos
      //   }

      //   // Si el formulario es válido, continuar con la lógica de inicio de sesión
      //   await authStore.login(username.value, password.value);
      //   if (!authStore.isAuthenticated) {
      //     showErrorServer.value = true;
      //     console.error(showErrorServer.value)
      //     console.error("Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.");
      //   }else {
      //     $router.push('/home');
      //   }
      // };

      const handleSubmit = async () => {
        showError.value = true;
        isLoading.value = true; // <-- Activa el loading
        
        if (!isUsernameValid.value || !isPasswordValid.value) return;

        try {
          await authStore.login(username.value, password.value);
          
          if (!authStore.isAuthenticated) {
            showErrorServer.value = true;
          } else {
            $router.push('/home');
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          showErrorServer.value = true;
        } finally {
          isLoading.value = false; // <-- Desactiva el loading siempre
        }
      };

      // Función para validar los campos de entrada en cada cambio de entrada
      const validateFields = () => {
        showError.value = false; 
        showErrorServer.value = false// Ocultar el mensaje de error mientras el usuario escribe
      };

      const resetField = () => {
        username.value = '';
        password.value = '';
      }
      const togglePasswordVisibility = () => {
        passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
      };
      return {
        username,
        password,
        isUsernameValid,
        isPasswordValid,
        isLoading,
        handleSubmit,
        validateFields,
        showError,
        showErrorServer, 
        resetField,
        passwordType,
        togglePasswordVisibility,
      };
    }
  }
</script>

<style scoped>
  .fondo {
    height: 100vh;
    background-image: url('/img/fondo.png');
    background-repeat: no-repeat;
    width: 100vw;
    background-size: cover;
  }
  html, body, .container-fluid, .row, .col {
      height: 100%;
  }

  .svg {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 5%;
  }

  @media  screen and (max-width: 1280px) {
    .form-container {
      width: 45rem !important;
      height: 30rem !important;
    }
  }

  .form-container {
    width: 53rem;
    height: 35rem;

  }

  input {
    background: var(--spaceWrite);
    border-color: transparent;
  }
  .px-10 {
    padding-left: 6rem;
    padding-right: 6rem;
  } 

  .a {
    color: var(--textButton);
    text-decoration: none;
  }
  
  .error-message {
    color: red;
    font-size: 0.8rem;
  }

  .has-error input {
    border-color: red !important;
  }

  .button-color {
    background: var(--textButton);
    color: #fff;
    border-radius: 50px;
    width: 10.188rem;
    height: 3.375rem;
    border: 0;
    transition: all 0.3s ease;
  }

  .button-color:hover {
    transition: all 0.3s ease;
    background: transparent;
    color: var(--textButton);
    border: 1px solid var(--textButton)
  }
</style>
