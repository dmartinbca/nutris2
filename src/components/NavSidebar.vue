<template>
    <header>
        <div v-if="$route.path !== '/'" class="sidebar">
            <div class="content-sidebar">
                <div class="">
                    <RouterLink to="/home">
                        <div class="logo"><img alt="nutris logo" class="w-75" src="/logonutris.svg" /></div>
                    
                    </RouterLink>
                    <div class="icon-back" v-if="$route.path !== '/home'" @click="$router.go(-1)">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="32" fill="#2F5496"/>
                            <path d="M47 32.126H18.608M25.7061 23L17.297 31.409C16.901 31.805 16.901 32.447 17.297 32.843L25.7061 41.252" stroke="white" stroke-width="2.3" stroke-linecap="round"/>
                        </svg>
                        <!-- <img class="icon-back-hover" src="/iconbuttons/arrow-back-nav-hover.svg" alt="arrow back"> -->
                    </div>
                    <div class="nav-container ">
                        <nav class=" font-20">
                            <RouterLink to="/home"><div class="navgrid"><img src="/menu/feamehome.svg" alt="home"> <span class=" font-20">{{$t("NavBar.Home")}}</span></div></RouterLink>
                            <RouterLink to="/your-products" :class="{ 'router-link-active': isProductRoute }"><div class="navgrid"><img src="/menu/yourproducts.svg" alt="your-products"> <span class=" font-20">{{$t("NavBar.YourProducts")}}</span></div></RouterLink>
                            <RouterLink to="/customize"><div class="navgrid"><img src="/menu/customize.svg" alt="customize"> <span class=" font-20">{{$t("NavBar.Customize")}}</span></div></RouterLink>
                            <!-- <RouterLink to="/your-order"><div class="navgrid"><img src="/menu/yourorder.svg" alt="your-order"> <span class=" font-20">{{$t("NavBar.YourOrder")}}</span></div></RouterLink> -->
                        </nav>
                    </div>
                    <hr class="lineb">
                
                </div>
                <div class="perfil-container">
                    <div class="avatar-container">
                        <img :src="logo" alt="" v-if="logo" class="avatar">
                        <div class="text-titles">
                            <h2>{{ userName }}</h2>
                        </div>
                        
                    </div>
                    <div class="icons-acount" style="position: relative;">
                        <!-- Botón de Logout -->
                        <img @click="showLogoutModal" src="/menu/exit.svg" alt="exit">

                        <!-- Tooltip -->
                        <div v-if="isTooltipVisible" class="tooltip-custom bg-white p-1" style="position: absolute; top: -150px; left: 10px;">
                            <p class="text-center">{{ $t("NavBar.Needhelp") }}</p>
                        </div>

                        <!-- Icono de ayuda -->
                        <img src="/menu/interrogacion.png" alt="config" style="width: 25px;" @mouseover="showTooltip" @mouseleave="hideTooltip">

                        <!-- Icono de perfil -->
                        <img src="/menu/perfil.svg" alt="perfil">
                    </div>
                </div>

                <!-- Modal de Confirmación -->
                <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="logoutModalLabel">{{ $t("NavBar.Confirm") }}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p class="text-center">
                                    {{ $t("NavBar.logout") }}
                                </p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("NavBar.Cancel") }}</button>
                                <button type="button" class="btn btn-danger" @click.prevent.stop="logout">{{ $t("NavBar.SignOut") }}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </header>

</template>

<script>
import { useAuthStore } from '@/stores/modules/auth';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { Modal } from 'bootstrap';

export default {
    name: 'NavSidebar',
    setup() {
        const userName = localStorage.getItem('name');
        const logo = `data:image/png;base64,${localStorage.getItem('Customer_logo')}`;
        const authStore = useAuthStore();
        const router = useRouter();
        const isAuthenticated = computed(() => authStore.isAuthenticated);
        const isTooltipVisible = ref(false);
        
        // Computed property para detectar si estamos en una ruta de producto
        const isProductRoute = computed(() => {
            return router.currentRoute.value.path.startsWith('/customize-edit/');
        });

        // Función para mostrar el modal
        const showLogoutModal = () => {
            const modalElement = document.getElementById('logoutModal');
            const modal = new Modal(modalElement);
            modal.show();
        };

        // Función para cerrar sesión
        const logout = async () => {
            const modalElement = document.getElementById('logoutModal');
            if (modalElement) {
                const modal = Modal.getInstance(modalElement); // Get modal instance
                if (modal) {
                    modal.hide(); // Hide the modal
                }
            }
            await authStore.logout();
            localStorage.removeItem('token'); // Elimina el token de autenticación del almacenamiento local
            router.push('/');
            // Cerrar el modal programáticamente
        
        };

        const showTooltip = () => {
            isTooltipVisible.value = true;
        };

        const hideTooltip = () => {
            isTooltipVisible.value = false;
        };

        return {
            isAuthenticated,
            logout,
            userName,
            logo,
            isTooltipVisible,
            showTooltip,
            hideTooltip,
            showLogoutModal,
            isProductRoute,
        };
    },
};
</script>


