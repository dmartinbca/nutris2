<script  setup lang="ts">

    import { ref } from 'vue';
    import Loading from '../../Loading.vue';
    import callApiPost from '@/helper/callApiPost';
    import { useI18n } from 'vue-i18n'
    import * as bootstrap from 'bootstrap';

    const props = defineProps({
        codeRG35: {
            type: String,
            default: () => "",
        },

        typeImage: {
            type: String,
            default: () => "",
        },

        ImageBoxLabel: {
            type: String,
            default: () => "",
        }
    })

    const emit = defineEmits(['box-label-updated']);

    const codeRG35 = ref(props.codeRG35)
    const typeImage = ref(props.typeImage)
    const isLoading = ref(false); // Add isLoading ref
    const previewImage = ref<string | null>(null);
    const fileInputBoxLabel = ref<HTMLInputElement | null>(null);
    const base64Data = ref<string | null>(null);
    const ImageBoxLabel = ref(props.ImageBoxLabel);
    const { t } = useI18n();
    
    const handleFileUpload = (event: Event) => {
    
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
            if (e.target?.result) {
                previewImage.value = e.target.result as string;
                base64Data.value = (e.target.result as string).split(',')[1]; // Extraer solo el base64
            }
            };
            
            reader.readAsDataURL(file);
        } else {
            previewImage.value = null;
            base64Data.value = null;
            alert(t("Pleaseselectavalidimagefile"));
        }
    };


    async function BoxLabelImagen(event : Event) {
        event.preventDefault()
        isLoading.value = true;
        const data = {
            numeroRG : codeRG35.value as string,
            tipoImagen :'Box_label_imagen',
            imagenBase64: base64Data.value as string
        }

        try {
            const response = await callApiPost(`modificarImagen(1)/Microsoft.NAV.modificarCab`, data);
            
            if (response) {
                console.log('Datos actualizados:', response);

                // Close the modal programmatically
                const modal = document.getElementById('BoxLabelImagen');
                if (modal) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }

                // Emit event to parent component with the updated data
                // Include the base64 data that was just uploaded
                const updatedResponse = {
                    ...response,
                    Box_label_imagen: base64Data.value
                };
                emit('box-label-updated', updatedResponse);
            } else {
                console.error('Error en la respuesta de la API:', response);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error); 
        }finally {
            isLoading.value = false
        }
    }
</script>
<template>
    <Loading v-if="isLoading"></Loading>
    <div v-else class="modal fade" id="BoxLabelImagen" tabindex="-1" aria-labelledby="BoxLabelImagenlabel" aria-hidden="true">
    <div class="upload-modal-container  modal-dialog modal-content">
        <div class="modal-body">
            <div>
                <button 
                    class="oculto-derecha" 
                    data-bs-dismiss="modal"
                >x</button>
            </div>
            <div class="title-upload">
                <h2 class="font-24 MuseoSemiBold">{{ $t('Wouldyoulike')}}</h2>
                
            </div>
            <div class="upload-content-btn">
                <!-- Input de archivo oculto y área de drop -->
                <input 
                    type="file" 
                    ref="fileInputBoxLabel"
                    accept="image/*"
                    @change="handleFileUpload"
                    class="visually-hidden"
                    id="fileInputBoxLabel"
                >
                
                <!-- Área de preview y upload -->
                <label for="fileInputBoxLabel" class="upload-content-btn2 ">
                    <div v-if="!previewImage" class="img-btn-upload">
                    <img src="/iconbuttons/upload-icon.svg" alt="Upload icon">
                    </div>
                    <div v-else class="preview-container w-100 h-100 overflow-hidden">
                        <img :src="previewImage" alt="Preview" class="preview-image w-100 h-100 object-fit-contain">
                    </div>
                    
                    <div class="paragraph-upload">
                        <p class="font-10 RalewayLight" v-if="!previewImage">{{ $t('Uploadadocument')}}</p>
                    </div>

                    
                </label>
                <div class="text-center">
                    {{ $t("Acceptedfileformat") }}
                </div>
                <button 
                    class="btn-save-atr-upload font-20 RalewayRegular" 
                    @click="BoxLabelImagen"
                    :disabled="!previewImage || isLoading"
                >
                    <Loading v-if="isLoading" />
                    <span v-else>{{$t('Upload')}}</span>
                </button>
            </div>
            <!--<button class="btn-cancel-atr close" data-dismiss="modal" aria-label="Close">Cancel</button>-->
        </div>
    </div>
    </div>
</template>
<style scoped>
    .oculto-derecha {
        position: absolute;
        right: 10px;
        top: -50px;
        cursor: pointer; /* Mantener puntero interactivo */
        background: transparent;
        border: 0;
        font-size: 1.5rem;
    }

    .upload-modal-container{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 689px;
        height: 470px;
        background-color: var(--sectionSuperior);
        padding: 4.3rem 0;
        margin: auto;
        border-radius: 15px;
        box-shadow: 1px 3px 20px -2px #00000021;
        overflow: hidden;
        border: none;
    }

    .paragraph-upload {
        margin: 0.945rem 0;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.8em;
        color: var(--textButton);
    }

    .title-upload h2 {
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

    .btn-save-atr-upload{
        display: block;
        border: solid 1px var(--textButton);
        border-radius: 30px;
        background-color: var(--textButton);
        line-height: 1rem;
        font-size: 1.44em;
        padding: 1.44rem 1.57rem;
        color: #fff;
        margin: 1rem auto 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-save-atr-upload:hover {
        color: var(--textButton);
        background: white ;
        transition: all 0.3s ease;
        
    }

    .upload-content-btn {
        width: 395px;
        height: 170px;
        margin: 40px auto 0;
        border: dotted 1px var(--textNotFeatured);
    }

    .upload-content-btn2 {
        width: 395px;
        height: 200px;
        margin: auto ;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .cambiar{
        position: absolute;
        top: 0;
        right: 15px;
        z-index: 10;
        background: white;
        padding: 10px;
        border-radius: 5px;
    }


    .upload-content-btn img{
        display: block;
        /* margin: 54px auto 0; */
        cursor: pointer;
    }
</style>