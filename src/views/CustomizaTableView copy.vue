<script  lang="ts">
    import TableData from '@/components/TableData.vue';
    import Loading from '@/components/Loading.vue';
    import callApi from '@/helper/callApi';
    
    
    export default {
        components: {
            TableData, // Asegúrate de que el nombre coincida con el nombre del componente importado
            Loading
        },
        data() {
            return {
                listP : [],
                titles : ["Product name", "Container", "Units per container", "Status"],
                data: '',
                code_product : []
                
            };
        },
        async created() {
            try {
                    // const response: any = await callApi(`RG37?$expand=formulacionRG37&$filter=Customer_No eq '${localStorage.getItem('No_')}'`)
                    const response: any = await callApi(`CustomizeList?tenant=nutris&$filter=Customer eq '${localStorage.getItem('No_')}'`)
                    console.log(response.data.value)
                    if(response.data && Array.isArray(response.data.value) && response.data.value.length > 0) {
                        let items: any =[];
                        let code_product: any =[];
                        response.data.value.forEach((element: { Product_name: any; Container:any; Units_per_container:any; Code: any; Status:any; }) => {
                            items.push([element.Product_name, element.Container , element.Units_per_container +' units', element.Status]);
                            code_product.push([element.Code])
                        });
                        this.listP = items;
                        this.code_product = code_product;
                        console.log(this.code_product)
                    }
                } catch (error) {
                    console.log(error);
                }
        },
        methods: {},
    };


</script>

<template>
    <div class="main-content" id="table customize-table">
        
        <TableData 
            v-if="listP.length > 0"
            :title="titles" 
            :data="listP"
            :codes="code_product"
            buttonText="Customize" 
            url="/iconbuttons/arrow-right-order.svg" 
            btnUrl="/customize-edit/">
        </TableData>
        <Loading v-else />
    </div>
</template>