<style scoped>

.icon-back {
    /* width: 64px; */
    height: 64px;
    position: relative;
    /* top: 145px; */
    right: -35px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    z-index: 999;
    display: flex;
    justify-content: end;
    width: 100%;
}


.icon-back:hover svg circle{
    fill: white !important;
    stroke: white;
    transition: all 0.3s ease-in-out;
    stroke: white;
}

.icon-back:hover svg  path{
    stroke: var(--textButton) !important;
    transition: all 0.3s ease-in-out;

}

.nav-container nav a:nth-child(4){
    color: var(--stripes);
}

img{
    display: block;
    margin: auto;
}

    svg{
        color: var(--blackBlue);
    }

    .sidebar {
        position: relative;
        height: 100%;
        background-color: var(--menu);
        padding: 0;
        /* width: 300px; */
    }

    .content-sidebar {
        width: 95%;
        height: 100%;
        /* max-height: 1080px; */
        margin: auto;
        /* padding: 1rem; */
        /* display: grid;
        grid-template-areas:
            "a"
            "a"
            "a";
        grid-template-rows: 150px 270px 30px auto;
        align-items: end; */
        display: flex ;
        flex-direction: column;
        justify-content: space-between;
    }

    /* header {
        grid-column: 1;
        line-height: 1.5;
        max-height: 100%;
        width: 100%;
        z-index: 1;
    } */

    .logo {
        padding: 1rem;
        margin: 25px 0;
    }

    .logo img {
        display: block;
    }

    .navgrid{
        display: grid;
        grid-template-columns: 20px auto;
        gap: 0.69rem;
        align-items: center;
    }

    /*.notificationgrid{
        display: grid;
        grid-template-columns: 12% 75% 12%;
        align-items: center;
    }*/

    nav {
        width: 100%;
    }

    nav a.router-link-exact-active,
    nav a.router-link-active {
        background-color: var(--sectionSuperior);
        font-weight: 700;
        border-radius: 30px;
        padding: 10px 20px;
    }

    nav a {
        display: block;
        margin: 20px 0;
        padding: 0 1rem;
        text-decoration: none;
        font-size: 1.125rem;
        font-weight: 300;
        text-align: left;
        color: var(--textButton);
    }

    .line-b{
        margin-top: 34px;
        border-top: 1px dashed var(--textButton);
    }

        /*.notification a{
            display: block;
            margin: 20px 0;
            padding: 0 1rem;
            text-decoration: none;
            font-size: 18px;
            font-weight: 900;
            text-align: left;
            color: var(--textButton);
        }*/

    nav a:first-of-type {
        border: 0;
    }

    .icons-acount{
        display: grid;
        justify-content: space-evenly;
        grid-template-columns: 20px 20px 20px;
        border-top: solid 1px var(--icon);
        padding: 1.57rem;
    }

    .icons-acount img{
        cursor: pointer;
    }

    .avatar-container{
        width: 90%;
        /* height: 150px; */
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        padding: 15px;
        margin-bottom: 10px;
    }

    .avatar-container img {
        width: 85px;
    }

    .avatar{
        width: 100%;
    }

    .text-titles{
        text-align: center;
    }

    .text-titles h2{
        font-weight: 700;
        font-size: 14px;
        margin: 12px 0 0;
    }

    .text-titles p{
        font-weight: 300;
        font-size: 12px;
    }

    @media (max-width: 1280px) {
        nav a {
            font-size: 1rem;
        }

        .text-titles h2{
            font-size: 1rem !important;
        }

        .avatar-container img {
            width: 60px !important;
        }
    }

</style>