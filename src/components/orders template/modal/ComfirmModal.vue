<script setup lang="ts">
  import callApiPatch from '@/helper/callApiPatch';
  import { ref , watch, onMounted  } from 'vue';
  import Loading from '../../Loading.vue';

  const props = defineProps({
    codeRG35: {
      type: String,
      default: () => "",
    },
    Status: {
      type: String,
      default: () => 'Desarrollo',
    },

    RG37 : {
        type: String,
        default: () => ''
    },

    isModalVisible: { type: Boolean, required: true }, // ✅ required: true

    Pallet_comments : {
        type : String,
        default: () => ''
    }

  })
    const id = ref(props.codeRG35)
    const isLoading = ref(false); // Add isLoading ref
    const emit = defineEmits(['update:isModalVisible', 'confirm']);

    async function closeClient (event : Event) {
        event.preventDefault();
        isLoading.value = true;
        const data = {
            Status : "Cerrado cliente",
           // Pallet_comments : props.Pallet_comments
            //Status : "Desarrollo"
        }
        try {
            const response = await callApiPatch(`CustomizeRG35('${id.value}')`, data);
            if (response) {
                console.log('Datos actualizados:', response);
               
            } else {
                console.error('Error en la respuesta de la API:', response);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error); 
        } finally {
            isLoading.value = false;
            emit('update:isModalVisible', false); // Cierra este modal
            emit('confirm'); // Notifica al padre para abrir el segundo modal
        }
    }


</script>
<template>
    <Loading v-if="isLoading" />
    <div v-else class="modal fade modal-overlay" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="confirm-modal-container  modal-dialog modal-content width855 height571">
            <div class="modal-body">
                <div class="img-confirm">
                    <img class="width80" src="/img/icon-confirm.svg" alt="">
                </div>
                
                <div  class="paragraph-confirm font-24">
                    <!-- <span>{{ $t("modalConfirm.Uponconfirmation") }}</span> 
                    <span>{{ $t('modalConfirm.everythingiscorrect') }}</span> 
                    <span>{{ $t('modalConfirm.specificationsheet') }} </span> 
                    <span>{{ $t('modalConfirm.oncesigned') }} </span> -->

                    <span>{{ $t("modalConfirm.text") }}</span>
                </div>

                <button class="btn-save-atr-confirm RalewayRegular font-20" @click="closeClient">{{ $t("modalConfirm.Confirmandsign") }}</button>
                <button class="btn-cancel-atr RalewayRegular font-20 close" data-bs-dismiss="modal" aria-label="Close">{{ $t('NavBar.Cancel') }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>

.modal {
    border: none;
}

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #DEE6F38C; /* Color con transparencia (8C = 55% de opacidad) */
        z-index: 999;
        backdrop-filter: blur(2px); /* Opcional: Efecto de desenfoque */
    }

    .confirm-modal-container{
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
        border: none ;
    }

    .modal.show .modal-dialog {
        padding: 2.064rem;
    }

    .img-confirm img{
        display: block;
        margin: auto;
    }

    .paragraph-confirm {
        margin: 2.82rem 0;
        text-align: center;
      /*  line-height:normal;*/
        font-size: 1.13em;
        color: #000;
    }

    .btn-cancel-atr{
        display: block;
        background-color: transparent;
        color: var(--textButton);
        font-size: 1.44em;
        margin: 1rem auto;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 1rem 1.57rem;
        border-radius: 30px;
        /* border : 1px solid var(--textButton); */
        border:none;
    }

     .btn-cancel-atr:hover {
        color: var(--textButton);
        background: white ;
        border : 1px solid var(--textButton);
        transition: all 0.3s ease;
    }

    .btn-save-atr-confirm{
        display: block;
        border: solid 1px var(--textButton);
        border-radius: 30px;
        background-color: var(--textButton);
        line-height: 1rem;
        font-size: 1.44em;
        padding: 1.44rem 1.57rem;
        color: #fff;
        margin: 3rem auto 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-save-atr-confirm:hover {
        color: var(--textButton);
        background: white ;
        transition: all 0.3s ease;
        
    }
</style>