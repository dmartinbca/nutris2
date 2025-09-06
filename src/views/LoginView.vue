<template>
  <div class="main-content" id="login">
    <LoginForm/>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from '@/components/users/LoginForm.vue';
</script>

<style scoped>
  .main-content, #login {
      position: absolute;
      padding: 0 !important;
      margin:0 !important;

  }
</style>
