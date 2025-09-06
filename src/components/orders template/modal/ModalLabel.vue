<script setup lang="ts">
  import callApiPatch from '@/helper/callApiPatch';
  import { ref , watch, onMounted  } from 'vue';
  import Loading from '../../Loading.vue';
  import callApiPost from '@/helper/callApiPost';
  import { useI18n } from 'vue-i18n'
  import * as bootstrap from 'bootstrap';


  export interface optionMX {
    ID: number; // Adjust based on your actual data type
    Value: string;
    Imagen: string;
  }
  export interface optionLM {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }
  export interface optionC {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

  export interface optionF {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

   const props = defineProps({
    optionsSizeLabel: {
      type: Array as () => optionMX[],
      default: () => [],
    },
    optionsFinish: {
      type: Array as () => optionF[],
      default: () => [],
    },
    optionsLabelMaterial: {
      type: Array as () => optionLM[],
      default: () => [],
    },
    optionsColorLabel: {
      type: Array as () => optionC[],
      default: () => [],
    },
    selectedOptionLabels: {
      type: Object,
      default: () => {},
    },
    codeRG35: {
      type: String,
      default: () => "",
    },

    Final_imagen: {
      type: String,
      default: () => ""
    }
  });
  const selectedOptionLabels = ref(props.selectedOptionLabels);

  const downloadLink = ref('');
  const selectedImage = ref('');
  const isLoading = ref(false); // Add isLoading ref
  const codeRG35 = ref(props.codeRG35)
  const base64Data = ref<string | null>(null);
  const previewImage = ref<string | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);
  const { t } = useI18n();
  const pdfDownloadUrl = ref<string | null>(null);
  const emit = defineEmits(['label-options-updated', 'draft-label-updated']);


  function base64ToBlob(base64: string, mime = 'application/pdf'): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }

  async function fetchPdfOnSizeChange() {
    if (pdfDownloadUrl.value) {
      URL.revokeObjectURL(pdfDownloadUrl.value);
      pdfDownloadUrl.value = null;
    }

    const selectedValue = selectedOptionLabels.value.label_size;
    if (!selectedValue) {
      isLoading.value = false;
      return;
    }

    const data = { numeroTroquel: selectedValue };

    try {
      const response = await callApiPost(
        `troquelPDF(1)/Microsoft.NAV.Download`,
        data
      );
      if (response && response.data && response.data.value) {
        let base64 = response.data.value;
        // Si tiene prefijo, quítalo
        if (base64.startsWith('data:application/pdf;base64,')) {
          base64 = base64.replace('data:application/pdf;base64,', '');
        }
        // Elimina espacios y saltos de línea
        base64 = base64.replace(/\s/g, '');
        const blob = base64ToBlob(base64, 'application/pdf');
        pdfDownloadUrl.value = URL.createObjectURL(blob);
      
      } else {
        pdfDownloadUrl.value = null;
       
      }
    } catch (error) {
      
      pdfDownloadUrl.value = null;
    }
  }


  async function updateSelectedOption(event: Event){
    event.preventDefault();
    isLoading.value = true;
    const data = {
      Label_size: selectedOptionLabels.value.label_size,
      Label_material: selectedOptionLabels.value.label_material,
      Label_finish: selectedOptionLabels.value.label_finish,
      Label_Color: selectedOptionLabels.value.label_colors,
    };
    
    console.log('=== DEBUG: Modal updateSelectedOption ===');
    console.log('Data to send:', data);
    
    try {
      const response = await  callApiPatch(`CustomizeRG35('${props.codeRG35}')?$expand=Formulation,Recipe,Analytics&tenant=nutris`, data);
        if (response) {
            // Update local data instead of reloading the page
            console.log('Label options updated successfully:', response);
            console.log('Response type:', typeof response);
            console.log('Response keys:', Object.keys(response || {}));
            console.log('About to emit label-options-updated event');
            
            // Emit event to notify parent component
            // Send both the response and the data that was sent to the API
            const eventData = {
                response: response,
                sentData: data
            };
            emit('label-options-updated', eventData);
            
            console.log('Event emitted successfully');
            console.log('Event data sent:', eventData);
            
            // Add a longer delay to ensure the event is processed before closing the modal
            setTimeout(() => {
                // Close the modal
                const modal = document.getElementById('sidebarRightModal2');
                if (modal) {
                  const bootstrapModal = bootstrap.Modal.getInstance(modal);
                  if (bootstrapModal) {
                    bootstrapModal.hide();
                  }
                }
            }, 500);
        } else {
            console.error('Error en la respuesta de la API:', response);
        }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      isLoading.value = false; // Set isLoading to false at the end, regardless of success or failure
    }
  }

  async function updatedDrafLabel (event : Event)  {
    event.preventDefault()
    isLoading.value = true;

    const data = {
            numeroRG : codeRG35.value as string,
            tipoImagen :'Label_imagen',
            imagenBase64: base64Data.value as string
        }

        console.log('=== DEBUG: Modal updatedDrafLabel ===');
        console.log('Data to send:', data);

        try {
            const response = await callApiPost(`modificarImagen(1)/Microsoft.NAV.modificarCab`, data);
            if (response) {
                console.log('Draft label updated successfully:', response);
                console.log('Response type:', typeof response);
                console.log('Response keys:', Object.keys(response || {}));
                console.log('About to emit draft-label-updated event');

                // Update local data instead of reloading the page
                // Emit event to notify parent component
                emit('draft-label-updated', response);
                
                console.log('Event emitted successfully');
                console.log('Event data sent:', response);
                
                // Add a longer delay to ensure the event is processed before closing the modal
                setTimeout(() => {
                    // Close the modal
                    const modal = document.getElementById('sidebarRightModal2');
                    if (modal) {
                      const bootstrapModal = bootstrap.Modal.getInstance(modal);
                      if (bootstrapModal) {
                        bootstrapModal.hide();
                      }
                    }
                }, 500);
            } else {
                console.error('Error en la respuesta de la API:', response);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error); 
        }finally {
            isLoading.value = false
        }
  }

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

  function downloadImage() {
    // Crear un elemento <a> dinámicamente
    const link = document.createElement("a");
    // Prependemos el tipo MIME apropiado al Base64 (en este caso, imagen PNG)
    link.href = props.Final_imagen
    
    // Nombre del archivo descargado
    link.download = `Label-Imagen-${props.codeRG35}.png`;
 
    // Simular clic para iniciar la descarga
    link.click();
  }


  onMounted(() => {
    if (selectedOptionLabels.value.label_size) {
      fetchPdfOnSizeChange();
    }
  });

  watch(
    () => selectedOptionLabels.value.label_size,
    (newSize) => {
      if (newSize) {
        fetchPdfOnSizeChange();
      }
    },
    { immediate: true }
  );

