<script lang="ts">
    import Loading from '@/components/Loading.vue';
    import callApi from '@/helper/callApi';
    import Empty from '@/components/EmptyContainer.vue';
    import FilterModal from '@/components/FilterModal.vue';
    import { useI18n } from 'vue-i18n'

    interface Product {
        Product_name: string;
        Container: string;
        Units_per_container: number; // O string, dependiendo de tu uso
        Status: string;
        Code: string;
    }
export default {
    components: {
        Loading,
        Empty,
        FilterModal
    },

    setup() {
    const { t } = useI18n();

        const titles = [
            t('code'),
            t('product_name'),
            t('container'),
            t('units_per_container'),
            t('status')
        ];  

        const containerOptions = [t('Bote'), t('Bulk')];
        const statusOptions = [t('Cerrado cliente'), t('Desarrollo'), t('Cerrado cliente y calidad')];

        return {
            titles,
            containerOptions,
            statusOptions
        };
    },
    data() {
      return {
        list : [] as Product[],
        // titles : ["Code","Product name", "Container", "Units per container", "Status"],
        url: '/iconbuttons/arrow-right-order.svg',
        search: '' ,
        isLoading : false,
        showFilterModal: false,
        filter: {
          container: '',
          status: ''
        }
      };
    },

    async created() {
        this.isLoading = true
        try
        { 
            //let datos = await callApi(`CustomizeList?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}' and Status eq 'desarrollo'`)
            // let datos = await callApi(`CustomizeList37?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}' and Status eq 'Desarrollo'`)
            // let datos = await callApi(`CustomizeList?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}' and Status eq 'Cerrado cliente'`)

            let datos1 = await callApi(`CustomizeList37?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}' and (Status eq 'Cerrado cliente' or Status eq 'Desarrollo' or Status eq 'Cerrado cliente y calidad') and Has_RG35 eq false`);
            let datos2 = await callApi(`CustomizeList?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}' and (Status eq 'Cerrado cliente' or Status eq 'Desarrollo')`);
           this.list = [...datos1.data.value, ...datos2.data.value].filter(
                item => !item.Has_RG35
            );
        }
        catch (error) { 
            console.error("Error:", error); 
        }finally {
            this.isLoading = false
        }
        
    },

    methods: {
        getStatusClass(status: string) {
            console.log(status)
            // Retorna la clase basada en el valor de status
            switch (status) {
                case 'Cerrado cliente y calidad':
                    return "status-finish"; // Clase para estado activo
                case 'Cerrado cliente':
                    return 'status-initial'; // Clase para estado inactivo
                case 'Desarrollo':
                    return 'status-develop'; // Clase para estado pendiente
                default:
                    return ''; // Sin clase si no coincide
            }
        },
        statusKey(status: string) {
            if (!status) return '';
            const key = status.trim();
            return this.$t(key) !== key ? this.$t(key) : status;
        },
        filteredList() {
            return this.list.filter(item => {
                const code = (item['Code'] || '').toString().toLowerCase();
                const productName = (item['Product_name'] || '').toString().toLowerCase();
                const container = this.$t(item['Container'] || '').toLowerCase();
                const units = (item['Units_per_container'] || '').toString().toLowerCase();
                const status = this.$t(item['Status'] || '').toLowerCase();
                const search = (this.search || '').toLowerCase();
                const matchesSearch = (
                    code.includes(search) ||
                    productName.includes(search) ||
                    container.includes(search) ||
                    units.includes(search) ||
                    status.includes(search)
                );
                const matchesContainer = this.filter.container ? item['Container'] === this.filter.container : true;
                const matchesStatus = this.filter.status ? item['Status'] === this.filter.status : true;
                return matchesSearch && matchesContainer && matchesStatus;
            });
        },
        openFilterModal() {
          this.showFilterModal = true;
        },
        closeFilterModal() {
          this.showFilterModal = false;
        },
        applyFilter() {
          this.showFilterModal = false;
        },
        clearFilter() {
          this.filter = { container: '', status: '' };
        }
    },
  };
</script>

<template>
    <Loading v-if="isLoading" />
    <div v-else>
        <div class="main-content"  id="table customize-table"  v-if="list.length > 0">
            <div class="search-container" style="position: relative;">
                <form class="search-form-grid" @submit.prevent>
                    <input class="search-field" type="text" v-model="search" name="search" :placeholder="$t('Search')+ '...'"><input class="search-btn" type="submit" value=" ">
                </form>
                <div class="filter-btn-wrapper" style="position: relative; display: inline-block;">
                  <img src="/iconbuttons/filter-icon.svg" alt="filter" class="search-btn-filter" @click="openFilterModal">
                  <FilterModal
                    :show="showFilterModal"
                    :containerOptions="containerOptions"
                    :statusOptions="statusOptions"
                    v-model="filter"
                    @apply="applyFilter"
                    @clear="clearFilter"
                    @close="closeFilterModal"
                  />
                </div>
            </div>
            <div class="table-container table-responsive" >
                <table class="customize " >
                    <thead>
                        <th class="MuseoSemiBold font-20 p-3">{{ $t('code') }}</th>
                        <th class="MuseoSemiBold font-20 p-3">{{ $t('product_name') }}</th>
                        <th class="MuseoSemiBold font-20 p-3">{{ $t('container') }}</th>
                        <th class="MuseoSemiBold font-20 p-3">{{ $t('units_per_container') }}</th>
                        <th class="MuseoSemiBold font-20 p-3">{{ $t('status') }}</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in filteredList()" :key="item['Code']" class="RalewayRegular font-16">
                            <td class="p-2"><p>{{ item['Code'] }}</p></td>
                            <td class="p-2" v-if="item['Product_name']"><p>{{ item['Product_name'] }}</p></td>
                            <td class="p-2" v-else><p>-</p></td>
                            <td class="p-2"><p>{{ item['Container'] }}</p></td>
                            <td class="p-2"><p>{{ item['Container'] === 'Bulk' && item['Units_per_container'] === 0 ? '-' : item['Units_per_container'] }}</p></td>
                            <td class="p-2"><p :class="getStatusClass(item['Status'])" class="text-center">{{ statusKey(item['Status']) }}</p></td>
                            <td class="p-2">
                                <router-link :to="`/customize-edit/${item['Code']}`" class="order-btn d-flex">
                                    <span>{{ $t("ButtonCustomize") }}</span> 
                                    <img :src= url alt="arrow-right">
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Empty v-else/>
    </div>
</template>
<style scoped>
    @import url('/src/assets/css/tabledata.css');
</style>