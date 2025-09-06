<script setup lang="ts">
import { ref, computed, watch, onMounted  } from 'vue';
import callApiPatch from '@/helper/callApiPatch';
import Loading from '../../Loading.vue';
import Round from '../../bote/BoteRound.vue'
import Square from '../../bote/BoteSquare.vue'
import Cylindrical from '../../bote/BoteCylindrical.vue'
import Simple from '../../cover/coverSimple.vue'
import Metal from '../../cover/coverMetal.vue'
import Childproff from '../../cover/coverChildproff.vue'


// Define types
export interface BoteDataItem {
  ID: number;
  Forma: string;
  Capacidad: string;
  Diametro: string;
  Material: string;
  Color: string;
}

export interface CapDataItem {
  ID: number;
  Forma: string;
  Diametro: string;
  Color: string;
  Sleever: boolean;
}

export  interface OptionC {
  ID: number; // Adjust based on your actual data type
  Value: string;
  Color_HEX: string;
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

export interface DiametroDetalleCap {
  diametro_exterior: number;
  altura_exterior: number;
}

export interface DiametrosCap {
  [key: string]: DiametroDetalleCap;
}

export interface capDiameter {
  detalles: {
    [key: string]: DiametrosCap;
  };
}



const props = defineProps({
    selectedOption: {
        type: Object as () => Partial<BoteDataItem>,
        default: () => ({}),
    },
    selectedOptionCap: {
        type: Object as () => Partial<CapDataItem>,
        default: () => ({}),
    },
    capData: {
        type: Array as () => CapDataItem[],
        required: true,
    },
    boteData: {
        type: Array as () => BoteDataItem[],
        required: true,
    },
    codeRG35: {
        type: String,
        required: true,
    },

    optionsColorBote: {
      type: Array as () => OptionC[],
      default: () => [],
    },

    optionsColorcover: {
      type: Array as () => OptionCC[],
      default: () => [],
    },

    characteristics : {
      type: String,
      default: () => "", 
    },

    setAccordionOpen: {
      type: Function,
      required: true
    }
});

// Refs for Bote
const selectedForma = ref<string>("");
const selectedCapacidad = ref<string>("");
const selectedDiametro = ref<string>("");
const selectedMaterial = ref<string>("");
const selectedColor = ref<string>("");

// Refs for Cap
const selectedCapForma = ref<string>("");
const selectedCapDiametro = ref<string>("");
const selectedCapColor = ref<string>("");

const isLoading = ref(false);
const errorMessages = ref<string[]>([]);

// Error flags (Bote)
const showFormaError = ref(false);
const showCapacidadError = ref(false);
const showDiametroError = ref(false);
const showMaterialError = ref(false);
const showColorError = ref(false);

// Error flags (Cap)
const showCapFormaError = ref(false);
const showCapDiametroError = ref(false);
const showCapColorError = ref(false);


const diameterDetails = ref<Detalle | null>(null);
const diameterDetailsCap = ref<DiametroDetalleCap | null>(null);

const filteredBoteData = ref<BoteDataItem[]>([...props.boteData]);
const filteredCapData = ref<CapDataItem[]>([...props.capData]);


const boteDiameter: BoteDiameter = {
    detalles: {
      "150": {
        // "D38": { altura: null, diametro_base: null, diametro_de_boca: null },
        "D45": { altura: 88.3, diametro_base: 55.3, diametro_de_boca: 43.82 },
      },
      "200": {
        // "D38": { altura: null, diametro_base: null, diametro_de_boca: null },
        "D45": { altura: 105.86, diametro_base: 60, diametro_de_boca: 43.82 },
        // "D53": { altura: null, diametro_base: null, diametro_de_boca: null },
        // "D70": { altura: null, diametro_base: null, diametro_de_boca: null },
      },
      "250": {
        "D45": { altura: 111.3, diametro_base: 63.91, diametro_de_boca: 43.82 },
      },
      "300": {
        "D45": { altura: 118.95, diametro_base: 68.99, diametro_de_boca: 43.82 },
        // "D63": { altura: null, diametro_base: null, diametro_de_boca: null },
      },
      "400": {
        "D45": { altura: 130.87, diametro_base: 72.69, diametro_de_boca: 43.82 },
      },
    },
};



const tapaDiameters: capDiameter = {
  detalles: {
    "Childproof": {
      "D45": { diametro_exterior: 51.99, altura_exterior: 17.306 },
      "D38": { diametro_exterior: 45.21, altura_exterior: 17.3 }
    },
    "Simple": {
      "D38": { diametro_exterior: 40.2, altura_exterior: 11.7 },
      "D45": { diametro_exterior: 47.37, altura_exterior: 11.7 }
    },
    "Cilíndrico": {
      "D53": { diametro_exterior: 60, altura_exterior: 17.5 },
      "D63": { diametro_exterior: 69.5, altura_exterior: 16.9 },
      "D70": { diametro_exterior: 71.5, altura_exterior: 11.8 }
    }
  }
};

// Computed properties (Bote)
const uniqueFormas = computed<string[]>(() => {
    return [...new Set(
        props.boteData
            .filter(item =>
                (!selectedCapacidad.value || item.Capacidad === selectedCapacidad.value) &&
                (!selectedDiametro.value || item.Diametro === selectedDiametro.value) &&
                (!selectedMaterial.value || item.Material === selectedMaterial.value) &&
                (!selectedColor.value || item.Color === selectedColor.value)
            )
            .map(item => item.Forma)
    )];
});

const uniqueCapacidades = computed<string[]>(() => {
    return [...new Set(
        props.boteData
            .filter(item =>
                (!selectedForma.value || item.Forma === selectedForma.value) &&
                (!selectedDiametro.value || item.Diametro === selectedDiametro.value) &&
                (!selectedMaterial.value || item.Material === selectedMaterial.value) &&
                (!selectedColor.value || item.Color === selectedColor.value)
            )
            .map(item => item.Capacidad)
    )];
});

const uniqueDiametros = computed<string[]>(() => {
    return [...new Set(
        props.boteData
            .filter(item =>
                (!selectedForma.value || item.Forma === selectedForma.value) &&
                (!selectedCapacidad.value || item.Capacidad === selectedCapacidad.value) &&
                (!selectedMaterial.value || item.Material === selectedMaterial.value) &&
                (!selectedColor.value || item.Color === selectedColor.value)
            )
            .map(item => item.Diametro)
    )];
});

const uniqueMateriales = computed<string[]>(() => {
    return [...new Set(
        props.boteData
            .filter(item =>
                (!selectedForma.value || item.Forma === selectedForma.value) &&
                (!selectedCapacidad.value || item.Capacidad === selectedCapacidad.value) &&
                (!selectedDiametro.value || item.Diametro === selectedDiametro.value) &&
                (!selectedColor.value || item.Color === selectedColor.value)
            )
            .map(item => item.Material)
    )];
});

const uniqueColores = computed<string[]>(() => {
    return [...new Set(
        props.boteData
            .filter(item =>
                (!selectedForma.value || item.Forma === selectedForma.value) &&
                (!selectedCapacidad.value || item.Capacidad === selectedCapacidad.value) &&
                (!selectedDiametro.value || item.Diametro === selectedDiametro.value) &&
                (!selectedMaterial.value || item.Material === selectedMaterial.value)
            )
            .map(item => item.Color)
    )];
});

// Computed properties (Cap)
const uniqueCapFormas = computed<string[]>(() => {
    return [...new Set(
        props.capData
            .filter(item =>
                (!selectedCapDiametro.value || item.Diametro === selectedCapDiametro.value) &&
                (!selectedCapColor.value || item.Color === selectedCapColor.value)
            )
            .map(item => item.Forma)
    )];
});

const uniqueCapDiametros = computed<string[]>(() => {
    return [...new Set(
        props.capData
            .filter(item =>
                (!selectedCapForma.value || item.Forma === selectedCapForma.value) &&
                (!selectedCapColor.value || item.Color === selectedCapColor.value)
            )
            .map(item => item.Diametro)
    )];
});

const uniqueCapColores = computed<string[]>(() => {
    return [...new Set(
        props.capData
            .filter(item =>
                (!selectedCapForma.value || item.Forma === selectedCapForma.value) &&
                (!selectedCapDiametro.value || item.Diametro === selectedCapDiametro.value)
            )
            .map(item => item.Color)
    )];
});

const sleeverProxy = ref(props.selectedOptionCap.Sleever)



const isCapDiametroDisabled = computed(() => !!selectedDiametro.value);
const isBoteDiametroDisabled = computed(() => !!selectedCapDiametro.value);
const isSyncing = ref(false);

const hexColor = computed(() => getColorHex(selectedColor.value));
const hexColorCover = computed(() => getColorHexCover(selectedCapColor.value));


// Función de filtrado principal (Bote)
const filterData = () => {
    // Si NO hay filtros aplicados, muestra TODOS los datos
    if (
        !selectedForma.value &&
        !selectedCapacidad.value &&
        !selectedDiametro.value &&
        !selectedMaterial.value &&
        !selectedColor.value
    ) {
        filteredBoteData.value = [...props.boteData];
    } else {
        // Aplica los filtros normalmente
        filteredBoteData.value = props.boteData.filter(item => {
            return (
                (!selectedForma.value || item.Forma === selectedForma.value) &&
                (!selectedCapacidad.value || item.Capacidad === selectedCapacidad.value) &&
                (!selectedDiametro.value || item.Diametro === selectedDiametro.value) &&
                (!selectedMaterial.value || item.Material === selectedMaterial.value) &&
                (!selectedColor.value || item.Color.replace(/\s+/g, '').toLowerCase() === selectedColor.value.replace(/\s+/g, '').toLowerCase())
            );
        });
    }

      // Nueva lógica para detalles del diámetro
      if (selectedCapacidad.value && selectedDiametro.value) {
        const detalles = boteDiameter.detalles[selectedCapacidad.value]?.[selectedDiametro.value];
        diameterDetails.value = detalles || null;
      } else {
        diameterDetails.value = null;
      }
};

// Función de filtrado principal (Cap)
const filterCapData = () => {
    if (
        !selectedCapForma.value &&
        !selectedCapDiametro.value &&
        !selectedCapColor.value
    ) {
        filteredCapData.value = [...props.capData];
    } else {
        filteredCapData.value = props.capData.filter(item => {
            return (
                (!selectedCapForma.value || item.Forma === selectedCapForma.value) &&
                (!selectedCapDiametro.value || item.Diametro === selectedCapDiametro.value) &&
                (!selectedCapColor.value || item.Color.replace(/\s+/g, '').toLowerCase() === selectedCapColor.value.replace(/\s+/g, '').toLowerCase())
            );
        });
    }

    // Nueva lógica para detalles del diámetro
    if (selectedCapForma.value && selectedCapDiametro.value) {
        const detalles = tapaDiameters.detalles[selectedCapForma.value]?.[selectedCapDiametro.value];
        diameterDetailsCap.value = detalles || null;
    } else {
        diameterDetails.value = null;
    }
};

// Watchers
watch(() => props.selectedOption, (newVal) => {
    if (newVal) {
        selectedForma.value = newVal.Forma || "";
        selectedCapacidad.value = newVal.Capacidad || "";
        selectedDiametro.value = newVal.Diametro || "";
        selectedMaterial.value = newVal.Material || "";
        selectedColor.value = newVal.Color || "";
    }
    filterData();
}, { immediate: true, deep: true });

watch(() => props.selectedOptionCap, (newVal) => {
    if (newVal) {
        selectedCapForma.value = newVal.Forma || "";
        selectedCapDiametro.value = newVal.Diametro || "";
        selectedCapColor.value = newVal.Color || "";
    }
    filterCapData();
}, { immediate: true, deep: true });

watch(selectedDiametro, (newVal) => {
    if (isSyncing.value) return;

    isSyncing.value = true;
    selectedCapDiametro.value = newVal;
    filterData();
    filterCapData();
    isSyncing.value = false;
});

watch(selectedCapDiametro, (newVal) => {
    if (isSyncing.value) return;

    isSyncing.value = true;
    selectedDiametro.value = newVal;
    filterData();
    filterCapData();
    isSyncing.value = false;
});

watch(selectedForma, () => {
    filterData();
});

watch(selectedCapacidad, () => {
    filterData();
});

watch(selectedMaterial, () => {
    filterData();
});

watch(selectedColor, () => {
    filterData();
});

watch(selectedCapForma, () => {
    filterCapData();
});

watch(selectedCapDiametro, () => {
    filterCapData();
});


watch(selectedCapColor, () => {
    filterCapData();
});

onMounted(() => {
    // Inicializa los datos filtrados con TODOS los datos
    filteredBoteData.value = [...props.boteData];
    filteredCapData.value = [...props.capData];
    
    // Llama a los filtros para calcular las opciones iniciales
    filterData();
    filterCapData();
});

// Función de reseteo de filtros
const resetFilters = () => {
    selectedForma.value = "";
    selectedCapacidad.value = "";
    selectedDiametro.value = "";
    selectedMaterial.value = "";
    selectedColor.value = "";
    selectedCapForma.value = "";
    selectedCapDiametro.value = "";
    selectedCapColor.value = "";
};

const ResetBote = () =>  {
  // Limpiar los campos de Cap
  selectedForma.value = "";
  selectedCapacidad.value = "";
  selectedMaterial.value = "";
  selectedColor.value = "";

  filterCapData();
    
}

// Función para normalizar claves de color (quita espacios y caracteres especiales, minúsculas)
function normalizeColorKey(str: string | number) {
  return String(str)
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function getColorHex( colorName: string | number) {
  const colorMap = props.optionsColorBote.reduce((map: { [x: string]: any; }, option: { Value: string | number; Color_HEX: any; }) => {
    map[normalizeColorKey(option.Value)] = option.Color_HEX;
    return map;
  }, {});
  const key = normalizeColorKey(colorName);
  const hex = (colorMap[key] || '').trim();
  return hex; // Devuelve el color hexadecimal sin espacios
}

function getColorHexCover( colorName: string | number) {
  const colorMap = props.optionsColorcover.reduce((map: { [x: string]: any; }, option: { Value: string | number; Color_HEX: any; }) => {
    map[normalizeColorKey(option.Value)] = option.Color_HEX;
    return map;
  }, {});
  const key = normalizeColorKey(colorName);
  const hex = (colorMap[key] || '').trim();
  return hex; // Devuelve el color hexadecimal sin espacios
}

// Función para mostrar el nombre de color legible
function prettifyColorName(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2');
}

async function updateSelectedOption(event: Event){
    event.preventDefault();
    isLoading.value = true;
    
     // Reset error messages
    showFormaError.value = false;
    showCapacidadError.value = false;
    showDiametroError.value = false;
    showMaterialError.value = false;
    showColorError.value = false;

     showCapFormaError.value = false;
     showCapDiametroError.value = false;
     showCapColorError.value = false;

    errorMessages.value = []

    let hasErrors = false;

     if (!selectedForma.value) {
        showFormaError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar una forma');
    }

    if (!selectedCapacidad.value) {
        showCapacidadError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar una Capacidad');
    }

    if (!selectedDiametro.value) {
        showDiametroError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar un Diametro');
    }

    if (!selectedMaterial.value) {
        showMaterialError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar un Material');
    }

    if (!selectedColor.value) {
        showColorError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar un Color');
    }
     if (!selectedCapForma.value) {
        showCapFormaError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar una tapa');
    }

     if (!selectedCapDiametro.value) {
        showCapDiametroError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar una boca');
    }
     if (!selectedCapColor.value) {
        showCapColorError.value = true;
        hasErrors = true;
        errorMessages.value.push('Debe seleccionar un color de tapa');
    }

    if (hasErrors) {
        isLoading.value = false;
        return;
    }
      // Ensure values are strings
    const capacidad = String(selectedCapacidad.value);
    const boca = String(selectedDiametro.value);
    
      // Create data object
    const data = {
        Bote_forma: selectedForma.value,
        Bote_capacidad: capacidad,
        Bote_boca: boca,
        Bote_color: selectedColor.value,
        Bote_material: selectedMaterial.value,
        Cap_tapa: selectedCapForma.value,
        Cap_Boca: selectedCapDiametro.value,
        Cap_color: selectedCapColor.value,
        Cap_sleever: sleeverProxy.value,
        Characteristics: `${selectedColor.value} ${capacidad}cc ${selectedMaterial.value} ${boca}`
    };

    try {
        const response = await callApiPatch(
            `CustomizeRG35('${props.codeRG35}')?$expand=Formulation,Recipe,Analytics&tenant=nutris`,
            data
        );
            if (!response) {
                throw new Error('API response is empty');
            }
            // Reload after a delay
          
            props.setAccordionOpen(2, 4);
            localStorage.setItem('accordion-keep', 'true');
            setTimeout(() => {
              window.location.reload();
            }, 100);

        } catch (error: any) {
            console.error("Error updating data:", error);
            errorMessages.value.push('Error updating data. Please try again.');
            if (error instanceof Error) {
                errorMessages.value.push(error.message);
            }
        } finally {
            isLoading.value = false;
        }
}

</script>

<template>
    <Loading v-if="isLoading"/>
    <div class="modal sidebar-right fade modal-overlay" id="sidebarRightModal3" tabindex="-1" aria-labelledby="sidebarRightModalLabel">
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
              
              
                <!-- Botones de control -->
                <button 
                    class="btn btn-secondary mb-3 button-reset gap-1"
                    @click="resetFilters"
                    :title="$t('modalContainer.Resetfilter')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w25">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>{{$t('modalContainer.Resetfilter')}}</span>
                </button>
              

              <section id="content1" class="content-bottle">
                <div class="parent">
                  <div class="child-bottles">
                    <h3 class="child-bottle-title_features font-24 RalewayMedium">{{$t('modalContainer.Characteristics')}}</h3>
                    <div class="child_content_features-bottle">
                      <!--<div class="child_content_bottle_img">
                        
                      </div>-->
                      <div class="product-config" v-if="selectedDiametro && selectedForma">
                        <div class="medidas-vertical">
                          <div class="medidas-vertical-1">
                            <div class="medidads-1-1">
                              <p class="p0 m-0 RalewayLight font-16">{{ diameterDetails?.altura || 'N/A' }} mm</p>
                            </div>
                          </div>
                          <!-- <div class="medidas-vertical-2 ">
                            <div class="medidas-2-2">
                              <div class="medidas-p1">
                                <p class="p1  RalewayLight font-16">{{ diameterDetails?.altura || 'N/A' }} mm</p>
                              </div>
                              <div class="medidas-p2">
                                <p class="p2  RalewayLight font-16">{{ diameterDetails?.altura || 'N/A' }} mm</p>
                              </div>
                            </div>
                          </div> -->
                        </div>
                        <div class="produc-box">
                          <div class="medidas-horizontal">
                            <p class="p3  RalewayLight font-16">{{ diameterDetails?.diametro_de_boca || 'N/A' }} mm</p>
                          </div>
                          <div class="produc-img">
                            <Square :colorBote="hexColor" v-if="selectedForma === 'SQUARE'" />
                            <Round :colorBote="hexColor" v-if="selectedForma === 'ROUND'"/>
                            <Cylindrical :colorBote="hexColor" v-if="selectedForma === 'CYLINDRICAL'"/>
                          </div>
                          <div class="medidas-horizontal-base">
                            <p class="p3  RalewayLight font-16">{{ diameterDetails?.diametro_base  || 'N/A' }} mm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="child_content_info-bottle RalewayRegular">
                    <span class="child_content_info-bottle-title  font-16">{{$t('modalContainer.Shape')}}</span>
                    <div class="child_content_select_bottle_type gap-4 p-4">
                      <div class="child_content_input-radio d-flex gap-2 justify-content-center" v-for="forma in uniqueFormas" :key="forma"  >
                        <input type="radio" class="radio-block" :name="forma" :value="forma" v-model="selectedForma" @change="filterData" />
                        <p class="font-20 mb-0" :for="forma">{{ forma.charAt(0).toUpperCase() + forma.slice(1).toLowerCase()  }}</p>
                      </div>
                    </div>
                    <div v-if="showFormaError && !selectedForma" class="error-message font-12 my-1" style="padding-left: 20px;" >{{$t("boteCap.Youmustselectone")}} {{ $t("boteCap.Shape") }} </div>
                    <div class="form-group-bottle pt-0 p-4">
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{$t('modalContainer.Size')}}</label
                        >