</script>

<template>
    <!-- Modal -->
    <Loading v-if="isLoading" />
    <div v-else class="modal sidebar-right fade modal-overlay" id="sidebarRightModal2"  tabindex="-1" aria-labelledby="sidebarRightModal">
      <div class="modal-dialog modal-dialog-sidebar modal-dialog-right">
        <div class="modal-content">
          <div class="modal_header justify-content-end">
            <!-- <div class="percentage">
              <span class="percentage-value-default">100%</span>
            </div> -->
            <button type="button" class="b-close" data-bs-dismiss="modal">
              <img
                class="btn-close"
                aria-label="Close"
                src="/img/close-x.svg"
                alt=""
              />
            </button>
          </div>

          <div class="modal-body">
            <div class="modal-body_header">
              <h2 class="modal-title font-32 modal-container-title MuseoSemiBold mb-2">{{ $t("orderView.Label") }}</h2>
              <!-- <div class="modal-body_deadline">
                <span><img class="flag" src="/img/flag-1-icon.svg" alt="" /></span>
                <span>&nbsp; Deadline</span> <span><strong>&nbsp; 21/01/2024</strong></span>
                <span>&nbsp; (46 days)</span>
              </div> -->
            </div>

            <div class="tabs-inline">
              <section id="content1" class="content-bottle">
                <div class="parent-label">
                  <div class="child-bottles-form">
                    <h3 class="child-bottle-title_features font-24 RalewaySemiBold">{{$t("modalLabel.Characteristics")}}</h3>
                    <div class="child_content_features-bottle-form">
                      <div class="form-grup-input-field RalewayRegular">
                        <label class="form-group-label-size " for="size"
                          >{{ $t("modalLabel.Maximumsize") }}</label
                        >
                        <select
                          class="form-select-config font-16 Museo"
                          aria-label="Default select example"
                          v-model="selectedOptionLabels.label_size"
                          @change="fetchPdfOnSizeChange"
                          disabled
                        >
                          <option class="" v-for="optionMX in props.optionsSizeLabel" :key="optionMX.ID" :value="optionMX.Value">{{ optionMX.Value }}</option>

                        </select>
                      </div>
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{$t("modalContainer.Material")}}</label
                        >
                        <select
                          class="form-select-config Museo"
                          aria-label="Default select example"
                          v-model="selectedOptionLabels.label_material"
                        >
                          <option
                            v-for="optionLM in props.optionsLabelMaterial"
                            :key="optionLM.ID"
                            :value="optionLM.Value"
                          >
                            {{ optionLM.Value }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="child_content_features-bottle-form">
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{$t("modalLabel.Finish")}}</label
                        >
                        <select
                          class="form-select-config Museo"
                          aria-label="Default select example"
                          v-model="selectedOptionLabels.label_finish"
                        >
                          <option
                            v-for="optionF in props.optionsFinish"
                            :key="optionF.ID"
                            :value="optionF.Value"
                          >
                            {{ optionF.Value }}
                          </option>
                        </select>
                      </div>
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{$t("modalContainer.Color")}}</label
                        >
                        <select
                          class="form-select-config Museo"
                          aria-label="Default select example"
                          v-model="selectedOptionLabels.label_colors"
                        >
                          <option
                            v-for="optionC in props.optionsColorLabel"
                            :key="optionC.ID"
                            :value="optionC.Value"
                            
                          >
                            {{ optionC.Value }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="container-download-file">
                      <div class="container-download-file-button">
                       <!-- <span class="container-donload-file-text"
                          @click="pdfDownloadUrl"
                          v-if="pdfDownloadUrl"
                          style="cursor:pointer; display:inline-block;">
                          <img src="/img/arrow-d.svg" alt="download" /><br />
                          {{ $t("ModalLabel.Downloadsample") }}
                        </span> -->

                          <a
                            v-if="pdfDownloadUrl"
                            :href="pdfDownloadUrl"
                            :download="`troquel-${selectedOptionLabels.label_size}.pdf`"
                            class="container-donload-file-text"
                            style="cursor:pointer; display:inline-block;"
                            target="_blank"
                          >
                            <img src="/img/arrow-d.svg" alt="download" /><br />
                            {{ $t("ModalLabel.Downloadsample") }}
                          </a>
                      </div>
                    </div>
                  </div>
                  <div class="child_content_info-bottle-label">
                    <div class="chil_content_info_upload">
                      <span class="child_content-label-info-title font-24 RalewayMedium"
                        >{{ $t("ModalLabel.DraftLabel") }}
                      </span>
                      <div class="child_content-label-button">
                        <!-- <a class="child_content-label-button-upload" href=""
                          ></a> -->
                        <input 
                          type="file" 
                          ref="fileInput"
                          accept="image/*"
                          @change="handleFileUpload"
                          class=" visually-hidden child_content-label-button-upload"
                          id="fileInput"
                          placeholder=""
                        >
                      </div>
                       <!-- Área de preview y upload -->
                      <label for="fileInput" class="upload-content-btn2 ">
                          <div v-if="!previewImage" class="img-btn-upload">
                          <span class="child_content-label-button-upload font-20 RalewayBold" 
                          > {{ $t("ModalLabel.UploadDraftVersion") }}</span>
                          <span class="RalewayRegular font-20">{{$t("ModalLabel.Nofileuploadyet")}}</span>
                          </div>
                          <div v-else class="preview-container">
                          <img :src="previewImage" alt="Preview" class="preview-image " style="width: 100px;">
                          </div>
                          
                          <div class="paragraph-upload" v-if="previewImage">
                            <button 
                                class="btn-save-atr-upload" 
                                @click="updatedDrafLabel"
                                :disabled="!previewImage || isLoading"
                            >
                                <Loading v-if="isLoading" />
                                <span v-else>{{$t('Upload')}}</span>
                            </button>
                            
                          </div>
                      </label>
                      
                      <div class="border-doted"></div>
                    </div>
                    <div class="chil_content_info_upload mt-2">
                      <span class="child_content-label-info-title font-24 RalewayMedium"
                        >{{$t("ModalLabel.FinalLabel")}}
                      </span>
                      <div class="child_content-label-button" v-if="props.Final_imagen">
                        <span @click="downloadImage" class="child_content-label-button-upload cursor-pointer font-20 RalewayBold"
                          > {{ $t("ModalLabel.DownloadLabel") }}</span>
                          <span class="RalewayRegular font-20">{{$t("ModalLabel.finalLabelmessage")}}</span>
                      </div>
                      <div v-else>
                        <span class="RalewayRegular font-20">{{$t("ModalLabel.finalLabelmessageNot")}}</span>
                      </div>
                      <!-- <span>{{$t("ModalLabel.Nofileuploadyet")}}</span> -->
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div></div>
            <div class="modal-footer-bts">
              <a  data-bs-dismiss="modal" class="modal-footer-btc-cancel RalewayBold font-20" href="">{{ $t("NavBar.Cancel") }}</a>
              <a class="modal-footer-btc-save RalewayBold font-20" href="#"  @click="updateSelectedOption">{{ $t("NavBar.Save") }} </a>
            </div>
          </div>
        </div>
        <!-- modal-content -->
      </div>
      <!-- modal-dialog -->
    </div>
    <!-- modal -->
</template>
<style scoped>
.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: var(--bs-modal-header-padding);
  border-bottom: var(--bs-modal-header-border-width) solid
    var(--bs-modal-header-border-color);
  /* border-top-left-radius: var(--bs-modal-inner-border-radius);
  border-top-right-radius: var(--bs-modal-inner-border-radius); */
  justify-content: space-between;
  padding: 15px 15px;
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

.modal.sidebar-right .modal-dialog {
  position: fixed;
  margin: 0;
  top: 0;
  right: 0;
  height: 100%;
  width: 1300px;
  /* Ancho del sidebar */
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  height: 100% !important;
}

.modal.sidebar-right.show .modal-dialog {
  transform: translateX(0);
}

.modal-dialog-sidebar {
  max-height: 100%;
  margin: 0;
}
.modal-content {
  /* height: 100%; */
}
.modal {
  width: 100% !important;
  /* background-image: url("https://i.postimg.cc/HL50Qqch/Rectangle10.png"); */
  --bs-modal-width: 1263px !important;
}

/************************/
.percentage-value {
  width: 120px !important;
  height: 32px;
  display: block;
  border-radius: 25px;
  border: 1px solid #8dc34b;
  color: #8dc34b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.percentage-value-default {
  width: 120px !important;
  height: 32px;
  display: block;
  border-radius: 25px;
  border: 1px solid #d1d1d1;
  color: #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
}

.modal-body_header {
  padding-left: 50px;
  padding-bottom: 30px;
}
.modal-label-title{
  font-size:2rem;
}

/* .tabs-inline {
            min-width: 320px;
            max-width: 1100px;
            padding: 10px;
            margin: 0 auto;
            background: #fff;
        }*/

label {
  display: inline-block;
  margin: 0 0 -1px;
  padding: 15px 25px;
  font-weight: 600;
  text-align: center;
  color: #bbb;
  border: 1px solid transparent;
}

label:before {
  font-family: fontawesome;
  font-weight: normal;
  margin-right: 10px;
}

label:hover {
  color: #888;
  cursor: pointer;
}

.parent-label {
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 550px;
  width: 1107px;
  margin: 0 auto;
}

.child-bottles-form {
  background-color: #ede9fe;
  border-bottom-left-radius: 1.75rem;
  border-top-left-radius: 1.75rem;
  width: 100%;
  padding: 0 30px;
}

.child_content_features-bottle {
  background-color: #ede9fe;
  width: 488px;
  display: flex;
  align-items: center;
}

.child_content_features-taps {
  background-color: #ffe8e8;
  width: 488px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 1.75rem;
  border-top-left-radius: 1.75rem;
}

.child_content_info-bottle {
  padding: 60px 50px 60px 50px;
  width: 50%;
  background: #faf5ff;
  border-bottom-right-radius: 1.75rem;
  border-top-right-radius: 1.75rem;
}

.child_content_info-bottle-title {
  padding-left: 20px;
  font-size: 16px;
  font-weight: 400;
}

.radio-block {
  display: block;
  margin: 0px !important;
  width: 19px;
  height: 19px;
}

.child_content_select_bottle_type {
  display: flex;
  justify-content: space-around;
}

.child_content_select_taps_type {
  display: flex;
}

.radio_cylindrical {
  width: 176px !important;
}

.radio_taps {
  margin-left: 20px;
  width: 176px !important;
}

.child_content_input-radio {
  display: flex;
  font-size: 20px;
  border: 1px solid;
  border-radius: 25px;
  width: 134px;
  justify-content: space-around;
  height: 44px;
  background-color: #ede9fe;
  align-items: center;
  margin-top: 30px;
}

.child_content_input-radio input[type="radio"]:checked + label {
  background: #1c7298;
  color: #fff;
}

/**********************/
.ipt {
  width: 10%;
  height: 2em;
  opacity: 1;
  cursor: pointer;
  display: block !important;
}

.radio-group .box {
  width: 110px;
  display: inline-block;
  border: 2px solid #aeabae;
  border-radius: 5px;
  text-align: center;
  position: relative;
}

.child_content_features-bottle-form {
  display: flex;
}

.radio-group .lbl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 2em;
  pointer-events: none;
  padding: 5px !important;
}

