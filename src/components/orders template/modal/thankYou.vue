<script setup lang="ts">
const props = defineProps({
  isModalVisible: { type: Boolean, required: true }
});
const emit = defineEmits(['update:isModalVisible']);

function closeModal() {
  emit('update:isModalVisible', false);
}
</script>
<template>
    <div class="modal-overlay"  v-if="isModalVisible" >
    <div class="confirm-modal-container  modal-dialog modal-content width855 height571">
        <div class="modal-body padding-modal">
            <div class="img-confirm">
                <img class="width80" src="/img/bien.png" alt="">
            </div>
            
            <div  class="paragraph-confirm font-24">
                <span>{{ $t("ModalThankYou.Thankyou") }}</span> 
                <span>{{ $t('ModalThankYou.reviewing') }}</span> 
                <span>{{ $t('ModalThankYou.theproduct') }} </span> 
                <span>{{ $t('ModalThankYou.posible') }} </span>
            </div>
           
            <RouterLink to="/customize" class="RalewayRegular font-20 text-center d-flex justify-content-center text-decoretion-none color-a ">{{ $t('Returntoyourproductspage') }}</RouterLink>
            <!-- <button class="btn-cancel-atr RalewayRegular font-20 close" @Click="Redirect"></button> -->
        </div>
    </div>
    </div>
</template>
<style scoped>
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

    .padding-modal {
        padding: 3.125rem;
    }

    .color-a {
        color: var(--textButton);
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
        /*line-height:normal;*/
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