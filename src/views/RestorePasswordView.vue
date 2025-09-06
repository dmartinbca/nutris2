
<template>
    <div class="fondo">
        <div class="container-fluid d-flex align-items-center justify-content-center">
        
            <div v-if="emailSent" class="confirmation-message">
            
                <div class="card shadow-sm form-container px-4">
                    <div class="card-body">
                        <!-- Formulario de recuperación de contraseña -->
                        <div class="d-flex flex-column justify-content-evenly h-100">
                            <div>
                                <RouterLink to="/">
                                    <img src="/img/arrow.png" alt="" srcset="">
                                </RouterLink>
                            </div>
                            <div class="mb-3 flex-column  d-flex align-items-center d-flex justify-content-center">
                                <h2 class="text-center">The email was sent successfully</h2>
                                <p>An email was sent to <span class="fw-bold">{{ emailOrPhoneNumber }}</span></p>
                                <div class="d-flex justify-content-center mt-5">
                                    <button type="submit" class="btn a">Resend email</button>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="card shadow-sm form-container px-4">
                    <div class="card-body">
                        <!-- Formulario de recuperación de contraseña -->
                        <div class="d-flex flex-column justify-content-evenly h-100">
                            <div>
                                <RouterLink to="/">
                                    <img src="/img/arrow.png" alt="" srcset="">
                                </RouterLink>
                            </div>

                            <div class="mb-3 flex-column  d-flex align-items-center d-flex justify-content-center">
                                <h2 class="mb-5">{{$t('message.Restore password')}}</h2>
                                <!-- <p>{{$t('message.Enter your email or phone number')}}</p> -->
                                <!-- <form @submit.prevent="handleSubmit" class="px-sm-5 mx-5 w-75">
                                    <div class="mb-3" :class="{ 'has-error': showError && (!isInputValid) }">
                                        <input type="text" class="form-control" id="emailOrPhoneNumber" v-model.trim="emailOrPhoneNumber" :placeholder="$t('message.Email or phone number')" @input="validateFields">
                                        <span v-if="showError && (!isInputValid)" class="error-message">{{$t('message.Please enter a valid email or phone number')}}</span>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <button type="submit" class="button-color">{{$t('message.Restore')}}</button>
                                    </div>
                                </form> -->
                                <p class="text-center">{{ $t("NavBar.Needhelp") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        const emailOrPhoneNumber = ref('');
        const showError = ref(false);
        const emailSent = ref(false); // Variable para controlar si se envió el correo electrónico

        // Expresión regular para validar tanto el correo electrónico como el número de teléfono
        const isInputValid = computed(() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?\d{1,3}\d{9}$/; // Permite un código de país opcional y 9 dígitos de número de teléfono
            return emailRegex.test(emailOrPhoneNumber.value) || phoneRegex.test(emailOrPhoneNumber.value);
        });

        const handleSubmit = async () => {
            showError.value = true; // Mostrar errores al enviar el formulario

            // Validar si el campo está vacío
            if (!emailOrPhoneNumber.value.trim()) {
                return; // No enviar el formulario si el campo está vacío
            }

            // Validar si el campo no tiene el formato correcto de correo electrónico o número de teléfono
            if (!isInputValid.value) {
                return; // No enviar el formulario si el campo no tiene el formato correcto
            }

            // Simulación de envío de correo electrónico (aquí deberías implementar la lógica real)
            const emailSentSuccessfully = await sendRecoveryEmail(emailOrPhoneNumber.value);

            if (emailSentSuccessfully) {
                emailSent.value = true; // Marcar como verdadero si el correo se envió correctamente
            }
        };

        const validateFields = () => {
            showError.value = false; // Ocultar el mensaje de error mientras el usuario escribe
        };

        return {
            emailOrPhoneNumber,
            handleSubmit,
            validateFields,
            showError,
            emailSent,
            isInputValid
        };
    }
};

async function sendRecoveryEmail(emailOrPhoneNumber) {
    // Aquí iría tu lógica para enviar el correo electrónico de recuperación
    // Retorna true si el correo se envió correctamente, false si hubo algún problema
    // Esto es solo una simulación
    return new Promise(resolve => {
        // Simulación de un tiempo de espera para enviar el correo
        setTimeout(() => {
            resolve(true); // Supongamos que el correo se envió correctamente después de 2 segundos
        }, 2000);
    });
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
    /*.form-container {
        width: 30rem;
        height: 35rem;

    }*/
    input {
        background: #F9F4FB;
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