.radio-group input[type="radio"]:checked + .lbl {
  background: #1c7298 !important;
  color: #fff;
  border: none;
}

.form-group-label-size {
  width: 100%;
  padding: 0 !important;
  text-align: left;
  font-weight: 400;
  margin-bottom: 10px;
}

.form-grup-input-field {
  padding: 5px;
  width: 100%;
}

.form-select-config {
  width: 238px;
  height: 60px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  padding-left: 20px;
}

.child_content_bottle_img {
  width: 80%;
  margin: 0 auto;
  display: flex;
}

.bottle {
  width: 310px;
  margin: 0 auto;
  height: 425px;
}

/************/

.b-close {
  background: transparent;
  border: none;
}

.modal_header {
  margin-top: 20px;
  padding-left: 50px;
  padding-right: 80px;
  justify-content: space-between;
  display: flex;
}

.modal-body_deadline {
  font-size: 20px;
}

.child-bottle-title_features {
  padding: 30px;
}

select {
  background-image: linear-gradient(45deg, transparent 50%, rgb(17, 17, 17) 60%),
    linear-gradient(135deg, rgb(17, 17, 17) 40%, transparent 50%) !important;
  background-position: calc(100% - 30px) 25px, calc(100% - 20px) 25px, 100% 0;
  background-size: 10px 10px, 10px 10px;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.modal-footer-bts {
  padding-top: 60px;
  justify-content: flex-end;
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 95%;
}

.modal-footer-btc-cancel {
  margin-right: 30px;
  border-radius: 25px;
  border: 2px solid var(--blackBlue);
  color: var(--blackBlue);
  width: 163px;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.modal-footer-btc-cancel:hover {
  background: var(--blackBlue);
  transition: all 0.3s ease;
  color: white;
}

.modal-footer-btc-save {
  margin-right: 30px;
  border-radius: 25px;
  border: 2px solid var(--blackBlue);
  background-color: var(--blackBlue);
  color: #fff;
  width: 163px;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.modal-footer-btc-save:hover {
  background: white;
  transition: all 0.3s ease;
  color: var(--blackBlue);
}

.child_content-label-button-upload {
  border: 1px solid var(--textButton);
  padding: 5px;
  border-radius: 25px;
  color: var(--textButton);
  width: 360px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
  height: 54px;
  text-decoration: none;
}

.child_content-label-button-upload:hover {
  text-decoration: none;
}

.chil_content_info_upload {
  /* height: 300px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.child_content-label-info-title {
  width: 100%;
  font-weight: 500;
  font-size: 24px;
}

.child_content_info-bottle-label {
  width: 80%;
  padding: 30px 25px 30px 25px;
  background: #faf5ff;
  border-bottom-right-radius: 1.75rem;
  border-top-right-radius: 1.75rem;
}

.border-doted {
  border-bottom: dotted 1px;
  height: 20px;
  width: 100%;
  margin-top: 30px;
}
.container-download-file {
  border: dotted 1px;
  height: 200px;
  width: 70%;
  margin: auto;
}
.modal-content {
  max-height: calc(120vh) !important;
  overflow-y: auto !important;
  height: 100%;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  border: none;
}
.container-download-file-button {
  text-align: center;
  margin: auto;
}
.container-download-file {
  display: flex;
  align-items: center;
}
.container-donload-file-text {
  text-decoration: none !important;
  color: var(--textButton);
  font-size: 10px;
}


.btn-save-atr-upload{
        display: block;
        border: solid 1px var(--textButton);
        border-radius: 30px;
        background-color: var(--textButton);
        line-height: 1rem;
        font-size: 1rem;
        padding: 1rem 1.57rem;
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
</style>

    