                        <select class="form-select Museo font-20" v-model="selectedCapacidad" @change="filterData">
                            <option value="">{{ $t("modalContainer.Selectasize") }}</option>
                            <option v-for="capacidad in uniqueCapacidades" :key="capacidad" :value="capacidad">{{ capacidad }}</option>
                        </select>
                        <div v-if="showCapacidadError && !selectedCapacidad" class="error-message font-12 mb-1">{{$t("boteCap.Youmustselectone")}} {{ $t("boteCap.Ability") }}</div>
                      </div>

                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Diameter"
                          >{{$t('modalContainer.Diameter')}}</label
                        >
                        
                        <select class="form-select Museo font-20" v-model="selectedDiametro" @change="filterData"  :disabled="isBoteDiametroDisabled">
                          <option value="">{{ $t("modalContainer.Selectadiameter") }}</option>
                          <option v-for="diametro in uniqueDiametros" :key="diametro" :value="diametro">{{ diametro }}
                          </option>
                        </select>
                        <div v-if="showDiametroError && !selectedDiametro" class="error-message font-12 mb-1">{{$t("boteCap.Youmustselectone")}} {{ $t("boteCap.Diameter") }}</div>
                      </div>

                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Material"
                          >{{$t('modalContainer.Material')}}</label
                        >
                        <select class="form-select Museo font-20" v-model="selectedMaterial" @change="filterData">
                          <option value="">{{ $t("modalContainer.Selectmaterial") }}</option>
                          <option v-for="material in uniqueMateriales" :key="material" :value="material">{{
                            material }}</option>
                        </select>
                        <div v-if="showMaterialError && !selectedMaterial" class="error-message font-12 mb-1">{{$t("boteCap.youmustselecta")}} Material</div>
                      </div>
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="Material"
                          >{{$t('modalContainer.Color')}}</label
                        >
                        <select class="form-select Museo font-20" v-model="selectedColor" @change="filterData,getColorHex(selectedColor)">
                          <option value="">{{ $t("modalContainer.Selectacolor") }}</option>
                          <option v-for="color in uniqueColores" :key="color" :value="color">{{ prettifyColorName(color) }}</option>
                        </select>
                        <div v-if="showColorError && !selectedColor" class="error-message font-12 mb-1">{{$t("boteCap.youmustselecta")}} Color</div>
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
                      <div class="product-config" v-if="selectedCapForma && selectedCapDiametro">
                        <div class="medidas-vertical">
                          <div class="medidas-vertical-2_tapa">
                            <div class="medidas-2-2">
                              <div class="medidas-p1">
                                <p class="p1 RalewayLight font-16 ">
                                  {{ diameterDetailsCap?.altura_exterior ?? 'N/A' }} mm
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="produc-box-tapa">
                          <div class="medidas-horizontal_tapa">
                            <p class="tapa_p3 RalewayLight font-16">
                              {{ diameterDetailsCap?.diametro_exterior ?? 'N/A' }} mm
                            </p>
                          </div>

