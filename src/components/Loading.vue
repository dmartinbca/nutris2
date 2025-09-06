<script lang="ts">

export default {
    data() {
      return {
        isLoading: true,
      };
    },
    methods: {
      showLoading() {
        this.isLoading = true;
      },
      hideLoading() {
        this.isLoading = false;
      },
    },
  };
</script>
<template>
    <!-- <div  class="loading-overlay">
      <div class="spinner"></div>
    </div> -->
  <div class="loading-overlay">
    <img  class="loading-image" src="/logonutris.svg" alt="Cargando...">
    <!-- El resto de tu contenido -->
  </div>
</template>
<style scoped>
  .loading-image {
    animation: pulse 1.5s infinite ease-in-out;
    display: block; /* Asegura que la imagen se muestre */
    margin: 0 auto; /* Centrar la imagen horizontalmente */
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--textButton);
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999;
  }
    /* @import url('/src/assets/css/loading.css'); */
</style>