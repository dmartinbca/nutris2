<script setup lang="ts">
  import callApiPatch from '@/helper/callApiPatch';
  import { ref , computed, watch  } from 'vue';
  import Loading from '../../Loading.vue';
  import Round from '../../bote/BoteRound.vue'
  import Square from '../../bote/BoteSquare.vue'
  import Cylindrical from '../../bote/BoteCylindrical.vue'
  import Simple from '../../cover/coverSimple.vue'
  import Metal from '../../cover/coverMetal.vue'
  import Childproff from '../../cover/coverChildproff.vue'

  export  interface Option {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }
  export  interface OptionD {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

  export  interface OptionM {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

  export  interface OptionB {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

  export  interface OptionF {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }

  export  interface OptionC {
    ID: number; // Adjust based on your actual data type
    Value: string;
    Color_HEX: string;
  }
  
  export  interface OptionSC {
    ID: number; // Adjust based on your actual data type
    Value: string;
  }


  export  interface OptionCC {
    ID: number; // Adjust based on your actual data type
    Value: string;
    Color_HEX: string;
  }

  export interface Detalle {
    altura: number | null;
    diametro_base: number | null;
    diametro_de_boca: number | null;
  }

  export interface Diametros {
    [key: string]: Detalle;
  }

  export interface BoteDiameter {
    detalles: {
      [key: string]: Diametros;
    };
  }

  const props = defineProps({
    optionsSize: {
      type: Array  as () => Option[],
      default: () => [],
    },
    optionsDiameter: {
      type: Array as () => OptionD[],
      default: () => [],
    },
    optionsColorBote: {
      type: Array as () => OptionC[],
      default: () => [],
    },

    optionsMaterial: {
      type: Array as () => OptionM[],
      default: () => [],
    },

    optionsBoca: {
      type: Array as () => OptionB[],
      default: () => [],
    },

    optionsForma: {
      type: Array as () => OptionF[],
      default: () => [],
    },

    optionsDThread: {
      type: Array as () =>OptionD[],
      default: () => [],
    },

    optionsShapecover: {
      type: Array as () =>OptionSC[],
      default: () => [],
    },

    optionsColorcover: {
      type: Array as () =>OptionCC[],
      default: () => [],
    },

    characteristics : {
      type: String,
      default: () => "", 
    },

    selectedOption: {
      type: Object,
      default: () => {},
    },

    selectedOptionCap: {
      type: Object,
      default: () => {},
    },

    codeRG35: {
      type: String,
      default: () => "",
    },

    imagenURLBote : {
      type: String,
      default: () => ""
    },

    Bote_imagen : {
      type: String,
      default: () => ""
    },

    boteData : {
      type: Array,
      default: () => []
    }
  });
  
  const selectedOption = ref(props.selectedOption);
  const selectedOptionCap = ref(props.selectedOptionCap)
  const isLoading = ref(false); // Add isLoading ref


  // Datos estáticos
  const boteSize = {
    dimensiones_principales: [150, 200, 250, 300, 400],
  };

  const boteDiameter: BoteDiameter = {
    detalles: {
      "150": {
        "D38": { altura: null, diametro_base: null, diametro_de_boca: null },
        "D45": { altura: 88.3, diametro_base: 55.3, diametro_de_boca: 43.82 },
      },
      "200": {
        "D38": { altura: null, diametro_base: null, diametro_de_boca: null },
        "D45": { altura: 105.86, diametro_base: 60, diametro_de_boca: 43.82 },
        "D53": { altura: null, diametro_base: null, diametro_de_boca: null },
        "D70": { altura: null, diametro_base: null, diametro_de_boca: null },
      },
      "250": {
        "D45": { altura: 111.3, diametro_base: 63.91, diametro_de_boca: 43.82 },
      },
      "300": {
        "D45": { altura: 118.95, diametro_base: 68.99, diametro_de_boca: 43.82 },
        "D63": { altura: null, diametro_base: null, diametro_de_boca: null },
      },
      "400": {
        "D45": { altura: 130.87, diametro_base: 72.69, diametro_de_boca: 43.82 },
      },
    },
  };



  // Variables reactivas con inicialización condicional desde props
  const selectedSize = ref(
    props.selectedOption.bote_capacidad !== '' 
      ? props.selectedOption.bote_capacidad 
      : ''
  );

  const selectedDiameter = ref(
    props.selectedOption.bote_boca !== '' 
      ? props.selectedOption.bote_boca 
      : ''
  );

  // Watcher para sincronizar con props
  watch(() => props.selectedOption, (newVal) => {
    if (newVal.bote_capacidad !== '') {
      selectedSize.value = newVal.bote_capacidad;
    }
    if (newVal.bote_boca !== '') {
      selectedDiameter.value = newVal.bote_boca;
    }
  }, { deep: true, immediate: true });


  // Computados
  const availableDiameters = computed(() => {
    return selectedSize.value ? boteDiameter.detalles[selectedSize.value] : {};
  });

  const diameterDetails = computed(() => {
    if (selectedSize.value && selectedDiameter.value) {
      return boteDiameter.detalles[selectedSize.value][selectedDiameter.value];
    }
    return null;
  });

  const resetDiameter = () => {
    selectedDiameter.value = "";
  };

  async function updateSelectedOption(event: Event){
    event.preventDefault();
    isLoading.value = true; // Set isLoading to true at the start

      // Asegurar que los valores sean strings
    const capacidad = String(selectedSize.value);
    const boca = String(selectedDiameter.value);
    const data = {
      Bote_forma: selectedOption.value.bote_forma,
      // Bote_capacidad: selectedOption.value.bote_capacidad,
      // Bote_boca: selectedOption.value.bote_boca,
      Bote_capacidad: capacidad,
      Bote_boca: boca,
      Bote_color: selectedOption.value.bote_color,
      Bote_material: selectedOption.value.bote_material,
      Cap_tapa: selectedOptionCap.value.cap_tapa,
      //Cap_Boca: selectedOptionCap.value.cap_Boca,
      Cap_Boca: boca,
      Cap_color: selectedOptionCap.value.cap_color,
      Cap_sleever: selectedOptionCap.value.cap_sleever,
      Characteristics: selectedOption.value.bote_color+' '+capacidad+'cc '+selectedOption.value.bote_material+' '+boca
      //Characteristics: selectedOption.value.bote_color+' '+selectedOption.value.bote_capacidad+'cc '+selectedOption.value.bote_material+' '+selectedOption.value.bote_boca
    };

    try {
      const response = await callApiPatch(`CustomizeRG35('${props.codeRG35}')?$expand=Formulation,Recipe,Analytics&tenant=nutris`,data);
      
      if (response) {
            console.log('Datos actualizados:', response);

            // Recargar la página después de una actualización exitosa
            window.location.reload();
        } else {
            console.error('Error en la respuesta de la API:', response);
        }

    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
    finally {
      isLoading.value = false; // Set isLoading to false at the end, regardless of success or failure
    }
  }

  function getColorHex( colorName: string | number) {
    const colorMap = props.optionsColorBote.reduce((map: { [x: string]: any; }, option: { Value: string | number; Color_HEX: any; }) => {
      map[option.Value] = option.Color_HEX;
      return map;
    }, {});

    return colorMap[colorName] || ''; // Devuelve el color hexadecimal si existe, sino devuelve una cadena vacía
  }

  function getColorHexCover( colorName: string | number) {
    const colorMap = props.optionsColorcover.reduce((map: { [x: string]: any; }, option: { Value: string | number; Color_HEX: any; }) => {
      map[option.Value] = option.Color_HEX;
    
      return map;
    }, {});
    console.log(colorMap[colorName])
    return colorMap[colorName] || ''; // Devuelve el color hexadecimal si existe, sino devuelve una cadena vacía
  }
  const hexColor = computed(() => getColorHex(selectedOption.value.bote_color));
  const hexColorCover = computed(() => getColorHexCover(selectedOptionCap.value.cap_color));

</script>

<template>
  <!-- Modal Sidebar Right -->
  <Loading v-if="isLoading" />
  <div
    class="modal sidebar-right fade modal-overlay"
    id="sidebarRightModal"
    tabindex="-1"
    aria-labelledby="sidebarRightModalLabel"
  >
    <div class="modal-dialog modal-dialog-sidebar modal-dialog-right">
        <div class="modal-content">
          <div class="modal-header">
            <div class="percentage">
              <!-- <span class="percentage-value-tapa fw-bold">100%</span> -->
            </div>
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
            <!-- Sidebar right content goes here -->
            <div class="modal-body_header">
              <h2 class="modal-title font-32 modal-container-title MuseoSemiBold">Packaging/Envasado</h2>
              <!-- <div class="modal-body_deadline">
                <span><img class="flag" src="/img/flag-1-icon.svg" alt="" /></span>
                <span>&nbsp; {{$t('modalContainer.DeadLine')}}</span> <span class="fw-bold">&nbsp; 21/01/2024</span>
                <span>&nbsp; (46 days)</span>
              </div> -->
            </div>
            <div class="tabs-inline">
              <input
                id="tab1"
                class="tab-bottle_1"
                type="radio"
                name="tabs"
                checked
              />
              <label for="tab1" class="label-tab-1 font-20">{{$t('modalContainer.Bottle')}}</label>

              <input id="tab2" type="radio" class="tab-bottle_2" name="tabs" />
              <label for="tab2" class="label-tab-2 font-20">{{$t('modalContainer.Cap')}}</label>

              <section id="content1" class="content-bottle">
                <div class="parent">
                  <div class="child-bottles">
                    <h3 class="child-bottle-title_features font-24 RalewayMedium">{{$t('modalContainer.Characteristics')}}</h3>
                    <div class="child_content_features-bottle">
                      <!--<div class="child_content_bottle_img">
												
											</div>-->
                      <div class="product-config" v-if="selectedDiameter && diameterDetails">
                        <div class="medidas-vertical">
                          <div class="medidas-vertical-1">
                            <div class="medidads-1-1">
                              <p class="p0 m-0 RalewayLight font-16">{{ diameterDetails.altura || 'N/A' }} mm</p>
                            </div>
                          </div>
                          <div class="medidas-vertical-2 ">
                            <div class="medidas-2-2">
                              <div class="medidas-p1">
                                <p class="p1  RalewayLight font-16">{{ diameterDetails.altura || 'N/A' }} mm</p>
                              </div>
                              <div class="medidas-p2">
                                <p class="p2  RalewayLight font-16">{{ diameterDetails.altura || 'N/A' }} mm</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="produc-box">
                          <div class="medidas-horizontal">
                            <p class="p3  RalewayLight font-16">{{ diameterDetails.diametro_de_boca || 'N/A' }} mm</p>
                          </div>
                          <div class="produc-img">
                            
                            <Square :colorBote="hexColor" v-if="selectedOption.bote_forma === 'SQUARE'" />
                            <Round :colorBote="hexColor" v-if="selectedOption.bote_forma === 'ROUND'"/>
                            <Cylindrical :colorBote="hexColor" v-if="selectedOption.bote_forma === 'CYLINDRICAL'"/>
                          </div>
                          <div class="medidas-horizontal-base">
                            <p class="p3  RalewayLight font-16">{{ diameterDetails.diametro_base  || 'N/A' }} mm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="child_content_info-bottle RalewayRegular">
                    <span class="child_content_info-bottle-title  font-16">{{$t('modalContainer.Shape')}}</span>
                    <div class="comment">
                      <!-- 0 {{$t('modalContainer.Commentaries')}}<svg
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.7619 0C4.23592 0 3.80952 0.426395 3.80952 0.952381C3.80952 1.47837 4.23592 1.90476 4.7619 1.90476H16.1429C16.6951 1.90476 17.1429 2.35248 17.1429 2.90476V10.4762C17.1429 11.0022 17.5693 11.4286 18.0952 11.4286C18.6212 11.4286 19.0476 11.0022 19.0476 10.4762V1.90476C19.0476 0.852381 18.1952 0 17.1429 0H4.7619ZM1.90476 3.80952C0.857143 3.80952 0.0093006 4.66667 0.0093006 5.71429L0.0015732 17.5836C0.000992982 18.4748 1.07849 18.9215 1.70868 18.2913L3.51663 16.4834C3.70417 16.2958 3.95852 16.1905 4.22374 16.1905H13.3333C14.381 16.1905 15.2381 15.3333 15.2381 14.2857V5.71429C15.2381 4.66667 14.381 3.80952 13.3333 3.80952H1.90476Z"
                          fill="#989797"
                        />
                      </svg> -->
                    </div>
                    <div class="child_content_select_bottle_type">
                      <div class="child_content_input-radio d-flex gap-1 justify-content-center" v-for="optionF in props.optionsForma" :key="optionF.ID" >
          
                          <input type="radio" class="radio-block " :value="optionF.Value"  v-model="selectedOption.bote_forma" />
                          <p class="font-20 mb-0">{{ optionF.Value }}</p>
                        
                      </div>
                    </div>
                    <div class="form-group-bottle p-4">
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{$t('modalContainer.Size')}}</label
                        >
                        <!-- <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="selectedOption.bote_capacidad"
                        >
                          <option v-for="option in props.optionsSize" :key="option.ID" :value="option.Value">{{option.Value}}</option>
                        </select> -->
                        <select class="form-select Museo font-20" id="bote-size" v-model="selectedSize" @change="resetDiameter">
                          <option disabled value="">{{ $t("modalContainer.Selectasize") }}</option>
                          <option v-for="size in boteSize.dimensiones_principales" :key="size" :value="size">
                            {{ size }}
                          </option>
                        </select>
                      </div>

                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Diameter"
                          >{{$t('modalContainer.Diameter')}}</label
                        >
                        <!-- <select
                          class="form-select"
                          aria-label="Default select example"
                          v-model="selectedOption.bote_boca"
                        >
                          <option v-for="optionD in props.optionsDThread" :key="optionD.ID" :value="optionD.Value">{{optionD.Value}}</option>
                        </select> -->
                        <select class="form-select Museo font-20" id="bote-diameter" v-model="selectedDiameter">
                          <option disabled value="">{{ $t("modalContainer.Selectadiameter") }}</option>
                          <option v-for="diametro in Object.keys(availableDiameters)" :key="diametro" :value="diametro">
                            {{ diametro }}
                          </option>
                        </select>
                      </div>

                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Material"
                          >{{$t('modalContainer.Material')}}</label
                        >
                        <select
                          class="form-select Museo font-20"
                          aria-label="Default select example"
                          v-model="selectedOption.bote_material"
                        >
                          <option v-for="optionM in props.optionsMaterial" :key="optionM.ID" :value="optionM.Value">{{optionM.Value}}</option>
                        </select>
                      </div>
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Material"
                          >{{$t('modalContainer.Color')}}</label
                        >
                        <select
                          class="form-select Museo font-20"
                          aria-label="Default select example"
                          v-model="selectedOption.bote_color"
                          @change="getColorHex(selectedOption.bote_color)"
                        >
                          <option v-for="optionC in props.optionsColorBote" :key="optionC.ID" :value="optionC.Value ">{{optionC.Value}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="content2">
                <div class="parent">
                  <div class="child-bottles2 RalewayRegular">
                  <!-- <h3>{{  getColorHexCover(selectedOption.cap_color)}}</h3> -->
                   <h3 class="child-bottle-title_features">{{$t('modalLabel.Characteristics')}}</h3>
                  <div class="child_content_features-taps">
                    <div class="product-config">
                      <div class="medidas-vertical">
                        <div class="medidas-vertical-2_tapa d-none">
                          <div class="medidas-2-2">
                            <div class="medidas-p1">
                              <p class="p1">xxxx</p>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div class="produc-box-tapa ">
                        <div class="medidas-horizontal_tapa d-none">
                         <p class="tapa_p3">xxxx</p>
                        </div>
                        <div class="produc-img">
                          <Childproff :colorCover="hexColorCover"  v-if="selectedOptionCap.cap_tapa === 'Childproof'" />
                          <Metal :colorCover="hexColorCover"  v-if="selectedOptionCap.cap_tapa === 'Metal'"/>
                          <Simple :colorCover="hexColorCover"  v-if="selectedOptionCap.cap_tapa === 'Simple'"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                 <div class="child_content_info-bottle-tap">
                  <div class="child_content-info-bottle-heading">
                    <h3 class="child_title_tap RalewayBold font-16">{{$t("modalContainer.YOURBOTTLE")}}</h3>
                    <div>
                    <span class="font-14 Museo">{{props.characteristics}}</span><span class="child_title_tap fw-bold"></span>
                    </div>
                  </div>
                  <div class="child_content_info-bottle RalewayRegular">
                  
                    <span>{{ $t("orderView.Shape") }}</span>
                    <div class="child_content_select_taps_type">
                      <div class="child_content_input-radio d-flex gap-1" v-for="OptionSC in props.optionsShapecover" :key="OptionSC.ID"  >
          
                        <input type="radio" name="radio-input" class="radio-block " :value="OptionSC.Value" v-model="selectedOptionCap.cap_tapa" />
                        
                        <span class="RalewayRegular font-20">{{ OptionSC.Value }}</span>
        
                      </div>
                    </div>
                    <div class="form-group-bottle">
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{ $t("modalContainer.DiameterThread") }}</label
                        >
                        <select
                          class="form-select Museo font-20"
                          aria-label="Default select example"
                          v-model="selectedOptionCap.cap_Boca"
                         
                        >
                          <option v-for="optionD in props.optionsDThread" :key="optionD.ID" :value="optionD.Value" disabled>{{optionD.Value}}</option>
                        </select>
                      </div>
                      <div class="form-grup-input-field">
                          <label class="form-group-label-size" for="Material"
                            >{{$t('modalContainer.Color')}}</label
                          >
                          <select
                            class="form-select Museo font-20"
                            aria-label="Default select example"
                            v-model="selectedOptionCap.cap_color" 
                            @change="getColorHexCover(selectedOptionCap.cap_color)"
                          >
                            <option v-for="OptionCC in props.optionsColorcover" :key="OptionCC.ID" :value="OptionCC.Value">{{OptionCC.Value}}</option>
                          </select>
                      </div>
                      <div class="child_content_select_taps_type justify-content-start" style="padding-left: 20px;">
                        <div class="child_content_input-radio d-flex justify-content-start" >
            
                          <input type="checkbox" name="sleever" class="radio-block"  v-model="selectedOptionCap.cap_sleever" />
                          Sleever
          
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
              </section>
            </div>
          </div>
            <div class="modal-footer-bts">
							<a  data-bs-dismiss="modal" class="modal-footer-btc-cancel RalewayBold font-20" href="">{{$t("NavBar.Cancel")}}</a>
							<a class="modal-footer-btc-save RalewayBold font-20" href="#" @click="updateSelectedOption">{{$t("NavBar.Save")}}</a>
						</div>
        </div>

      </div>
  </div>
</template>


<style scoped>
@import url('/src/assets/fonts.css');
.tapa_p3{
  border-bottom:1px solid #C4C2C2;
}
.medidas-horizontal_tapa{
    width: 100%;
    max-width: 123px;
    margin: 0 auto;
    border-left: 1px solid #C4C2C2;
    border-right: 1px solid #C4C2C2;
    position: relative;
    top: -47px;
    /* right: 43px; */
}
.medidas-vertical-2_tapa {
    border-top: 1px solid #C4C2C2;
    height: 73px;
    width: 56px;
    display: flex;
    border-bottom: 1px solid #C4C2C2;
    /* left: 40px; */
    position: relative;
    top: -40px;
}
.child_title_tap{
  color: var(--textButton);
}
.strong{
    font-weight: bold !important;
}
.modal-title{
  margin-bottom: 15px;
}
.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: var(--bs-modal-header-padding);
  border-bottom: var(--bs-modal-header-border-width) solid
    var(--bs-modal-header-border-color);
  border-top-left-radius: var(--bs-modal-inner-border-radius);
  border-top-right-radius: var(--bs-modal-inner-border-radius);
  justify-content: space-between;
  padding-left: 50px;
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
.modal-container-title{
  font-size:2rem;
}

.modal.sidebar-right.show .modal-dialog {
  transform: translateX(0);
}

.modal-dialog-sidebar {
  max-height: 100%;
  margin: 0;
}
.modal-content {
  height: 100%;
  border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    border:none;
}
.modal {
  width: 100% !important;
  /* background-image: url("https://i.postimg.cc/HL50Qqch/Rectangle10.png"); */
  --bs-modal-width: 1263px !important;
  --bs-modal-header-border-color: transparent !important;
     
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
/****BTN STEP *****/
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

.percentage-value-tapa {
  width: 120px !important;
  height: 32px;
  display: block;
  border-radius: 25px;
  border: none;
  color: #fff;
  background: #0ED88F;
  display: flex;
  align-items: center;
  justify-content: center;
}
/************************************/

.modal-body_header {
  padding: 5px 50px;
}

.modal_header {
  margin-top: 60px;
  padding-left: 80px;
  padding-right: 80px;
}

.modal-body_deadline {
  font-size: 20px;
}

.modal-body {
  display: flex;
  flex-direction: column;
}
.b-close {
  background: transparent;
  border: none;
}

/*******TABS******************/
.tabs-inline {
  min-width: 320px;
  max-width: 1100px;
  padding: 10px;
  margin: 0 auto;
  background: #fff;
}

section {
  display: none;
  /* padding: 20px 0 0;*/
  /*  border-top: 1px solid #ddd;*/
}

.tab-bottle_1 {
  display: none;
}

.tab-bottle_2 {
  display: none;
}

.tab-bottle_3 {
  display: none;
}

label {
  display: inline-block;
  margin: 0 0 -1px;
  padding: 10px 5px;
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

.label-tab-1 {
  color: #555;
  border: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  left: 1.75rem;
  width: 158px;
  font-family: 'RalewayMedium', sans-serif ; 
  font-weight: 500 ;
  cursor: pointer;
}

input:checked + .label-tab-1 {
  color: #555;
  border: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  background-color: #ede9fe;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  left: 1.75rem;
  width: 150px;
  font-family: "RalewayBold", sans-serif !important; 
  font-weight: 800;
  cursor: pointer;
}

.label-tab-2 {
  color: #555;
  border: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  left: 1.75rem;
  width: 100px;
  width: 150px;
  font-family: 'RalewayMedium', sans-serif ; 
  font-weight: 500 ;
  cursor: pointer;
}

input:checked + .label-tab-2 {
  color: #555;
  border: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  background-color: #ffe8e8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  left: 1.75rem;
  width: 150px;
  font-family: "RalewayBold", sans-serif !important; 
  font-weight: 800;
  cursor: pointer;

}

#tab1:checked ~ #content1,
#tab2:checked ~ #content2,
#tab3:checked ~ #content3 {
  display: block;
}

/***********CONTEN TABS*****************/
.parent {
  display: flex;
  /* grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr; */
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  /* height: 740px; */
  width: 1107px;
}

.child-bottles {
  background-color: #ede9fe;
  border-bottom-left-radius: 1.75rem;
  border-top-left-radius: 1.75rem;
  width: 50%;
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
  padding: 20px 25px 0 25px;
  width: 619px;
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
  justify-content: space-around;
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
  font-size: 1rem;
  border: 1px solid #A7BDE3;
  border-radius: 25px;
  width: max-content;
  justify-content: space-around;
  height: 44px;
  background-color:#F0E7F9;
  align-items: center;
  margin-top: 30px;
  padding: 15px;
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
  /* padding: 20px; */
  /* padding-left: 20px; */
}

.form-select {
  width: 327px;
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


.child-bottle-title_features {
  padding: 10px 0 10px 30px;
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
  /* padding-top: 60px; */
  justify-content: flex-end;
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  max-width: 95%;
  margin-bottom: 30px;
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
  text-decoration:none;
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
  text-decoration:none;
  transition: all 0.3s ease;
}

.modal-footer-btc-save:hover {
  background: white;
  transition: all 0.3s ease;
  color: var(--blackBlue);
}

.comment {
  position: absolute;
  right: 67px;
  top: 214px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 140px;
}
.modal-content {
  max-height: calc(120vh) !important;
  overflow-y: auto !important;
}

/***********************************/
input.rotated-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transform: rotate(270deg); /* Rotar el input 90 grados */
  width: 90px; /* Ajustar el ancho si es necesario */
}

.product-config {
  width: 600px;
  margin: 0 auto;
  /*border: 1px solid;*/
  display: flex;
  justify-content: center;
  height: 500px;
}
.medidas-vertical {
  display: flex;
  align-items: center;
  /*right: -35px;*/
  position: relative;
  /* top: 50px; */
}
.medidas-vertical-1 {
  border-top: 1px solid #C4C2C2;
  height: 350px;
  width: 120px;
  display: flex;
  border-bottom: 1px solid #C4C2C2;
  position: relative;
  top: -32px;
}
.p0 {
  transform: rotate(270deg); /* Rotar el input 90 grados */
}
.p1 {
  transform: rotate(270deg); /* Rotar el input 90 grados */
}
.p2 {
  transform: rotate(270deg); /* Rotar el input 90 grados */
}
.p3 {
    border-bottom: 1px solid #C4C2C2;
}
.medidads-1-1 {
  border-right: 1px solid #C4C2C2; 
  align-items: center;
  display: flex;
}
.medidas-vertical-2 {
  border-top: 1px solid #C4C2C2;
  height: 350px;
  width: 75px;
  /* display: flex; */
  border-bottom: 1px solid #C4C2C2;
  left: -42px;
  position: relative;
  top: -32px;
  display: none;
}
.medidas-2-2 {
  border-right: 1px solid #C4C2C2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.medidas-p2 {
  border-bottom: 1px solid #C4C2C2;
  /* border-right: 1px solid;*/
  border-top: 1px solid #C4C2C2;
  height: 276px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.medidas-p1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
}
.w-img {
  width: auto;
  height: auto;
      position: relative;
    right: 30px;
    top: -30px;
}
.produc-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -25px;
  text-align:center;
 
}
.produc-box-tapa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -25px;
  text-align:center;
  left: 45px;
}
.arrow-b {
    position: relative;
    left: -16px;
    top: 10px;
}

.child-bottles2 {
    background: #ffe8e8;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
}
.child_content_info-bottle-tap {
    background: #faf5ff;
}
.child_content-info-bottle-heading {
    background: #F1EDF5;
    padding: 50px;
}

/****************************************/
.lista-botones {
  list-style: none;
  padding: 0;
  display: flex;
}

.boton {
  position: relative;
 /* overflow: hidden;*/
  border: none;
  background-color: #007bff;
  color: #fff;
  margin: 5px;
}

.boton img {
  position: absolute;
  /*left: -30px;*/
  opacity: 0;
  transition: 0.3s;
}

/*.boton:hover img {
  opacity: 1;
}*/

.boton.selected img {
  opacity: 1;
}
.medidas-horizontal {
    width: 100%;
    max-width: 123px;
    margin: 0 auto;
    border-left: 1px solid #C4C2C2;
    border-right: 1px solid #C4C2C2;
    /* right: 26px; */
    position: relative;
    top: -40px;
}


.medidas-horizontal-base {
    width: 100%;
    max-width: 190px;
    margin: 0 auto;
    border-left: 1px solid #C4C2C2;
    border-right: 1px solid #C4C2C2;
    /* right: 26px; */
    position: relative;
    bottom: -40px;
}




/* Estilos generales */

/* Media query para dispositivos con un ancho máximo de 767px (típicamente teléfonos) */
@media (max-width: 767px) {
  .modal.sidebar-right .modal-dialog {
    width: 100%; /* Establecer el ancho al 100% para ocupar toda la pantalla */
    transform: none; /* Eliminar la transformación para que el modal aparezca en la posición predeterminada */
  }

  .modal-content {
    border-radius: 0; /* Eliminar el redondeo de las esquinas */
  }

  .modal-header {
    padding: 15px; /* Reducir el relleno del encabezado */
  }

  .percentage-value {
    width: auto; /* Permitir que el ancho del porcentaje se ajuste automáticamente */
  }

  .modal-body_header,
  .modal-body_deadline,
  .tabs-inline,
  .modal-footer-bts {
    padding: 15px; /* Reducir el relleno de otros elementos */
  }

  .parent {
    flex-direction: column; /* Apilar los elementos en una sola columna */
    width:100% !important;
  }
  .child-bottles{
    width:100%;
  }
  /****Altura modal*****/
  .tabs-inline {
    min-width: 320px;
    max-width: 100%;
    padding: 10px;
    margin: 0 auto;
    background: #fff;
    min-height: 191vh;
    width:100%;
}
select.form-select {
    width: 100% !important;
}
  
  .child_content_select_bottle_type {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.child_content_info-bottle {
    width: 100% !important;
    max-width: 100%;
}
}

</style>