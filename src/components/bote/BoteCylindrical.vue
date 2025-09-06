<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    colorBote: {
        type: String,
        default: () => '',
    },
});
const color = ref(props.colorBote)

//console.log(color)




</script>

<template>
    <div class="" style="width:190px;">

 


    </div>
</template>