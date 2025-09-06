<script setup lang="ts">
  import callApiPatch from '@/helper/callApiPatch';
  import { ref } from 'vue';
  import Loading from '../../Loading.vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    codeRG35: {
      type: String,
      default: () => "",
    },
    Customer_accepted: {
      type: Boolean,
      default: () => false,
    },

    Tomar_muestra : {
        type: Boolean,
        default: () => false,
    },
    RG37 : {
        type: String,
        default: () => ''
    }

  })


    const rg37 = ref(props.RG37)
    const isLoading = ref(false); // Add isLoading ref
    const router = useRouter();


    async function acceptFormulation(event: Event){
        event.preventDefault();
        isLoading.value = true;
        const dataForFormulation = {
            Customer_accepted: true,
            Status: 'Cerrado cliente',
            // otras propiedades específicas para Formulation
        };

        // const dataForCustomizeRG35 = {
        //     Status: 'Cerrado cliente',
        // };

        try {
            // const [response1, response2] = await Promise.all([
            //     callApiPatch(`Formulation('${rg37.value}')`, dataForFormulation),
            //     callApiPatch(`CustomizeRG35('${id.value}')`, dataForCustomizeRG35)
            // ]);

            const [response1] = await Promise.all([
                callApiPatch(`CustomizeRG37('${rg37.value}')`, dataForFormulation),
            ]);

            if (response1) {
                console.log('Datos actualizados:', response1);
                router.push('/customize');
            } else {
                console.error('Error en la respuesta de la API:', response1);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            isLoading.value = false;
        }
    }
</script>
<template>
    <Loading v-if="isLoading" />
    <div v-else class="modal fade" id="approveModal" tabindex="-1" aria-labelledby="approveModalLabel" aria-hidden="true">
    <div class="approve-modal-container  modal-dialog modal-content">
        <div class="modal-body">
            <div class="title-approve">
                <h2>{{ $t("ApproveModal.Wouldyouliketoconfirmtheformula") }}</h2>
            </div>
            <div  class="paragraph-approve">
                <p>{{$t("ApproveModal.Weneedyourconfirmation")}}</p> 
                <p>{{ $t("ApproveModal.rememberthatonceconfirmed") }}</p> 
                <p>{{ $t("ApproveModal.makefurtheradjustments") }}</p> 
                <p>{{ $t("ApproveModal.finalizingtheproduct") }}</p>
            </div>

            <button class="btn-save-atr-approve" @click="acceptFormulation">{{ $t("ApproveModal.Aproveandconinuewiththedesign") }} </button>
            <button class="btn-cancel-atr close" data-bs-dismiss="modal" aria-label="Close">{{$t("NavBar.Cancel")}}</button>
        </div>
    </div>
    </div>
</template>
<style scoped>
    .approve-modal-container{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 689px;
        height: 460px;
        background-color: var(--sectionSuperior);
        padding: 4.3rem 0;
        margin: auto;
        border-radius: 15px;
        box-shadow: 1px 3px 20px -2px #00000021;
        overflow: hidden;
    }

    .paragraph-approve {
        margin: 2.82rem 0;
        text-align: center;
        line-height: 0.3rem;
        font-size: 1.13em;
        color: #000;
    }

    .title-approve h2 {
        text-align: center;
        font-weight: 700;
        color: #000;
        font-size: 1.51em;
    }

    .btn-cancel-atr{
        display: block;
        background-color: transparent;
        color: var(--textButton);
        border: none;
        font-size: 1.44em;
        margin: 1.19rem auto;
    }

    .btn-save-atr-approve{
        display: block;
        border: solid 1px var(--textButton);
        border-radius: 30px;
        background-color: var(--textButton);
        line-height: 1rem;
        font-size: 1.44em;
        padding: 1.44rem 1.57rem;
        color: #fff;
        margin: 4.28rem auto 0;
        transition: all 0.3s ease;
    }

    .btn-save-atr-approve:hover {
        color: var(--textButton);
        background: white ;
        transition: all 0.3s ease;
        
    }
</style>