                          <div class="produc-img">
                            <Childproff :colorCover="hexColorCover" v-if="selectedCapForma === 'Childproof'" />
                            <Metal :colorCover="hexColorCover" v-if="selectedCapForma === 'Metal'" />
                            <Simple :colorCover="hexColorCover" v-if="selectedCapForma === 'Simple'" />
                            <!-- <Cilindrico :colorCover="hexColorCover" v-if="selectedCapForma === 'Cilíndrico'" /> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <div class="child_content_info-bottle-tap">
                  <!-- <div class="child_content-info-bottle-heading">
                    <h3 class="child_title_tap RalewayBold font-16">{{$t("modalContainer.YOURBOTTLE")}}</h3>
                    <div>
                    <span class="font-14 Museo">{{props.characteristics}}</span><span class="child_title_tap fw-bold"></span>
                    </div>
                  </div> -->
                  <div class="child_content_info-bottle RalewayRegular ">
                  
                    <span>{{ $t("orderView.Shape") }}</span>
                    <div class="child_content_select_taps_type gap-4 mb-2">
                      <div class="child_content_input-radio d-flex gap-1 justify-content-center" v-for="forma in uniqueCapFormas" :key="forma">
                        <input type="radio" class="radio-block" :value="forma" v-model="selectedCapForma" @change="filterCapData" />
                          <p class="font-20 mb-0">{{ forma }}</p>
                      </div>
                    </div>
                    <div v-if="showCapFormaError && !selectedCapForma" class="error-message font-12 mb-1" style="padding-left: 20px;">{{$t("boteCap.Youmustselectone")}} {{ $t("boteCap.Cover") }}</div>
                    <div class="form-group-bottle">
                      <div class="form-grup-input-field">
                        <label class="form-group-label-size" for="size"
                          >{{ $t("modalContainer.DiameterThread") }}</label
                        >
                        <select class="form-select Museo font-20"  v-model="selectedCapDiametro" @change="ResetBote" :disabled="isCapDiametroDisabled">
                          <option value="">{{ $t("modalContainer.Selectadiameter") }}</option>
                          <option v-for="diametro in uniqueCapDiametros" :key="diametro" :value="diametro">
                            {{diametro}}
                          </option>
                        </select>
                        <div v-if="showCapDiametroError && !selectedCapDiametro" class="error-message font-12 mb-1">{{$t("boteCap.Youmustselectone")}} {{ $t("boteCap.Diameter") }}</div>
                      </div>
                      <div class="form-grup-input-field">
                          <label class="form-group-label-size" for="Material"
                            >{{$t('modalContainer.Color')}}</label
                          >
                          <select class="form-select Museo font-20"  v-model="selectedCapColor" @change="filterCapData,getColorHexCover(selectedCapColor)">
                            <option value="">{{ $t("modalContainer.Selectacolor") }}</option>
                            <option v-for="color in uniqueCapColores" :key="color" :value="color">{{ prettifyColorName(color) }}</option>
                          </select>
                          <div v-if="showCapColorError && !selectedCapColor" class="error-message font-12 mb-1">{{$t("boteCap.youmustselecta")}} Color</div>
                            
