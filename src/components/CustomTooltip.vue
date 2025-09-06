<template>
  <span class="tooltip-wrapper"
        @mouseenter="show"
        @mouseleave="hide"
        @touchstart.prevent="show"
        @touchend.prevent="hide"
        ref="wrapper">
    <slot />
    <span v-if="visible"
          class="custom-tooltip"
          :style="tooltipStyle"
          ref="tooltip">
      {{ text }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{ text: string }>();
const visible = ref(false);
const tooltipStyle = ref({});

const show = (event: Event) => {
  visible.value = true;
  setTimeout(() => {
    positionTooltip();
  }, 0);
};

const hide = () => {
  visible.value = false;
};

const wrapper = ref<HTMLElement | null>(null);
const tooltip = ref<HTMLElement | null>(null);

function positionTooltip() {
  if (!wrapper.value || !tooltip.value) return;
  const wrapperRect = wrapper.value.getBoundingClientRect();
  const tooltipRect = tooltip.value.getBoundingClientRect();

  let left = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
  let top = wrapperRect.bottom + 8;

  if (left + tooltipRect.width > window.innerWidth - 8) {
    left = window.innerWidth - tooltipRect.width - 8;
  }
  if (left < 8) left = 8;

  tooltipStyle.value = {
    left: left + 'px',
    top: top + 'px'
  };
}

function onResize() {
  if (visible.value) positionTooltip();
}
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
  position: relative;
}
.custom-tooltip {
  position: fixed;
  z-index: 9999;
  background: #222;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: pre-line;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  pointer-events: none;
  transition: opacity 0.15s;
  opacity: 1;
}
.custom-tooltip::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border: 0 solid transparent;
  border-bottom: 8px solid #222;
  border-width: 0 8px 8px 8px;
}
</style> 