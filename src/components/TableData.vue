<script setup lang="ts">
    import { ref } from 'vue';
    import router from '@/router/index';

    const props = defineProps({
        title: {
            type: Array<string>,
            default: () => [],
        },

        buttonText: {
            type: String,
            default: 'text',
        },

        url: {
            type: String,
            default: "/iconbuttons/arrow-right-order.svg",
        },

        btnUrl: {
            type: String,
            default: "#",
        },

        data: {
            type: Array<any>,
            default: () => [],

        },

        codes: {
            type: Array<any>,
            default: () => [],
        }

    });

    const navRoute = (btnUrl :string, id :string|null = null)=>{
        router.push(btnUrl + id);
    }
    //console.log(props.codes)

    const search = ref('');
    let listSearch: any = ref([]);
    let listProducts: any = props.data;
    listSearch.value = listProducts;

    const submitSearch = () => {

        //console.log(search.value);

        const lisMapElm = listProducts.map((item: any) => {
            return item.filter((elm: any) => elm.toLowerCase().includes(search.value.toLowerCase()));
        });

        //console.log({ lisMapElm });

        const listFilter = lisMapElm.map((res: any) => {
            return listProducts.filter((item: any) => item.includes(res[0]));
        }).flat();
        if(listFilter.length <= listProducts.length) {
            //console.log({listFilter})
            listSearch.value = listFilter
           // console.log('listSearch', listSearch.value);
        }
    }
</script>
<template>
    <div class="search-container">
        
        <form class="search-form-grid" @submit.prevent="submitSearch">
            <input class="search-field" type="text" v-model="search" name="search" placeholder=" ">
            <input class="search-btn" type="submit" value=" ">
        </form>
        <!-- <img src="/iconbuttons/filter-icon.svg" alt="filter" class="search-btn-filter"> -->
    </div>
    <div class="table-container">
        <table v-if="listSearch.length > 0">
            <thead>
                <tr>
                    <th v-for="n in props.title.length" :key="n">
                        <p v-if="$route.path == '/customize'">{{$t(`TableCustomize[${n - 1}]`)}}</p>
                        <p v-if="$route.path == '/your-products'">{{$t(`TableProducts[${n - 1}]`)}}</p>
                        <p v-if="$route.path == '/your-order'">{{$t(`TableOrders[${n - 1}]`)}}</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="dataT in listSearch.length" :key="dataT" :id="`item-pagination-${dataT}`">
                    <td v-for="n in props.title.length" :key="n">
                        <p v-if="$route.path == '/customize'">{{ listSearch[dataT - 1].filter((dataP:any)=> dataP[n - 1] !== '%')[n - 1]}}</p> 
                        <!-- <p v-if="n ==  4 && $route.path == '/customize'" class= "progress-bar-customize">{{ listSearch[dataT - 1][n - 1]}}</p> -->
                        <p v-if="$route.path != '/customize'">{{ listSearch[dataT - 1][n - 1]}}</p>
                    </td>
                    <td><button @click="navRoute(btnUrl,props.codes[dataT - 1])" class="order-btn" type="button">
                            <span v-if="$route.path == '/customize'">{{ $t("ButtonCustomize") }}</span> 
                            <span v-if="$route.path == '/your-products'">{{ $t("ButtonProducts") }}</span> 
                            <span v-if="$route.path == '/your-order'">{{ $t("ButtonOrders") }}</span> 
                            <img :src= url alt="arrow-right">
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else class="empty-container">
            <div class="empty-content">
                <img src="/public/img/empty-table.svg" alt="empty">
                <h2>There are no products yet</h2>
                <p>Contact us and start designing!</p>
            </div>
        </div>
    </div>
    <div class="bar-pag-nav-container">
        <div class="bar-pag-nav-content">
            <div class="num-pag">
                <p>1-8 of 8</p>
            </div>
            <div class="controller-nav-pag">
                <div class="arrow-nav">
                    <img src="/iconbuttons/arrow-back.svg" alt="back">
                    <img src="/iconbuttons/arrow-next.svg" alt="next">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('/src/assets/css/tabledata.css');
</style>