                      </div>
                      <div class="child_content_select_taps_type justify-content-start mb-2 gap-2">
                        <div class="child_content_input-radio d-flex justify-content-center align-items-center gap-1" >
            
                          <input type="checkbox" name="sleever" class="radio-block"  v-model="sleeverProxy" />
                            <span>Sleever</span>
          
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
            <button  data-bs-dismiss="modal" class="modal-footer-btc-cancel RalewayBold font-20">{{$t("NavBar.Cancel")}}</button>
            <button class="modal-footer-btc-save RalewayBold font-20"  @click="updateSelectedOption">{{$t("NavBar.Save")}}</button>
          </div>
        </div>
      </div>
    </div>
</template>




<style scoped>
@import url('/src/assets/fonts.css');

.error-message{
  color: red;
}
.tapa_p3{
  border-bottom:1px solid #C4C2C2;
}

.button-reset {
  position: absolute;
  right: 100px;
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
    height: 150px;
    width: 120px;
    display: flex;
    border-bottom: 1px solid #C4C2C2;
    position: relative;
    top: -32px;
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
  /* width: 619px; */
  background: #faf5ff;
  border-bottom-right-radius: 1.75rem;
  border-top-right-radius: 1.75rem;
  width: 100%;
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
    background-position: calc(100% - 15px) 25px, calc(100% - 6px) 25px, 100% 0;
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
  width: 120px;
  height: 350px;
  border-top: 1px solid #C4C2C2;
  border-bottom: 1px solid #C4C2C2;
  position: relative;
  top: -32px;
  display: flex;
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
  border-right: 1px solid #C4C2C2; 
  align-items: center;
  display: flex;
}
.medidas-p1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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
    width: 50%;
}
.child_content_info-bottle-tap {
    background: #faf5ff;
    width: 50%;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    
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

.w25 {
  width: 25px;
}
</style>