<template>
  <div v-if="show" class="filter-dropdown" ref="dropdownRef">
    <div class="filter-arrow"></div>
    <div class="filter-modal">
      <h3 class="filter-title">{{$t('Filter')}}</h3>
      <div class="filter-fields">
        <label>
          {{$t('container')}}
          <select v-model="localContainer" class="form-select">
            <option value="">{{$t('All')}}</option>
            <option v-for="option in containerOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>
        <label v-if="statusOptions">
          {{$t('Status')}}
          <select v-model="localStatus" class="form-select">
            <option value="">{{$t('All')}}</option>
            <option v-for="option in statusOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>
      </div>
      <div class="filter-actions">
        <button @click="applyFilters" class="btn btn-primary">{{$t('Apply')}}</button>
        <button @click="clearFilters" class="btn btn-secondary">{{$t('Clear')}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue';
export default defineComponent({
  name: 'FilterModal',
  props: {
    show: { type: Boolean, required: true },
    containerOptions: { type: Array as () => string[], required: true },
    statusOptions: { type: Array as () => string[], required: false },
    modelValue: { type: Object as () => { container: string; status: string }, required: true }
  },
  emits: ['update:modelValue', 'apply', 'clear', 'close'],
  setup(props, { emit }) {
    const localContainer = ref(props.modelValue.container || '');
    const localStatus = ref(props.modelValue.status || '');
    const dropdownRef = ref<HTMLElement | null>(null);

    watch(() => props.modelValue, (val) => {
      localContainer.value = val.container || '';
      localStatus.value = val.status || '';
    });

    function applyFilters() {
      emit('update:modelValue', { container: localContainer.value, status: localStatus.value });
      emit('apply');
      emit('close');
    }
    function clearFilters() {
      localContainer.value = '';
      localStatus.value = '';
      emit('update:modelValue', { container: '', status: '' });
      emit('clear');
      emit('close');
    }
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        emit('close');
      }
    }
    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
    return { localContainer, localStatus, applyFilters, clearFilters, dropdownRef };
  }
});
</script>

<style scoped>
.filter-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  left: auto;
  transform: none;
  z-index: 1000;
  min-width: 260px;
  max-width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.filter-arrow {
  width: 18px;
  height: 10px;
  position: absolute;
  top: -10px;
  right: 32px; /* Ajusta este valor según el ancho del botón de filtro */
  z-index: 1001;
}
.filter-arrow::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 10px solid #fff;
}
.filter-modal {
  background: #fff;
  border-radius: 8px;
  padding: 24px 20px 16px 20px;
  min-width: 260px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
}
.filter-title {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
}
.filter-fields {
  display: flex;
  flex-direction: column;
}
.filter-fields label {
  display: block;
  margin-bottom: 12px;
}
/* Si solo hay un filtro, reduce el espacio inferior */
.filter-fields label:only-child {
  margin-bottom: 0;
}
.filter-fields select {
  width: 100%;
  margin-top: 4px;
  padding: 4px 8px;
}
.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
</style> 