// src/store/modules/auth.ts
import { defineStore } from 'pinia';
import callApi from '@/helper/callApi';

interface AuthState {
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    isAuthenticated: localStorage.getItem('token') !== null,
    // Otros estados relacionados con la autenticación
  }),
  getters: {
    loggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    // async login(username: string, password: string): Promise<void> {
    //   console.log(username + password)
    //   try {
    //     const response:any = await callApi('RG35Login?tenant=nutris&$filter=user eq ' + `'${username}'` + ' and pass eq ' + `'${password}'`);
    //     console.log(response.data.value[0])

    //     // Verificar si la respuesta contiene datos válidos
    //     if (response.data && Array.isArray(response.data.value) && response.data.value.length > 0) {
    //       // Almacenar el token en el almacenamiento local
    //       localStorage.setItem('name', response.data.value[0].Name);
    //       localStorage.setItem('token', response.data.value[0].Name);
    //       localStorage.setItem('No_', response.data.value[0].Customer);
    //       localStorage.setItem('User', response.data.value[0].User);
    //       localStorage.setItem('Customer_logo', response.data.value[0].Logo);
    //       console.log(response.data)
    //       //localStorage.setItem('data', JSON.stringify(listOrder.data.value[0]));
    //       this.setAuthenticated(true);
    //     } else {
    //       console.error('Credenciales incorrectas.');
    //       // Si las credenciales son incorrectas o la respuesta no contiene datos válidos, establecer isAuthenticated como false
    //       this.setAuthenticated(false);
    //     }
  
    //   } catch (error) {
    //     console.error('Error de inicio de sesión:', error);
    //     // Si hay un error, también establecer isAuthenticated como false
    //     this.setAuthenticated(false);
    //   }
    //   // Lógica adicional de inicio de sesión
    // },
    async login(username: string, password: string): Promise<void> {
  try {
    const value = username;

    // Validaciones
    const usernameRegex = /^[a-zA-Z0-9 ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let filter = '';

    if (emailRegex.test(value)) {
      // Si es correo electrónico, filtrar por email
      filter = `email eq '${value}' and pass eq '${password}'`;
    } else if (usernameRegex.test(value)) {
      // Si es nombre de usuario con espacios, filtrar por user
      filter = `user eq '${value}' and pass eq '${password}'`;
    } else {
      console.error('Usuario inválido');
      this.setAuthenticated(false);
      return;
    }

    const encodedFilter = encodeURIComponent(filter);
    const response: any = await callApi(`RG35Login?tenant=nutris&$filter=${encodedFilter}`);

    if (response.data && Array.isArray(response.data.value) && response.data.value.length > 0) {
      localStorage.setItem('name', response.data.value[0].Name);
      localStorage.setItem('token', response.data.value[0].Name);
      localStorage.setItem('No_', response.data.value[0].Customer);
      localStorage.setItem('User', response.data.value[0].User);
      localStorage.setItem('Customer_logo', response.data.value[0].Logo);
      this.setAuthenticated(true);
    } else {
      console.error('Credenciales incorrectas.');
      this.setAuthenticated(false);
    }
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    this.setAuthenticated(false);
  }
},
    logout(): void {
      this.setAuthenticated(false); // Cierra la sesión
      // Limpiar el token almacenado
      localStorage.removeItem('token'); // Elimina el token
      localStorage.removeItem('name');
      localStorage.removeItem('No_');
      localStorage.removeItem('User');
      localStorage.removeItem('Customer_logo');
      localStorage.removeItem('data');
    },
    // Definir mutación para actualizar el estado isAuthenticated
    setAuthenticated(isAuthenticated: boolean) {
      this.$patch({ isAuthenticated }); // Actualiza el estado isAuthenticated
    }
  },
});

