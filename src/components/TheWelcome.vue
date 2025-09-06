<script setup lang="ts">
  defineProps({
    title: {
      type: String,
    }
  })
</script>

<template>
  <h1>{{ title }}</h1>
</template>
