<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
    colorCover: {
        type: String,
        default: () => '',
    },
});
const color = ref(props.colorCover)

//console.log(color)




</script>

<template>
    <div class="" style="width:190px; height:200px">

 

    </div>
</template>