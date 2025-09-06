<script lang="ts">
    import callApi from '@/helper/callApi';
    import callApiPatch from '@/helper/callApiPatch';
    import callApiPost from '@/helper/callApiPost';
    import StepActiveOne from './steps/StepActiveOne.vue';
    import StepActiveNew from './steps/StepActiveNew.vue';
    import StepActiveTwo from './steps/StepActiveTwo.vue';
    import StepActiveThree from './steps/StepActiveThree.vue';
    import StepActiveFour from './steps/StepActiveFour.vue';
    import ModalLabel from './modal/ModalLabel.vue';
    import ApproveModal from './modal/ApproveModal.vue';
    import UploadTagModal from './modal/UploadTagModal.vue';
    import BoxLabelImagen from './modal/BoxLabelImagen.vue';
    import PalletLabelImagen from './modal/PalletLabelImagen.vue';
    import thankYou from './modal/thankYou.vue';
    import BoteCapData from './modal/BoteCapData.vue';
    import ConfirmModal from './modal/ComfirmModal.vue';
    import Loading from '../Loading.vue';
    import * as bootstrap from 'bootstrap';
    
    interface InputItem {
        placeHolder: string; // Define el tipo adecuado
    }

    interface InputRecipe {
        Active: string; // Define el tipo adecuado
        Source_used: string; // Define el tipo adecuado
        Quantity_of_active_per_serving: string; // Define el tipo adecuado
        EU_RDA: string; // Define el tipo adecuado
    }

    interface InputBottle {
        desc: string;
    }
    interface InputGummyDna {
        name: string;
        desc: string;
    }

    interface InputInformation {
        title : string;
        placeHolder : string;
    }

    interface InputPallet {
        title : string;
        placeHolder : string;
    }

    interface InputAnalytics {
        Code : string;
        Active : string;
        PVP : string;
        Analitycs : string;
        Periodicity : string;
        Observations : string;
        Quantity : string;
        Source : string;
        Precio_Analiticas: number
    }

    interface ListAnalyticsPVP {
        Precio_Analiticas : number;
    }

    interface EnumMember {
        name: string | null;
        value: string | null;
    }

    interface ListLotes {
        ID : number;
        Format: string;
    }

    interface ListBBD {
        ID : number;
        Format: string;
    }

    interface FilesList {
        Code : string;
        Name: string;
        File: string;
    }

    export default {
        components: {
            StepActiveOne,
            StepActiveNew,
            StepActiveTwo,
            StepActiveThree,
            StepActiveFour,
            ModalLabel,
            ApproveModal,
            UploadTagModal,
            ConfirmModal,
            Loading,
            BoxLabelImagen,
            PalletLabelImagen,
            thankYou,
            BoteCapData
        },
        data() {
            return {
                isLoading: true,
                name: '',
                order:'',
                Nutris_Code: '',
                Nutriss_comments: '',
                comments: '',
                Estimated_date: '',
                Unit_price: '',
                MOQ: '',
                Logo : '',
                urlImg : [
                    {
                        img:"/img/SUITABLE FOR VEGETARIAN.svg"
                    }, 
                    {
                        img:"/img/VEGAN FRIENDLY.svg"
                    }, 
                    {
                        img:"/img/NATURAL COLORS.svg"
                    },  
                    {
                        img:"/img/NATURAL FLAVORS.svg"
                    }
                ],
                listInputBn: [] as InputItem[],
                listInputB: [] as InputItem[],
                recipe: [] as InputRecipe[],
                Take_sample: '',
                Customer_accepted: false,
                formulation : [],
                Suitable_vegetarians : '',
                Suitable_vegans: '',
                Allergen_free: '',
                Natural_colors: '',
                Natural_flavor: '',
                Product_name_2: '',
                imgBase64: '',
                Shape: '',
                Trade_name: '',
                Bote_imagen:'',
                bottle: [] as InputBottle[],
                Filling_batch : '',
                Filling_exp_date: '',
                Filling_location: '',
                Label_size: '',
                gummyDna: [] as InputGummyDna[],
                information: [] as InputInformation[],
                Pallet_label_imagen : '',
                Pallet_comments : '',
                pallet: [] as InputPallet[],
                analytics : [] as InputAnalytics[],
                id:this.$route.params.id,
                country: '',
                country2: '',
                country3: '',
                estimated_date: '',
                sumAnalytics: 0,
                listAnalyticsPVP : [] as ListAnalyticsPVP[],
                totalCampos: 0,
                totalCamposLlenos: 0,
                porcentajeLlenos: 0,
                totalCamposBote: 0,
                totalCamposLlenosBote: 0,
                porcentajeLlenosBote: 0,
                totalCamposLabel: 0,
                totalCamposLlenosLabel: 0,
                porcentajeLlenosLabel: 0,
                totalCamposPalettizing: 0,
                totalCamposLlenosPalettizing: 0,
                porcentajeLlenosPalettizing: 0,
                totalCamposAnalytics: 0,
                totalCamposLlenosAnalytics: 0,
                porcentajeLlenosAnalytics: 0,
                optionsFinish: [],
                optionsLabelMaterial: [],
                optionsColorLabel: [], 
                optionsColorBote: [], 
                optionsColorBoteHEX: [],
                optionsSize: [],
                optionsSizeLabel: [],
                optionsDiameter: [],
                optionsMaterial: [],
                optionsBoca: [],
                optionsForma: [],
                optionsDThread: [],
                optionsColorcover: [],
                optionsShapecover: [],
                selectedOption: {},
                selectedOptionLabels: {},
                selectedOptionCap: {},
                tipo: '',
                LogoCountry: '',
                LogoCountry2: '',
                LogoCountry3: '',
                Code: '',
                characteristics: '',
                cap_tapa : '',
                cap_Boca : '',
                cap_color : '',
                cap_sleever : null,
                Tomar_muestra : false,
                RG37 : '',
                status: '',
                typeImageBoxLabel: '',
                ImageBoxLabel: '',
                imagenURLBote:'',
                bote_color : '',
                bote_forma : '',
                Deadline_date: '',
                Box_label_imagen: '',
                ClientSummaryLink: '',
                DataSheetLink : '',
                Label_Imagen_Final : '',
                isConfirmModalVisible: false,
                isThankYouModalVisible: false,
                capData: [],
                boteData: [],
                tiposLote: [] as EnumMember[],
                tiposBBD: [] as EnumMember[],
                prefijo: '',
                LotesList: [] as ListLotes[],
                BBDList: [] as ListBBD[],
                Files : [] as FilesList[],
                noLabel: false,
                noAnalytics: false,
                tooltips: [] as any[],
                status37: false, // Nuevo: status del RG37 relacionado
                Filling_batch_other: '',
                Filling_exp_date_other: '',
                loteSent: false,
                bbdSent: false,
                isLoteOtherLoading: false,
                isBBDOtherLoading: false,
            };
        },
        async created() {
            this.isLoading = true;  
            this.prefijo = ''
            if (typeof this.id === 'string') {
                this.prefijo = this.id.split('-')[0];
            }
            try
            { 
                let datos = [];
                if(this.prefijo == 'RG37'){
                    datos = await callApi(`CustomizeRG37('${this.id}')?&$expand=Recipe`);
                }else {
                    datos = await callApi(`CustomizeRG35('${this.id}')?&$expand=Formulation,Recipe,Analytics,Files&tenant=nutris`);
                }
                
                let response  = datos.data
                if(datos.data && this.prefijo == "RG35") {
                    this.Code = response.Code === '' ? '-' : response.Code;
                    this.name = response.Product_name === '' ? '-' : response.Product_name ;
                    this.order = response.Order === '' ? '-' :  response.Order 
                    this.Nutris_Code = response.Nutris_Code === '' ? '-' : response.Nutris_Code 
                    this.Estimated_date = response.Estimated_date === '' ? '-' : response.Estimated_date 
                    this.Deadline_date = response.Deadline_date === '' ? '' : response.Deadline_date 
                    this.Unit_price = response.Unit_price === 0 ? '-' : response.Unit_price
                    this.MOQ = response.MOQ === 0 ? '-' : response.MOQ
                    this.Product_name_2 = response.Product_name_2 === '' ? '-' : response.Product_name_2
                    this.characteristics = response.Characteristics === '' ? '-' : response.Product_name_2
                    this.RG37 = response.RG37 === '' ? '-' : response.RG37
                    this.status37 = response.Customer_Accepted_RG37
                    

                    this.ImageBoxLabel = `data:image/png;base64,${response.Box_label_imagen}`
                    const customerLogo = localStorage.getItem('Customer_logo');
                    if(customerLogo) {
                        this.Logo = `data:image/png;base64,${customerLogo} `
                    }else {
                        this.Logo = ''
                    }

                    if(response.Country && response.Logo_Pais) {
                        this.country = response.Country
                        this.LogoCountry =  `data:image/png;base64,${response.Logo_Pais}`

                    }else {
                        this.country = ''
                        this.LogoCountry = ''
                    }

                    if(response.Country_2 && response.Logo_Pais_2) {
                        this.country2 = response.Country_2
                        this.LogoCountry2 =  `data:image/png;base64,${response.Logo_Pais_2}`

                    }else {
                        this.country2 = ''
                        this.LogoCountry2 = ''
                    }
                    if(response.Country_3 && response.Logo_Pais_3) {
                        this.country3 = response.Country_3
                        this.LogoCountry3 =  `data:image/png;base64,${response.Logo_Pais_3}`

                    }else {
                        this.country3 = ''
                        this.LogoCountry3 = ''
                    }

                    if(response.Label_imagen) {
                        this.Label_Imagen_Final  = `data:image/png;base64,${response.Label_imagen}`
                    }
                    console.log("label final" + this.Label_Imagen_Final)

                    this.estimated_date = response.Estimated_date  === '' ? '' : response.Estimated_date
                    this.tipo = response.Tipo === '' ? '-' : response.Tipo
                    this.selectedOption = {
                        Capacidad: response.Bote_capacidad === '' ? '-' : response.Bote_capacidad, 
                        Material: response.Bote_material === '' ? '-' : response.Bote_material, 
                        Diametro: response.Bote_boca === '' ? '-' : response.Bote_boca, 
                        Color: response.Bote_color === '' ? '-' : response.Bote_color,
                        Forma: response.Bote_forma === '' ? '-' : response.Bote_forma
                    };

                    this.bote_color = response.Bote_color === '' ? '-' : response.Bote_color, 
                    this.bote_forma = response.Bote_forma === '' ? '-' : response.Bote_forma, 

                    this.selectedOptionLabels  = {
                        label_size : response.Label_size  === '' ? '-' : response.Label_size,
                        label_material : response.Label_material  === '' ? '-' : response.Label_material ,
                        label_finish : response.Label_finish  === '' ? '-' : response.Label_finish ,
                        label_colors : response.Label_color  === '' ? '-' : response.Label_color
                    };

                    const formulation = response.formulation && response.formulation[0] ? response.formulation[0] : {};

                    this.Suitable_vegetarians = formulation.Suitable_vegetarians !== undefined ? formulation.Suitable_vegetarians : false;
                    this.Suitable_vegans = formulation.Suitable_vegans !== undefined ? formulation.Suitable_vegans : false;
                    this.Natural_colors = formulation.Natural_colors !== undefined ? formulation.Natural_colors : false;
                    this.Natural_flavor = formulation.Natural_flavor !== undefined ? formulation.Natural_flavor : false;
                    this.comments = formulation.Nutris_comments !== undefined ? formulation.Nutris_comments : '-';
                    this.Take_sample = formulation.Take_sample !== undefined ? formulation.Take_sample : '';

                    this.Customer_accepted = formulation.Customer_accepted !== undefined ? formulation.Customer_accepted : false;
                    this.Tomar_muestra = formulation.Tomar_muestra !== undefined ? formulation.Tomar_muestra : false;

                    this.listInputBn = [
                        {
                           placeHolder: formulation.Base !== undefined ? formulation.Base : '-'
                        },
                        { 
                            placeHolder: formulation.Sugar_composition !== undefined ? formulation.Sugar_composition : '-'
                        },
                        {
                            placeHolder: formulation.Cover !== undefined ? formulation.Cover : '-'
                        }
                    ]

                    this.listInputB = [ 
                        {
                            placeHolder: formulation.Color !== undefined ? formulation.Color : '-'
                            
                        },
                        {
                            placeHolder: formulation.Flavour !== undefined ? formulation.Flavour : '-'
                            
                        },
                        {
                            placeHolder: formulation.Size !== undefined ? formulation.Size : '-'

                        },
                        {
                            placeHolder: formulation.Serving !== undefined ? formulation.Serving : '-'
                        }
                    ]

                    this.recipe = [];
                    response.recipe.forEach((item: any) => {
                        this.recipe.push({
                            Active: item.Active === '' ? '-' : item.Active,
                            Source_used: item.Source_used === '' ? '-' : item.Source_used,
                            Quantity_of_active_per_serving: item.Quantity_of_active_per_serving === '' ? '-' : item.Quantity_of_active_per_serving,
                            EU_RDA: item.EU_RDA === '' ? '-' : item.EU_RDA,
                        });
                    });

                    if(formulation.Imagen) {
                        this.imgBase64 = `data:image/png;base64,${formulation.Imagen}`;

                    }else {
                        this.imgBase64 = ''
                    }
                    
                    this.Shape  = formulation.Shape !== undefined ? formulation.Shape : '-'


                    this.Trade_name = response.Trade_name  === '' ? '-' : response.Trade_name
                    if( response.Bote_imagen)
                        this.Bote_imagen = `data:image/png;base64,${response.Bote_imagen}`;
                    else {
                        this.Bote_imagen = ''
                    }

                    this.bottle = [
                        {
                            desc: response.Characteristics === '' ? '-' : response.Characteristics
                        },
                        { 
                            desc: response.Bote_boca === '' ? '-' : response.Bote_boca

                        },
                        {
                            desc: response.Pieces_per_container === '' ? '-' : response.Pieces_per_container
                        }
                    ]

                    this.Filling_batch = response.Filling_batch === '' ? '-' : response.Filling_batch
                    this.Filling_exp_date = response.Filling_exp_date === '' ? '-' : response.Filling_exp_date.replace(/_x002F_/g, '/');
                    this.Filling_location = response.Filling_location === '' ? '-' : response.Filling_location

                    this.gummyDna = [
                        {
                            name:'Size', 
                            desc: response.Label_size === '' ? '-' : response.Label_size
                        }, 
                        {
                            name:'Material', 
                            desc: response.Label_material === '' ? '-' : response.Label_material
                        }, 
                        {
                            name:'Finish', 
                            desc: response.Label_finish === '' ? '-' : response.Label_finish
                        }, 
                        {
                            name:'Colors', 
                            desc: response.Label_color === '' ? '-' : response.Label_color
                        }
                    ]

                    this.information = [
                        {
                            title:'Pallet type', 
                            placeHolder: response.Pallet_type === '' ? '-' : response.Pallet_type
                        }, 
                        {
                            title:'Layers', 
                            placeHolder: response.Pallet_layers === '' ? '-' : response.Pallet_layers
                        }, 
                        {
                            title:'Boxes per layer', 
                            placeHolder: response.Pallet_boxes_per_layer === '' ? '-' : response.Pallet_boxes_per_layer
                        },
                        {
                            title:'Boxes per pallet', 
                            placeHolder: response.Pallet_boxes_per_pallet === '' ? '-' : response.Pallet_boxes_per_pallet
                        }
                    ]
                        if(response.Pallet_label_imagen){
                            this.Pallet_label_imagen =  `data:image/png;base64,${response.Pallet_label_imagen}`;

                        }else {
                            this.Pallet_label_imagen = ''
                        }
                        if(response.Box_label_imagen) {
                            this.Box_label_imagen = `data:image/png;base64,${response.Box_label_imagen}`;

                        }else {
                            this.Box_label_imagen  = ''
                        }
                  
                    this.Pallet_comments = response.Pallet_comments  === '' ? '-' : response.Pallet_comments; 

                    this.pallet = [
                        {
                            title:'Box', 
                            placeHolder: response.Box_name === '' ? '-' : response.Box_name
                            }, 
                        {
                            title:'Units per Box', 
                            placeHolder: response.Box_units_per === '' ? '-' : response.Box_units_per
                        }
                    ]

                    this.analytics = [];
                    response.analytics.forEach((item: any) => {
                        this.analytics.push({
                            Active: item.Active  === '' ? '-' : item.Active,
                            Code: item.Code === '' ? '-' : item.Code,
                            PVP: item.PVP === '' ? '-' : item.PVP,
                            Analitycs: item.Analitycs === '' ? '-' : item.Analitycs,
                            Periodicity: item.Periodicity === '' ? '-' : item.Periodicity,
                            Observations: item.Observations === '' ? '-' : item.Observations,
                            Quantity : item.Quantity === '' ? '-' : item.Quantity,
                            Source : item.Source === '' ? '-' : item.Source,
                            Precio_Analiticas: item.Precio_Analiticas  === '' ? '-' : item.Precio_Analiticas
                        });
                    });

                    this.listAnalyticsPVP = []
                    
                    if (response.analytics && Array.isArray(response.analytics)) {
                        response.analytics.forEach((item: any) => {
                            this.listAnalyticsPVP.push({
                            Precio_Analiticas: item
                            });
                        });
                    } else {
                        console.warn('No hay datos en response.analytics o no es un arreglo');
                    }

                    this.selectedOptionCap = {
                        Forma : response.Cap_tapa === '' ? '-' : response.Cap_tapa,
                        Diametro : response.Cap_Boca === '' ? '-' : response.Cap_Boca,
                        Color : response.Cap_color === '' ? '-' : response.Cap_color,
                        Sleever  : response.Cap_sleever 
                    }

                    this.status = response.Status === '' ? '-' : response.Status
                    
                    if(response.Label_config === "No label") {
                        this.noLabel = true
                    }else {
                        this.noLabel = false
                    }
                    this.noAnalytics  = response.No_analitycs
                    this.Filling_batch_other = response.Filling_batch_others
                    this.Filling_exp_date_other = response.Filling_exp_date_others

                    this.Files = [] 
                    response.files.forEach((item: any) => {
                        this.Files.push({
                            Code: item.Code,
                            Name: item.Name,
                            File: item.File
                        })
                    })
                   

                    this.fetchOptions();
                    this.calculateTotalPVP()
                    this.calcularPorcentajesFormulation();
                    this.calcularPorcentajesBote(); 
                    this.calcularPorcentajesLabel();
                    this.calcularPorcentajesPalettizing();
                    this.calcularPorcentajeAnalytics();
                    this.DownloadClientSummary();
                    this.DownloadDataSheet();
                    this.RelateBote();
                    this.RelateCap();
                    this.getEnumsFromMetadata();
                    this.getLotes();
                    this.getBBDFormat();

                    this.getEnumsFromMetadata().then(({ tiposLote, tiposBBD }) => {
                        this.tiposLote = tiposLote;
                        this.tiposBBD = tiposBBD;
                    });

                }else {                   
                    this.Suitable_vegetarians = response.Suitable_vegetarians !== undefined ? response.Suitable_vegetarians : false;
                    this.Suitable_vegans = response.Suitable_vegans !== undefined ? response.Suitable_vegans : false;
                    this.Natural_colors = response.Natural_colors !== undefined ? response.Natural_colors : false;
                    this.Natural_flavor = response.Natural_flavor !== undefined ? response.Natural_flavor : false;
                    this.comments = response.Nutris_comments !== undefined ? response.Nutris_comments : '-';
                    this.Take_sample = response.Take_sample !== undefined ? response.Take_sample : '';

                    this.Customer_accepted = response.Customer_accepted !== undefined ? response.Customer_accepted : false;
                    this.Tomar_muestra = response.Tomar_muestra !== undefined ? response.Tomar_muestra : false;

                    this.listInputBn = [
                        {
                           placeHolder: response.Base !== undefined ? response.Base : '-'
                        },
                        { 
                            placeHolder: response.Sugar_composition !== undefined ? response.Sugar_composition : '-'
                        },
                        {
                            placeHolder: response.Cover !== undefined ? response.Cover : '-'
                        }
                    ]

                    this.listInputB = [ 
                        {
                            placeHolder: response.Color !== undefined ? response.Color : '-'
                            
                        },
                        {
                            placeHolder: response.Flavour !== undefined ? response.Flavour : '-'
                            
                        },
                        {
                            placeHolder: response.Size !== undefined ? response.Size : '-'

                        },
                        {
                            placeHolder: response.Serving !== undefined ? response.Serving : '-'
                        }
                    ]

                    if(response.Imagen) {
                        this.imgBase64 = `data:image/png;base64,${response.Imagen}`;

                    }else {
                        this.imgBase64 = ''
                    }
                    
                    this.Shape  = response.Shape !== undefined ? response.Shape : '-'


                    this.recipe = [];
                    response.recipe.forEach((item: any) => {
                        this.recipe.push({
                            Active: item.Active === '' ? '-' : item.Active,
                            Source_used: item.Source_used === '' ? '-' : item.Source_used,
                            Quantity_of_active_per_serving: item.Quantity_of_active_per_serving === '' ? '-' : item.Quantity_of_active_per_serving,
                            EU_RDA: item.EU_RDA === '' ? '-' : item.EU_RDA,
                        });
                    });

                    this.RG37 = response.Code === '' ? '-' : response.Code
                    this.status = response.Status === '' ? '-' : response.Status
                    this.Code = response.Code === '' ? '-' : response.Code;
                    this.name = response.Product_name === '' ? '-' : response.Product_name ;
                    this.Product_name_2 = response.Product_name_2 === '' ? '-' : response.Product_name_2
                    const customerLogo = localStorage.getItem('Customer_logo');
                    if(customerLogo) {
                        this.Logo = `data:image/png;base64,${customerLogo} `
                    }else {
                        this.Logo = ''
                    }
                    // this.Estimated_date = response.Estimated_date === '' ? '-' : response.Estimated_date 
                    // this.Deadline_date = response.Deadline_date === '' ? '' : response.Deadline_date 

                    this.calcularPorcentajesFormulation();
                }
            } catch (error) { 
                console.error("Error:", error); 
            }finally {
                this.isLoading = false; // Desactiva el loading después de la llamada a la API
            }
            
        },
        watch: {
            isLoading(newVal) {
                if (!newVal) {
                    this.$nextTick(() => {
                        this.restoreContainerState();
                    });
                }
            }
        },
        
        methods: {
            async fetchOptions() { 
                try { 
                    const response = await callApi(`Atributos?tenant=nutris&$expand=valoresAtributos`); 
                    this.optionsSize = response.data.value[23].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsSizeLabel = response.data.value[16].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsDiameter = response.data.value[5].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsMaterial = response.data.value[21].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsBoca = response.data.value[22].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsForma = response.data.value[24].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsDThread = response.data.value[22].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsFinish = response.data.value[8].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsLabelMaterial = response.data.value[9].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsColorLabel = response.data.value[10].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsColorBote = response.data.value[20].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsColorBoteHEX = response.data.value[20].valoresAtributos.filter((attr: { Color_HEX: string; }) => attr.Color_HEX !== '');
                    this.optionsShapecover = response.data.value[19].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                    this.optionsColorcover = response.data.value[18].valoresAtributos.filter((attr: { Value: string; }) => attr.Value !== '');
                   
                } catch (error) { 
                    console.error('Error al obtener los datos:', error); 

                } 
            },
            decodeEnumName(name: string | null): string {
                if (!name) return '';
                return name
                .replace(/_x0020_/g, ' ')
                .replace(/_x002F_/g, '/')
                .replace(/_x002E_/g, '.')
                .replace(/_x0028_/g, '(')
                .replace(/_x0029_/g, ')');
            },

            extractEnum(xmlDoc: Document, enumName: string) {
                const enumType = Array.from(xmlDoc.getElementsByTagName("EnumType"))
                .find(e => e.getAttribute("Name") === enumName);
                if (!enumType) return [];

                const members = Array.from(enumType.getElementsByTagName("Member")).map(member => ({
                name: member.getAttribute("Name"),
                value: member.getAttribute("Value")
                }));

                return members.filter(m => {
                const decodedName = this.decodeEnumName(m.name);
                return decodedName.trim() !== '';
                });
            },

            async getEnumsFromMetadata() {
                const url = 'http://nutris.bca-365.com:7048/BC/api/beta/$metadata';
                const username = import.meta.env.VITE_USERNAME;
                const password = import.meta.env.VITE_PASSWORD;
                const credentials = `${username}:${password}`;
                const base64Credentials = btoa(credentials);

                try {
                const response = await fetch(url, {
                    headers: {
                    'Authorization': `Basic ${base64Credentials}`
                    }
                });
                if (!response.ok) throw new Error(`Error al descargar el XML: ${response.statusText}`);
                const xmlString = await response.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlString, "application/xml");

                const tiposLote = this.extractEnum(xmlDoc, "tiposLote");
                const tiposBBD = this.extractEnum(xmlDoc, "tiposBBD");

                return { tiposLote, tiposBBD };
                } catch (error) {
                console.error("Error extrayendo enums del metadata:", error);
                return { tiposLote: [], tiposBBD: [] };
                }
            },

            toggleContent(ev: MouseEvent) {
                let target = ev.target as HTMLElement;
                // Sube en el DOM hasta encontrar el data-toggle-target
                while (target && !target.dataset.toggleTarget && target !== document.body) {
                    target = target.parentElement as HTMLElement;
                }
                if (!target || !target.dataset.toggleTarget) {
                    console.log('No se encontró data-toggle-target en el elemento clickeado');
                    return;
                }
                const containerId = target.dataset.toggleTarget;
                const container = document.getElementById(containerId);
                if (!container) {
                    console.log('No se encontró el contenedor:', containerId);
                    return;
                }
                const arrow = target;

                const isActive = container.classList.contains('active');
                if (isActive) {
                    container.classList.remove('active');
                    this.adjustHeight(container);
                    arrow.classList.remove('arrow-t-r');
                    return;
                }

                // Cierra todos los demás
                document.querySelectorAll('.container-toggle.active').forEach(el => {
                    el.classList.remove('active');
                    this.adjustHeight(el as HTMLElement);
                });
                document.querySelectorAll('.arrow-t.arrow-t-r').forEach(el => {
                    el.classList.remove('arrow-t-r');
                });

                // Abre el actual
                container.classList.add('active');
                this.adjustHeight(container);
                arrow.classList.add('arrow-t-r');
            },

            restoreContainerState() {
                const container2 = document.getElementById('container-toggle-2');
                const container3 = document.getElementById('container-toggle-3');
                const container4 = document.getElementById('container-toggle-4');
                const arrow2 = document.getElementById('id-1');
                const arrow3 = document.getElementById('id-2');
                const arrow4 = document.getElementById('id-3');

                console.log('Restoring container state, tipo:', this.tipo);

                // Para productos tipo "Bulk", solo manejar el paletizado
                if (this.tipo === 'Bulk') {
                    console.log('Producto tipo Bulk detectado, manejando solo paletizado');
                    
                    if (localStorage.getItem('container-toggle-4') === 'open') {
                        container4?.classList.add('active');
                        this.adjustHeight(container4);
                        arrow4?.classList.add('arrow-t-r');
                    }
                    return;
                }

                // Para productos tipo "Bote", manejar todos los contenedores
                if (localStorage.getItem('container-toggle-2') === 'open') {
                    console.log('container-toggle-2: '+ localStorage.getItem('container-toggle-2'))
                    container2?.classList.add('active');
                    this.adjustHeight(container2);
                    arrow2?.classList.add('arrow-t-r');
                }

                if (localStorage.getItem('container-toggle-3') === 'open') {
                    container3?.classList.add('active');
                    this.adjustHeight(container3);
                    arrow3?.classList.add('arrow-t-r');
                }

                 if (localStorage.getItem('container-toggle-4') === 'open') {
                    container4?.classList.add('active');
                    this.adjustHeight(container4);
                    arrow4?.classList.add('arrow-t-r');
                }
            },

            adjustHeight(element: any) {
                if (!element) {
                    console.log('adjustHeight: element is null or undefined');
                    return;
                }

                console.log('adjustHeight called for element:', element.id, 'active:', element.classList.contains('active'));

                if (element.classList.contains('active')) {
                    element.style.display = 'block';
                    element.style.maxHeight = 'none';
                    element.style.overflow = 'hidden';
                    
                    const height = element.scrollHeight;
                    console.log('Element height:', height);
                    
                    element.style.maxHeight = '0px';
                    
                    void element.offsetHeight;
                    
                    element.style.maxHeight = `${height}px`;
                } else {
                    const currentHeight = element.scrollHeight;
                    element.style.maxHeight = `${currentHeight}px`;
                    
                    void element.offsetHeight;
                    
                    element.style.maxHeight = '0px';
                    
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 300); // 300ms es la duración de la transición
                }
            },

            removeActiveClass(contentTarget: any[]){
                
                contentTarget.forEach((target)=> target.classList.contains('active') ? target.classList.remove('active') : null);
            },

            removeArrowRt(contentTarget: any[]){
              
                contentTarget.forEach((target)=> target.classList.contains('arrow-t-r') ? target.classList.remove('arrow-t-r') : null);
            },

            calculateTotalPVP() {
                if(this.analytics?.[0]?.Precio_Analiticas) {
                    this.sumAnalytics = this.analytics[0].Precio_Analiticas;
                }else {
                    this.sumAnalytics = 0
                }
            },

            calcularPorcentajesFormulation() {
                const grupo50 = [
                    ...this.listInputBn.map(input => input.placeHolder),
                    ...this.listInputB.map(input => input.placeHolder),
                    this.Shape,
                    this.imgBase64
                ];

                const grupo30 = this.recipe;

                const condicion100 = this.Customer_accepted === true;

                const grupo50Completo = grupo50.every(campo => 
                    campo !== null && campo !== undefined && campo !== "" && campo !== "-"
                );

                const grupo30Completo = grupo30 && grupo30.length > 0;

                let porcentaje = 0;

                if (condicion100) {
                    porcentaje = 100;
                } else {
                    if (grupo50Completo) porcentaje += 50;
                    if (grupo30Completo) porcentaje += 30;
                }

                this.porcentajeLlenos = porcentaje;
            },

            calcularPorcentajesBote() {
                const campos = [
                    this.Product_name_2,
                    this.Bote_imagen,
                    ...this.bottle.map(input => input.desc),
                    this.Filling_batch,
                    this.Filling_exp_date,
                    this.Filling_location 
                ];
                this.totalCamposBote = campos.length;
                const camposLlenos = campos.filter(campo => campo !== null && campo !== undefined && campo !== "" && campo !== "-");
                this.totalCamposLlenosBote = camposLlenos.length;
                if (this.totalCamposBote > 0) {
                    const porcentaje = (this.totalCamposLlenosBote / this.totalCamposBote) * 100;
                    this.porcentajeLlenosBote = porcentaje;
                } else {
                    this.porcentajeLlenosBote = 0;
                }
            },

            calcularPorcentajesLabel() {
                if (this.noLabel) {
                    this.porcentajeLlenosLabel = 100;
                    this.totalCamposLabel = this.gummyDna.length;
                    this.totalCamposLlenosLabel = this.gummyDna.length;
                    return;
                }
                const campos = [
                    ...this.gummyDna.map(input => input.desc),
                ];
                this.totalCamposLabel = campos.length;
                const camposLlenos = campos.filter(campo => campo !== null && campo !== undefined && campo !== "" && campo !== "-");
                this.totalCamposLlenosLabel = camposLlenos.length;
                if (this.totalCamposLabel > 0) {
                    const porcentaje = (this.totalCamposLlenosLabel / this.totalCamposLabel) * 100;
                    this.porcentajeLlenosLabel = porcentaje;
                } else {
                    this.porcentajeLlenosLabel = 0;
                }
            },

            calcularPorcentajesPalettizing() {
                let campos = [
                    ...this.information.map(input => input.placeHolder),
                    ...this.pallet.map(input => input.placeHolder),
                    this.Pallet_label_imagen,
                    this.Box_label_imagen
                    // this.Pallet_comments
                ];
                console.log("campos paletizados", campos)
                
                // Para productos tipo "Bulk", incluir las instrucciones de llenado
                // if (this.tipo === 'Bulk') {
                //     campos = [
                //         ...campos,
                //         this.Filling_batch,
                //         this.Filling_exp_date,
                //         this.Filling_location
                //     ];
                // }
                
                this.totalCamposPalettizing = campos.length;
                const camposLlenos = campos.filter(campo => campo !== null && campo !== undefined && campo !== "" && campo !== "-");
                this.totalCamposLlenosPalettizing = camposLlenos.length;
                if (this.totalCamposPalettizing > 0) {
                    const porcentaje = (this.totalCamposLlenosPalettizing / this.totalCamposPalettizing) * 100;
                    this.porcentajeLlenosPalettizing = porcentaje;
                } else {
                    this.porcentajeLlenosPalettizing = 0;
                }
            },

            calcularPorcentajeAnalytics() {
                const porcentajeAnalytics = this.analytics && this.analytics.length > 0 ? 100 : 0;
                this.porcentajeLlenosAnalytics = porcentajeAnalytics;
            },

            formatPercent(value: number) {
                if (typeof value !== 'number' || isNaN(value)) return 0;
                return Math.round(value);
            },

            async takeSample() {
                const data = {
                    Tomar_muestra : this.Tomar_muestra,
                }
                try {
                    const response = await callApiPatch(`Formulation('${this.RG37}')`, data);
                    if (response) {
                        console.log(response)
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                }
            },

            async noLabelCheck() {
                this.isLoading = true;
                let label: string  = ""
                if(this.noLabel === true){
                    label  = "No label"
                }else {
                    label = "Label"
                }

                const data = {
                    Label_config : label,
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        // Update local data instead of reloading the page
                        console.log('Label configuration updated successfully:', response);
                        // Optionally emit an event to notify parent component
                        this.$emit('label-config-updated', response);
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                } finally {
                    this.isLoading = false;
                }
            },

            async noAnalyticsCheck() {
                this.isLoading = true;

                const data = {
                    No_analitycs : this.noAnalytics,
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        // Update local data instead of reloading the page
                        console.log('Analytics configuration updated successfully:', response);
                        // Optionally emit an event to notify parent component
                        this.$emit('analytics-config-updated', response);
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                } finally {
                    this.isLoading = false;
                }
            },

            

            async PalletComments() {
                const data = {
                    Pallet_comments : this.Pallet_comments

                }
                  try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        console.log('Datos actualizados:', response);
                    
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                }
            },

            async DownloadClientSummary() {
                this.isLoading = true;
                const data = {
                    numeroRG: this.Code,
                };

                try {
                    const response = await callApiPost(
                    `clientSummary(1)/Microsoft.NAV.Download`,
                    data
                    );

                    if (response.data && response.data.value) {

                        const base64Data = response.data.value;
                        const binaryData = atob(base64Data);
                        const byteNumbers = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            byteNumbers[i] = binaryData.charCodeAt(i);
                        }
                        const blob = new Blob([byteNumbers], { type: "application/pdf" });

     
                        this.ClientSummaryLink = window.URL.createObjectURL(blob);

                        } else {
                            this.ClientSummaryLink = ''
                        }
                        } catch (error) {
                            this.ClientSummaryLink = ''
                        } finally {
                            this.isLoading = false;
                        }
            },

            async DownloadDataSheet() {
                this.isLoading = true;
                const data = {
                    numeroRG: this.Code,
                };

                try {
                    const response = await callApiPost(
                    `dataSheet(1)/Microsoft.NAV.Download`,
                    data
                    );

                    if (response.data && response.data.value) {

                        const base64Data = response.data.value;
                        const binaryData = atob(base64Data);
                        const byteNumbers = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            byteNumbers[i] = binaryData.charCodeAt(i);
                        }
                        const blob = new Blob([byteNumbers], { type: "application/pdf" });

     
                        this.DataSheetLink = window.URL.createObjectURL(blob);

                       
                    } else {
                        this.DataSheetLink = ''
                    }
                } catch (error) {
                    this.DataSheetLink = ''
                } finally {
                    this.isLoading = false;
                }
            },

            async RelateBote(){
                try {
                    const response = await callApi(`/RelacionBote`);
                    if (response) {
                        this.boteData = response.data.value;
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                }
            },
            
            async RelateCap() {
                try {
                    const response = await callApi(`/RelacionTapa`);
                    if (response) {
                       
                        this.capData = response.data.value;
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                }
            },
            
            handleConfirm() {
                this.isThankYouModalVisible = true; // Abre el segundo modal directamente
            },

            async saveName() {
                this.isLoading = true;

                const data = {
                        Product_name_2 : this.Product_name_2
                    }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        // Update local data instead of reloading the page
                        console.log('Product name updated successfully:', response);
                        // Optionally emit an event to notify parent component
                        this.$emit('product-name-updated', response);
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                } finally {
                    this.isLoading = false
                }
            },

            async saveLote() {
                const data = {
                    Filling_batch : this.Filling_batch
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        // Recargar la página después de una actualización exitosa
                        // window.location.reload();
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                } 
            },

            async saveLoteOther() {
                this.isLoteOtherLoading = true;
                let data = {};
                if (this.tipo === 'Bote') {
                    data = { Filling_batch_others: this.Filling_batch_other };
                } else {
                    data = { Filling_batch_others: this.Filling_batch_other };
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        this.loteSent = true;
                        setTimeout(() => { this.loteSent = false; }, 2000);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                } finally {
                    this.isLoteOtherLoading = false;
                }
            },

            async saveBBD() {

                const data = {
                    Filling_exp_date : this.Filling_exp_date
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        // Recargar la página después de una actualización exitosa
                        // window.location.reload();
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                } 
            },

            async saveBBDOther() {
                this.isBBDOtherLoading = true;
                let data = {};
                if (this.tipo === 'Bote') {
                    data = { Filling_exp_date_others: this.Filling_exp_date_other };
                } else {
                    data = {Filling_exp_date_others: this.Filling_exp_date_other };
                }
                try {
                    const response = await callApiPatch(`CustomizeRG35('${this.id}')`, data);
                    if (response) {
                        this.bbdSent = true;
                        setTimeout(() => { this.bbdSent = false; }, 2000);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos:', error); 
                } finally {
                    this.isBBDOtherLoading = false;
                }
            },

            setAccordionOpen(openIndex: number, total: number) {
                // No aplicar lógica de acordeón para productos Bulk
                if (this.tipo === 'Bulk') {
                    console.log('Producto Bulk detectado, saltando lógica de acordeón');
                    return;
                }
                
                for (let i = 2; i <= total; i++) {
                    if (i === openIndex) {
                    localStorage.setItem(`container-toggle-${i}`, 'open');
                    } else {
                    localStorage.setItem(`container-toggle-${i}`, 'closed');
                    }
                }
            },

            clearAccordionState() {
                for (let i = 2; i <= 4; i++) {
                    localStorage.removeItem(`container-toggle-${i}`);
                }
            },

            handleLabelOptionsUpdated(response: any) {
                if (response) {
                    let newLabelSize, newLabelMaterial, newLabelFinish, newLabelColors;
                    
                    if (response.response && response.sentData) {
                        const apiResponse = response.response;
                        const sentData = response.sentData;
                        
                        newLabelSize = apiResponse.Label_size || apiResponse.label_size || sentData.Label_size || '';
                        newLabelMaterial = apiResponse.Label_material || apiResponse.label_material || sentData.Label_material || '';
                        newLabelFinish = apiResponse.Label_finish || apiResponse.label_finish || sentData.Label_finish || '';
                        newLabelColors = apiResponse.Label_Color || apiResponse.Label_colors || apiResponse.label_colors || sentData.Label_Color || '';
                    } else if (response.Label_size !== undefined || response.label_size !== undefined) {
                        newLabelSize = response.Label_size || response.label_size || '';
                        newLabelMaterial = response.Label_material || response.label_material || '';
                        newLabelFinish = response.Label_finish || response.label_finish || '';
                        newLabelColors = response.Label_Color || response.Label_colors || response.label_colors || '';
                    } else {
                        newLabelSize = (this.selectedOptionLabels as any).label_size || '';
                        newLabelMaterial = (this.selectedOptionLabels as any).label_material || '';
                        newLabelFinish = (this.selectedOptionLabels as any).label_finish || '';
                        newLabelColors = (this.selectedOptionLabels as any).label_colors || '';
                    }
                    
                    this.selectedOptionLabels = {
                        label_size: newLabelSize,
                        label_material: newLabelMaterial,
                        label_finish: newLabelFinish,
                        label_colors: newLabelColors
                    };
                    
                    this.gummyDna = [
                        { name:'Size', desc: newLabelSize === '' ? '-' : newLabelSize },
                        { name:'Material', desc: newLabelMaterial === '' ? '-' : newLabelMaterial },
                        { name:'Finish', desc: newLabelFinish === '' ? '-' : newLabelFinish },
                        { name:'Colors', desc: newLabelColors === '' ? '-' : newLabelColors }
                    ];
                    
                    this.calcularPorcentajesLabel();
                    this.$forceUpdate();
                }
            },

            handleDraftLabelUpdated(response: any) {
                if (response && response.Label_imagen) {
                    this.Label_Imagen_Final = `data:image/png;base64,${response.Label_imagen}`;
                    this.$forceUpdate();
                }
            },

            handleBoxLabelUpdated(response: any) {
                console.log('Box label updated:', response);
                // Update the Box_label_imagen with the new data
                if (response && response.Box_label_imagen) {
                    this.Box_label_imagen = `data:image/png;base64,${response.Box_label_imagen}`;
                    // Force Vue to re-render the component
                    this.$forceUpdate();
                }
                // The modal will close automatically, no page reload needed
            },

            handlePalletLabelUpdated(response: any) {
                console.log('Pallet label updated:', response);
                // Update the Pallet_label_imagen with the new data
                if (response && response.Pallet_label_imagen) {
                    this.Pallet_label_imagen = `data:image/png;base64,${response.Pallet_label_imagen}`;
                    // Force Vue to re-render the component
                    this.$forceUpdate();
                }
                // The modal will close automatically, no page reload needed
            },

            async getLotes() {
                try {
                    const response = await callApi(`/LotFormat`);
                    if (response) {
                        this.LotesList = response.data.value;
                        console.log(this.LotesList)
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                }
            },
            async getBBDFormat() {
                try {
                    const response = await callApi(`/BBDFormat`);
                    if (response) {
                        this.BBDList = response.data.value;
                        console.log(this.BBDList)
                    } else {
                        console.error('Error en la respuesta de la API:', response);
                    }
                } catch (error) {
                    console.error('Error en la respuesta de la API:', Response);
                }
            },
            initializeTooltips() {
                this.destroyTooltips();
                this.$nextTick(() => {
                    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                    [...tooltipTriggerList].forEach(tooltipTriggerEl => {
                        // Si ya hay un tooltip en el elemento, destrúyelo
                        if ((tooltipTriggerEl as any)._bootstrapTooltip) {
                            (tooltipTriggerEl as any)._bootstrapTooltip.dispose();
                        }
                        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                            trigger: 'hover',
                            placement: 'top',
                            html: true
                        });
                        // Guarda la instancia en el propio elemento para futuras limpiezas
                        (tooltipTriggerEl as any)._bootstrapTooltip = tooltip;
                        this.tooltips.push(tooltip);
                    });
                });
            },
            destroyTooltips() {
                // Destruye todos los tooltips y elimina la referencia del elemento
                this.tooltips.forEach(tooltip => {
                    // Solo llamar dispose si el elemento aún existe
                    const el = (tooltip as any)._element;
                    if (el) {
                        tooltip.dispose();
                        if ((el as any)._bootstrapTooltip) {
                            delete (el as any)._bootstrapTooltip;
                        }
                    }
                });
                this.tooltips = [];
            },
            getSwitchValue(idx: number): boolean {
                switch(idx) {
                    case 0: return !!this.Suitable_vegetarians;
                    case 1: return !!this.Suitable_vegans;
                    case 2: return !!this.Natural_colors;
                    case 3: return !!this.Natural_flavor;
                    default: return false;
                }
            },
            getStepColor(step: number): string {
                const verde = '#8ED300';
                const verdeSuave = '#FFA500';
                const gris = '#E5E5E5';
                if (this.prefijo === 'RG37') {
                    if (step === 1) {
                        if (this.porcentajeLlenos === 100 && (this.status === 'Cerrado cliente' || this.status === 'Cerrado cliente y calidad')) return verde;
                        if (this.porcentajeLlenos > 0 && this.status === 'Desarrollo') return verdeSuave;
                        return gris;
                    }
                    
               
                }
                if (this.prefijo === 'RG37') {
                  
                    if (step === 5) {
                        if (this.status === 'Cerrado cliente y calidad') return verde;
                        if (this.status === 'Cerrado cliente') return verdeSuave;
                        return gris;
                    }
                    return gris;
                }

                // RG35: el paso 1 depende de status37 si existe
                if (this.prefijo === 'RG35' && step === 1 && this.status37) {
                    if (this.status37 === true) return verde;
                    if (this.status37 === false) return verdeSuave;
                    return gris;
                }

                if (this.prefijo === 'RG35' && step === 5 && this.status37) {
                    if (this.status37 === true) return verde;
                    if (this.status37 === false) return verdeSuave;
                    return gris;
                }
                // // Fase 1
                // if (step === 1) {
                //     if (this.porcentajeLlenos === 100 && this.status === 'Cerrado cliente y calidad') return verde;
                //     if (this.porcentajeLlenos > 0) return verdeSuave;
                //     return gris;
                // }
                // Fase 2
                if (step === 2) {
                    // Para productos tipo "Bulk", no se requiere bote ni label
                    if (this.tipo === 'Bulk') {
                        if (
                            this.porcentajeLlenosPalettizing === 100 &&
                            (this.noAnalytics || this.porcentajeLlenosAnalytics === 100) &&
                            (this.status === 'Cerrado cliente' || this.status === 'Cerrado cliente y calidad')
                        ) return verde;
                        if (this.porcentajeLlenosPalettizing > 0 || (this.noAnalytics || this.porcentajeLlenosAnalytics > 0)) return verdeSuave;
                        return gris;
                    } else {
                        // Para productos tipo "Bote", se requiere bote y label
                        if (
                            this.porcentajeLlenosBote === 100 &&
                            (this.porcentajeLlenosLabel === 100 || this.noLabel) &&
                            this.porcentajeLlenosPalettizing === 100 &&
                            (this.noAnalytics || this.porcentajeLlenosAnalytics === 100) &&
                            (this.status === 'Cerrado cliente' || this.status === 'Cerrado cliente y calidad')
                        ) return verde;
                        if ((this.porcentajeLlenosBote > 0 || this.porcentajeLlenosLabel > 0 || this.porcentajeLlenosPalettizing > 0 || (this.noAnalytics || this.porcentajeLlenosAnalytics > 0))) return verdeSuave;
                        return gris;
                    }
                }
                // Fase 3
                if (step === 3) {
                    if (this.status === 'Cerrado cliente y calidad') return verde;
                    if (this.status === 'Cerrado cliente') return verdeSuave;
                    return gris;
                }
                // Fase 4
                if (step === 4) {
                    if (this.status === 'Cerrado cliente y calidad') return verdeSuave;
                    return gris;
                }
                return gris;
            },
            getStepTextColor(step: number): string {
                if (this.prefijo === 'RG37' && step !== 1 && step !== 5 ) return '#989898';
                const bg = this.getStepColor(step);
                if (bg === '#8ED300' || bg === '#FFA500') return '#FFFFFF';
                return '#989898';
            },
            getStepBorder(step: number): string {
                const bg = this.getStepColor(step);
                if (bg === '#90EE90') return '#228B22'; // Dark green border for soft green phases
                return 'none';
            },
            toggleDownloadReports() {
                this.$nextTick(() => {
                    const el = document.querySelector('#container-toggle-h');
                    const arrow = document.querySelector('.arrow-download');
                    arrow?.classList.toggle('arrow-t-r');
                    el?.classList.toggle('active');
                });
            },
            downloadBase64File(base64String: string, fileName: string) {
                try {
                    // Decodificar el base64
                    const byteCharacters = atob(base64String);
                    const byteNumbers = new Array(byteCharacters.length);
                    
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    
                    const byteArray = new Uint8Array(byteNumbers);
                    
                    // Función para detectar el tipo de archivo desde el contenido base64
                    const detectFileTypeFromContent = (bytes: Uint8Array): string => {
                        // Detectar PDF por sus magic numbers
                        if (bytes.length >= 4 && 
                            bytes[0] === 0x25 && bytes[1] === 0x50 && 
                            bytes[2] === 0x44 && bytes[3] === 0x46) {
                            return 'pdf';
                        }
                        // Detectar DOC por sus magic numbers
                        if (bytes.length >= 8 && 
                            bytes[0] === 0xD0 && bytes[1] === 0xCF && 
                            bytes[2] === 0x11 && bytes[3] === 0xE0) {
                            return 'doc';
                        }
                        // Detectar DOCX por sus magic numbers
                        if (bytes.length >= 4 && 
                            bytes[0] === 0x50 && bytes[1] === 0x4B && 
                            bytes[2] === 0x03 && bytes[3] === 0x04) {
                            return 'docx';
                        }
                        // Detectar XLS por sus magic numbers
                        if (bytes.length >= 8 && 
                            bytes[0] === 0xD0 && bytes[1] === 0xCF && 
                            bytes[2] === 0x11 && bytes[3] === 0xE0) {
                            return 'xls';
                        }
                        // Detectar XLSX por sus magic numbers
                        if (bytes.length >= 4 && 
                            bytes[0] === 0x50 && bytes[1] === 0x4B && 
                            bytes[2] === 0x03 && bytes[3] === 0x04) {
                            return 'xlsx';
                        }
                        // Detectar TXT/CSV (texto plano)
                        if (bytes.length > 0) {
                            const text = new TextDecoder().decode(bytes);
                            if (text.includes(',') || text.includes(';')) {
                                return 'csv';
                            }
                            return 'txt';
                        }
                        return '';
                    };
                    
                    // Determinar el tipo MIME y extensión
                    let mimeType = 'application/octet-stream';
                    let fileExtension = fileName.toLowerCase().split('.').pop();
                    let finalFileName = fileName;
                    
                    // Si no hay extensión en el nombre del archivo, intentar detectarla del contenido
                    if (!fileExtension || fileExtension === fileName.toLowerCase()) {
                        const detectedType = detectFileTypeFromContent(byteArray);
                        if (detectedType) {
                            fileExtension = detectedType;
                            finalFileName = `${fileName}.${detectedType}`;
                        }
                    }
                    
                    // Determinar MIME type basado en la extensión
                    if (fileExtension === 'pdf') {
                        mimeType = 'application/pdf';
                    } else if (fileExtension === 'doc') {
                        mimeType = 'application/msword';
                    } else if (fileExtension === 'docx') {
                        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    } else if (fileExtension === 'xls') {
                        mimeType = 'application/vnd.ms-excel';
                    } else if (fileExtension === 'xlsx') {
                        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                    } else if (fileExtension === 'txt') {
                        mimeType = 'text/plain';
                    } else if (fileExtension === 'csv') {
                        mimeType = 'text/csv';
                    }
                    
                    const blob = new Blob([byteArray], { type: mimeType });
                    
                    // Si es PDF, abrir directamente en nueva pestaña
                    if (fileExtension === 'pdf') {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url, '_blank');
                        // Limpiar la URL después de un breve delay
                        setTimeout(() => {
                            window.URL.revokeObjectURL(url);
                        }, 1000);
                    } else {
                        // Para otros tipos de archivo, descargar normalmente
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = finalFileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                    }
                } catch (error) {
                    console.error('Error al procesar archivo:', error);
                }
            },

        },
        mounted() {
            this.initializeTooltips();
        },
        updated() {
            this.initializeTooltips();
        },
        beforeUnmount() {
            this.destroyTooltips();
        },
        computed: {
            canConfirmAndSign() {
                // Para productos tipo "Bote"
                if (this.tipo === 'Bote') {
                    return (
                        this.porcentajeLlenos === 100 &&
                        this.porcentajeLlenosBote === 100 &&
                        (this.porcentajeLlenosLabel === 100 || this.noLabel) &&
                        this.porcentajeLlenosPalettizing === 100 &&
                        (this.noAnalytics || this.porcentajeLlenosAnalytics === 100) &&
                        (this.status !== 'Cerrado cliente y calidad' && this.status !== 'Cerrado cliente')
                    );
                } else if (this.tipo === 'Bulk') {
                    // Para productos tipo "Bulk" (sin fases de bote ni label)
                    return (
                        this.porcentajeLlenos === 100 &&
                        this.porcentajeLlenosPalettizing === 100 &&
                        (this.noAnalytics || this.porcentajeLlenosAnalytics === 100) &&
                        (this.status !== 'Cerrado cliente y calidad' && this.status !== 'Cerrado cliente')
                    );
                }
                return false;
            }
        },
    }
    
</script>

<template>
    <Loading v-if="isLoading" />
    <!--header-->
    <div v-else>
    <section>
        <div class="header-order">
                <div class="hcol1">
                    <div class="row1-1 row">
                        <div class="col1-rh1 col-6">
                            <img v-if="Logo" :src="Logo" alt="logo" class="" style="width: 84px;">
                        </div>
                        <div class="country-rh1 col-6">
                            <p class="RalewayRegular font-18"> {{$t('orderView.Country')}}</p>
                            <div class=" d-flex gap-3 justify-content-end align-content-center">
                                <div class="col2-rh1 d-flex justify-content-end " v-if="LogoCountry">
                                    <img  :src="LogoCountry" :alt="country">
                                    <p>{{ country }}</p>
                                </div>
                               
                                <div class="col2-rh1 d-flex justify-content-end " v-if="LogoCountry2">
                                    <img v-if="LogoCountry2" :src="LogoCountry2" :alt="country2">
                                    <p>{{ country2 }}</p>
                                </div>
                                
                                <div class="col2-rh1 d-flex justify-content-end " v-if="LogoCountry3">
                                    <img  :src="LogoCountry3" :alt="country3">
                                    <p>{{ country3 }}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="row2-1">
                        <div class="col1-rh2 d-flex ">
                        <p class="RalewayBold font-21-23"></p><span><p class="RalewayRegular font-21-23">{{ Code }}</p></span>
                        </div>
                    </div>
                    <div class="row3-1 row">
                        <div class="col2-rh3 col-6">
                            <p class="RalewayBold font-21-23">{{ name }}</p>
                            <p class="RalewayLight font-21-23">{{ Product_name_2 }}</p> 
                        </div>
                        <div class="col3-rh3 col-6">
                            <span class="MulishBold font-21-23"><p>MOQ {{MOQ}} units</p></span> 
                            <span ><p class="MulishLight font-21-23">{{Unit_price}} €/ unit</p></span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="steps-row">
                            <StepActiveOne :background="getStepColor(1)" :color="getStepTextColor(1)" :border="getStepBorder(1)" />
                            <StepActiveNew :background="getStepColor(5)" :color="getStepTextColor(5)" :border="getStepBorder(5)" />
                            <StepActiveTwo :background="getStepColor(2)" :color="getStepTextColor(2)" :Customer_accepted="Customer_accepted" :border="getStepBorder(2)" />
                            <StepActiveThree :background="getStepColor(3)" :color="getStepTextColor(3)" :StatusFinal="status" :border="getStepBorder(3)" />
                            <StepActiveFour :background="getStepColor(4)" :color="getStepTextColor(4)" :StatusFinal="status" :border="getStepBorder(4)" />
                        </div>
                    </div>
                </div>
                <!--col2-->
                <div class="hcol2">
                    <div class="rowh1-2 row" v-if="status == 'Cerrado Cliente' || status == 'Cerrado cliente y calidad'">
                        <div class="colh1-r1 col-4 ">
                            <p class="RalewayBold font-16">{{$t('orderView.NutrisCode1')}} <br/>{{$t('orderView.NutrisCode2')}} </p>
                        </div>
                        <div class="colh2-r1 col-8 d-flex  ">
                           <p class="font-28 ">{{ Nutris_Code }}</p>
                        </div>
                    </div>
                    <div class="rowh2-2 d-flex">
                        <div class="colh1-r2">
                        </div>
                    </div>
                    <div class="rowh3-2 row">
                        <div class="colh2-r3 col-12 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center justify-content-start">
                                <p class="font-16 RalewayRegular" >{{$t('orderView.Estimated')}}</p>
                                <div data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="$t('orderView.EstimatedTooltip')">
                                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </div>
                            </div>
                            <p class="MuseoSemiBold font-18" v-if="estimated_date != '0001-01-01'">{{ estimated_date.split('-').reverse().join('/')}}</p>
                           
                        </div>
                        <div class="colh3-r3 col-12 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center justify-content-start">
                                <p class="font-16 RalewayRegular" >{{$t('orderView.Calculated')}}</p>
                                <div data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="$t('orderView.CalculatedTooltip')">
                                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </div>
                            </div>
                            <p class="MuseoSemiBold redDate font-18" v-if="Deadline_date != '0001-01-01'">{{ Deadline_date.split('-').reverse().join('/') }}</p>
                        </div>
                    </div>
                    <div class="rowh4-2" v-if="Files && Files.length > 0">
                        <div class="colh1-r4">
                            <button class="font-20 RalewayRegular" @click="toggleDownloadReports">{{$t('orderView.DownloadReports')}} <img class="arrow-download" src="/iconbuttons/download-arrow.svg" alt="download"></button>
                            <div id="container-toggle-h" class="download-t disabled">
                                <ul class="RalewaySemiBold font-20">
                                    <li v-for="file in Files" :key="file.Code">
                                        <a class="a" @click="downloadBase64File(file.File, file.Name)" style="cursor: pointer;">{{ file.Name }}</a>
                                    </li>
                                </ul>
                                <!-- <ul >
                                    
                                    <li><a class="a" v-if="ClientSummaryLink" :href="ClientSummaryLink" target="_blank">{{ $t("orderView.ClientSummary") }}</a></li>
                                    <li><a class="a"  v-if="DataSheetLink" :href="DataSheetLink" target="_blank">{{ $t("orderView.DataSheet")}}</a></li>
                                </ul> -->
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>
    <section>
            <div class="col-b">
                <div class="row-b">
                    <div class="toggle-from">
                        <div class="flex-elm-from row">
                            <div class="left-from col-8 d-flex ">
                                <h2 class="RalewayBold font-24">{{$t('orderView.Formulation')}}</h2>
                                <div class="l-data-from d-flex ">
                                </div>
                            </div>
                            <div class="right-from col-4 d-flex gap-1">
                            
                                <div class="line-from"></div>
                                <div :class="[porcentajeLlenos === 0 ? 'progress-bar-from-0' : 'progress-bar-from']"><p class="font-19 MuseoSemiBold">{{formatPercent(porcentajeLlenos)}}%</p></div>
                                <img @click="toggleContent" id="id-0" class="arrow-t" :data-toggle-target="'container-toggle-1'" src="/img/arrow-close-down.svg" alt="arrow open">
                            </div>
                        </div>
                        <!-- content -->
                        
                            
                            <div id="container-toggle-1" class="container-toggle ">
                                <div class="content-toggle-header">
                                    <div class="features-row">
                                        <div class="feature" v-for="(img, idx) in urlImg" :key="idx">
                                            <div class="img-icon-tags">
                                                <img class="w-79 h-79" :src="img.img" alt="tag">
                                            </div>
                                            <div class="paragraph-img-tags">
                                                <p class="font-12 RalewayRegular">{{$t(`orderView.CheckTitle[${idx}]`)}}</p>
                                            </div>
                                            <div class="content-switch">
                                                <label :for="`check-${idx+1}`" class="switch">
                                                    <input
                                                        type="checkbox"
                                                        class="check-all"
                                                        :id="`check-${idx+1}`"
                                                        :checked="getSwitchValue(idx)"
                                                        readonly
                                                        disabled="true"
                                                    >
                                                    <span class="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-t content-t-pdb">
                                    <div class="mb-4">
                                        <p class="font-16">{{ $t("Selectingtheseoptions") }}</p>
                                    </div>
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayBold">{{ $t("orderView.GUMMYDNA") }}</h3>
                                    </div>
                                    <div class="body-t">
                                        <div class="body-td" v-for="i in listInputBn.length" :key="i" :id="'bt-' + i">
                                            <p class="font-18 RalewayRegular">{{$t(`orderView.ListInputBn[${i - 1}]`)}}</p>
                                            <div class="data-t">
                                                <input class="font-20 RalewayRegular" type="text" name="" id="" :placeholder="listInputBn[i - 1].placeHolder" readonly>
                                                <div class="line-from"></div>
                                                <img src="/img/check-icon.svg" v-if="listInputBn[i - 1].placeHolder != '-'" alt="check">
                                            </div>
                                        </div>
                                        <div class="body-td" v-for="i in listInputB.length" :key="i" :id="'btd-' + i">
                                            <p class="font-18 RalewayRegular">{{$t(`orderView.ListInputB[${i - 1}]`)}}</p>
                                            <div class="data-t">
                                                <input class="font-20 RalewayRegular" type="text" name="" id="" :placeholder="listInputB[i - 1].placeHolder" readonly>
                                                <div class="line-from"></div>
                                                <img src="/img/check-icon.svg" v-if="listInputB[i - 1].placeHolder != '-'" alt="check">
                                            </div>
                                        </div>
                                        <div class="body-td" id="body-td-gommy">
                                            <p class="font-18 RalewayRegular">{{$t('orderView.Shape')}}</p>
                                            <div class="data-t">
                                                <div class="flex-gomi">
                                                    <div class="gomi-img">
                                                        <img v-if="imgBase64" :src="imgBase64" alt="gummy" >
                                                    </div>
                                                    <div class="gomi-content" id="important-gomi">
                                                        <h3 class="font-20 MulishBold">{{ Shape }}</h3>
                                                        <span>
                                                            <p class="font-16 RalewayRegular">{{ $t("orderView.TextInfoGummy") }}</p>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="line-from" id="line-from-gommy"></div>
                                                <img src="/img/check-icon.svg" v-if="imgBase64 != ''" alt="check">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-t content-t-pdb">
                                    <div class="head-t mb-3">
                                        <h3 class="font-18 RalewayBold">{{ $t('orderView.TheRecipe') }}</h3>
                                    </div>
                                   <!-- Encabezados -->
                                    <div class="body-t-flex header-row">
                                        <div class="body-data">
                                            <p class="RalewayBold font-14">{{$t('orderView.Active')}}</p>
                                        </div>
                                        <div class="body-data">
                                            <p class="RalewayBold font-14">{{$t('orderView.SourceUsed')}}</p>
                                        </div>
                                        <div class="body-data">
                                            <p class="RalewayBold font-14">{{$t('orderView.QuantityServing')}}</p>
                                        </div>
                                        <div class="body-data">
                                            <p class="RalewayBold font-14">% EU RDA</p>
                                        </div>
                                    </div>

                                    <!-- Filas de datos -->
                                    <div
                                    v-for="n in recipe.length"
                                    :key="n"
                                    :id="'recipe-' + n"
                                    class="d-flex gap-lg-4 data-row"
                                    >
                                        <div class="body-data pb-lg-4">
                                            <input type="text" :placeholder="recipe[n - 1].Active" readonly class="font-14 w-100">
                                        </div>
                                        <div class="body-data">
                                            <input type="text" :placeholder="recipe[n - 1].Source_used" readonly class="font-14">
                                        </div>
                                        <div class="body-data">
                                            <input type="text" :placeholder="recipe[n - 1].Quantity_of_active_per_serving" readonly class="font-14">
                                        </div>
                                        <div class="body-data">
                                            <input type="text" :placeholder="recipe[n - 1].EU_RDA" readonly class="font-14">
                                        </div>
                                    </div>
                                </div>
                                <div class="content-t content-t-pdb">
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayBold">{{$t('orderView.NutrisComments')}}</h3>
                                    </div>
                                    <div class="comments-area">
                                        <textarea class="font-16 RalewayRegular" v-model="comments" name="" id="" cols="150" rows="10" readonly styles="background: #f1f1f1;"></textarea>
                                    </div>
                                    
                                </div>
                                <div class="content-t content-t-pdb">
                                    <div class="content-td"  >
                                        <h3 class="font-18 RalewayBold">{{$t('orderView.DoYouNeedATest')}}</h3>
                                        <p class="font-16 RalewayRegular" >{{$t("orderView.TextAccept")}}</p>
                                        <div class="content-td-flex check-from-label" >
                                            <input type="checkbox" name="" id="" v-model="Tomar_muestra" style="cursor: pointer;"  :disabled="Customer_accepted || status === 'Cerrado cliente y calidad'"
                                            @change="takeSample">
                                            <p> <span class="RalewayBold font-18">{{$t("orderView.TakeSampleInLaboratory")}}</span> <span class="font-18 fontWeight300">(€ {{ Take_sample }})</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-atr" >
                                    
                                    <div class="btn-save-atr"  v-if="Customer_accepted" >
                                        <button class="btn-save-atr font-20 RalewayRegular">{{ $t("Approved") }}</button>
                                    </div>
                                    <div v-else>
                                        <button data-bs-toggle="modal" data-bs-target="#approveModal" class="btn-save-atr font-20 RalewayRegular">{{$t("orderView.ApproveTheRecipe")}}</button>
                                        <div class="paragraph-customize d-flex justify-content-end">
                                            <p class="font-16 RalewayRegular width384">{{$t("orderView.TextInformative")}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        
                        <!-- end content -->
                    </div>
                    <!-- 2 -->
                    <div v-if="Customer_accepted && prefijo == 'RG35'">
                        <div class="toggle-from m-top-toggle" v-if="tipo === 'Bote'">
                            <div class="flex-elm-from row">
                                <div class="left-from col-8 d-flex ">
                                    <h2 class="RalewayBold font-24"> Packaging/Envasado</h2>
                                
                                    <div class="l-data-from d-flex ">
                                    </div>
                                </div>
                                <div class="right-from col-4 d-flex gap-1">
                                
                                    <div class="line-from"></div>
                                    <div :class="[porcentajeLlenosBote === 0 ? 'progress-bar-from-0' : 'progress-bar-from']"><p class="font-19 MuseoSemiBold">{{formatPercent(porcentajeLlenosBote)}}%</p></div>
                                    <img @click="toggleContent" id="id-1" class="arrow-t" :data-toggle-target="'container-toggle-2'" src="/img/arrow-close-down.svg" alt="arrow open">
                                </div>
                            </div>
                            <!-- content -->
                            <div ref="containerToggle" id="container-toggle-2" class="container-toggle">

                                <div class="content-t content-t-pdb">
                                    <div class="body-t">
                                        <div class="body-td">
                                            <div class="d-flex gap-1">
                                                <p class="font-18 RalewayRegular">{{$t('orderView.TraddeName')}}</p>
                                                <div data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="$t('orderView.TraddeNameToltip')">
                                                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="data-t">
                                                <input  class="font-20 RalewayRegular" type="text"  name="" id="" :placeholder="Product_name_2" v-model="Product_name_2">
                                                <button @click="saveName()" class="btn-t RalewayMedium font-20" type="button"  v-if="!Customer_accepted && status == 'Desarrollo'"> {{ $t("orderView.Save") }}</button>
                                                <div v-if="Product_name_2 != '-'" class="line-from d-none d-xl-block"></div>
                                                <img src="/img/check-icon.svg" alt="check" class="d-none d-xl-block" v-if="Product_name_2 != '-'">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row content-t justify-content-center ">
                                    <div class="col-12 col-xl-10 ">
                                        <div class=" content-t-pdb">
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayExtraBold">{{ tipo }}</h3>
                                    </div>
                                    <div class="d-xl-flex gap-4  align-items-center w-100">
                                        <div class="body-t body-t-bottle" >
                                            <div class="body-td" v-for="i in bottle.length" :key="i">
                                                <p class="font-18 RalewayRegular">{{$t(`orderView.BottleA[${i-1}]`)}}</p>
                                                <div class="data-t">
                                                    <span><p class="font-20 RalewayBold">{{bottle[i-1].desc}}</p></span>
                                                    <div class="line-from" v-if="bottle[i-1].desc != '-'"></div>
                                                    <img src="/img/check-icon.svg" alt="check" v-if="bottle[i-1].desc != '-'">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bottle-img" >
                                            <img :src="Bote_imagen" alt="bottle" v-if="Bote_imagen">
                                            <p v-else>-</p> 
                                        </div>
                                        <div class="d-flex d-xl-none btn-edit-bottle col-12 col-lg-2 content-t-button d-flex align-items-center w-100" style="height: 180px;" v-if="status == 'Desarrollo'" >
                                            <button class="btn-t RalewayMedium font-20" type="button" data-bs-toggle="modal" data-bs-target="#sidebarRightModal3"><img src="/img/pencil-icon.svg" alt="edit"> {{ $t("Edit") }}</button>
                                        </div>
                                    </div>
                                        </div>

                                        <div class="">
                                            <div class="head-t">
                                                <h3 class="font-18 RalewayExtraBold">{{$t('orderView.FillingInstructions')}}</h3>
                                            </div>
                                            <div class="d-lg-flex gap-4 justify-content-center">
                                                <div class="body-t body-t-filling body-t-bottle " >
                                                    <div class="body-td">
                                                        <p class="font-18 RalewayRegular">{{$t('orderView.Batch')}}</p>
                                                        <div class="data-t">
                                                            <select v-model="Filling_batch" class="font-20 RalewayRegular form-select" @change="saveLote">
                                                                <option v-for="item in LotesList" :key="item.ID" :value="item.Format">
                                                                    {{ item.Format }}
                                                                </option>
                                                            </select>
                                                            <input v-if="Filling_batch.startsWith('OTHER')" type="text"  v-model="Filling_batch_other" class="font-20 RalewayRegular mt-2" maxlength="12" :class="{ 'input-sent': loteSent }">
                                                            <button v-if="Filling_batch.startsWith('OTHER')" class="btn-t RalewayMedium font-16 ml-2" type="button" @click="saveLoteOther" :disabled="isLoteOtherLoading">
                                                                <span v-if="isLoteOtherLoading">Enviando...</span>
                                                                <span v-else>Enviar</span>
                                                            </button>
                                                            <div class="line-from" v-if="Filling_batch != '-'" />
                                                            <img src="/img/check-icon.svg" alt="check" v-if="Filling_batch != '-'">
                                                         
                                                        </div>
                                                    </div>
                                                    <div class="body-td">
                                                        <p class="font-18 RalewayRegular">{{$t('orderView.ExpDate')}}</p>
                                                        <div class="data-t">
                                                            <select v-model="Filling_exp_date" class="font-20 RalewayRegular form-select" @change="saveBBD">
                                                                <option v-for="item in BBDList" :key="item.ID" :value="item.Format">
                                                                    {{ item.Format }}
                                                                </option>
                                                            </select>
                                                            <input v-if="Filling_exp_date === 'OTHER'" v-model="Filling_exp_date_other"  type="text" class="font-20 RalewayRegular mt-2" maxlength="12" :class="{ 'input-sent': bbdSent }">
                                                            <button v-if="Filling_exp_date === 'OTHER'" class="btn-t RalewayMedium font-16 ml-2" type="button" @click="saveBBDOther" :disabled="isBBDOtherLoading">
                                                                <span v-if="isBBDOtherLoading">Enviando...</span>
                                                                <span v-else>Enviar</span>
                                                            </button>
                                                            <div class="line-from"></div>
                                                            <img src="/img/check-icon.svg" alt="check" v-if="Filling_exp_date != '-'">
                                                          
                                                        </div>
                                                    </div>
                                                    <div class="body-td">
                                                        <p class="font-18 RalewayRegular">{{$t('orderView.Location')}}</p>
                                                        <div class="data-t">
                                                            <input type="text" name="" id="" :placeholder="Filling_location" class="font-20 RalewayRegular" readonly>
                                                            <div class="line-from"></div>
                                                            <img src="/img/check-icon.svg" alt="check" v-if="Filling_location != '-'">
                                                        </div>
                                                       
                                                    </div>
                                                    
                                                    
                                                </div>
                                                <div class="bottle-img-1" >
                                                    <img src="/img/bottle-instructions.png" alt="instructions">
                                                </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-none d-xl-flex btn-edit-bottle col-12 col-lg-2 content-t-button align-items-end" style="height: 180px;" v-if="status == 'Desarrollo'" >
                                        <button class="btn-t RalewayMedium font-20" type="button" data-bs-toggle="modal" data-bs-target="#sidebarRightModal3"><img src="/img/pencil-icon.svg" alt="edit"> {{ $t("Edit") }}</button>
                                    </div>
                                </div>

                            

                            </div>
                            <!-- end content -->
                        </div>
                        <!-- 3 -->
                        <div class="toggle-from m-top-toggle" v-if="tipo === 'Bote'">
                            <div class="flex-elm-from row">
                                <div class="left-from col-8 d-flex ">
                                    <h2 class="RalewayBold font-24">{{$t('orderView.Label')}}</h2>
                                    <div class="l-data-from d-flex ">
                                        <div class=" d-flex gap-1 check-from-label-2 ml-0 justify-content-center align-items-center">
                                            <input type="checkbox" name="" id="" v-model="noLabel"  @change="noLabelCheck" :disabled="status === 'Cerrado cliente y calidad'">
                                            <label for="" class="RalewayBold font-18">{{ $t('orderView.NoLabel') }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-from col-4 d-flex gap-1">
                                
                                    <div class="line-from"></div>
                                    <div :class="[porcentajeLlenosLabel === 0 ? 'progress-bar-from-0' : 'progress-bar-from']"><p class="font-19 MuseoSemiBold">{{formatPercent(porcentajeLlenosLabel)}}%</p></div>
                                    <img @click="toggleContent" id="id-2" class="arrow-t" :data-toggle-target="'container-toggle-3'" src="/img/arrow-close-down.svg" alt="arrow open">
                                </div>
                            </div>
                            <!-- content -->
                            <div id="container-toggle-3" class=" container-toggle ">
                                <div class="content-t">
                                    <div class="head-t" >
                                        <h3 class="font-18 RalewayExtraBold">{{$t('orderView.GUMMYDNA')}}</h3>
                                        <button v-if="status == 'Desarrollo' && !noLabel"  class="btn-t RalewayMedium font-20" type="button" data-bs-toggle="modal" data-bs-target="#sidebarRightModal2"><img src="/img/pencil-icon.svg" alt="edit"> {{$t("Edit")}}</button>
                                    </div>
                                    <div class="body-t body-nb-t" :class="{ 'disabled-section': noLabel }">
                                        <div class="body-td" v-for="i in gummyDna.length" :key="i">
                                            <p class="font-18 RalewayRegular" :class="{ 'disabled-text': noLabel }">{{$t(`orderView.GUMMYDNAL[${i-1}]`)}}</p>
                                            <div class="data-t">
                                                <span ><p class="font-20 RalewayBold" :class="{ 'disabled-text': noLabel }">{{gummyDna[i-1].desc}}</p></span>
                                                <div class="line-from" v-if="gummyDna[i-1].desc != '-' && !noLabel"></div>
                                                <img src="/img/check-icon.svg" alt="check" v-if="gummyDna[i-1].desc != '-' && !noLabel">
                                            </div>
                                        </div>

                                        <div class="body-td"> 
                                            <p class="font-18 RalewayRegular">{{$t('orderView.Label')}}</p>
                                            <div class="data-t">
                                                <img :src="Label_Imagen_Final" alt="label" class="w-100" v-if="Label_Imagen_Final"> 
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end content -->
                        </div>
                        <!-- 4 -->
                        <div class="toggle-from m-top-toggle">
                            <div class="flex-elm-from row">
                                <div class="left-from col-8 d-flex ">
                                    <h2 class="RalewayBold font-24">{{$t('orderView.Palettizing')}}</h2>
                                    <div class="l-data-from d-flex ">
                                    </div>
                                </div>
                                <div class="right-from col-4 d-flex gap-1">
                                
                                    <div class="line-from"></div>
                                    <div :class="[porcentajeLlenosPalettizing === 0 ? 'progress-bar-from-0' : 'progress-bar-from']" ><p class="font-19 MuseoSemiBold">{{formatPercent(porcentajeLlenosPalettizing)}}%</p></div>
                                    <img @click="toggleContent" id="id-3" class="arrow-t" :data-toggle-target="'container-toggle-4'" src="/img/arrow-close-down.svg" alt="arrow open">
                                </div>
                            </div>
                            <!-- content -->
                            <div id="container-toggle-4" class=" container-toggle ">
                                <div class="content-t content-t-pdb">
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayBold">{{$t('orderView.BOXLABEL')}}</h3>
                                    </div>
                                    <div class="body-t">
                                        <div class="body-td" v-for="i in pallet.length" :key="i" :id="'bt-' + i">
                                            <p class="font-18 RalewayRegular">{{$t(`orderView.Pallet[${i - 1}]`)}}</p>
                                            <div class="data-t">
                                                <input class="RalewayRegular font-20" type="text" name="" id="" :placeholder="pallet[i - 1].placeHolder" readonly>
                                                <div class="line-from" v-if="pallet[i - 1].placeHolder != '-'"></div>
                                                <img src="/img/check-icon.svg" alt="check" v-if="pallet[i - 1].placeHolder != '-'">
                                            </div>
                                        </div>
                                        <div class="body-td" id="body-td-pallet">
                                            <p class="font-18 RalewayRegular w-100">{{$t('orderView.BoxLabel')}}</p>
                                            <div class="data-t">
                                                <div class="tags-pallet">
                                                    <div class="tag-flex">
                                                        <div class="tag-pallet-text">
                                                            <p class="RalewayRegular font-16">{{$t('orderView.Size') + ' A8'}}</p>
                                                        </div>
                                                        <div class="tags-pallet-img">
                                                            <img :src="Box_label_imagen"  alt="tags" style="width: 18.5rem;" v-if="Box_label_imagen">
                                                            <p v-else>-</p>
                                                        </div>
                                                    </div>
                                                    <div v-if="status == 'Desarrollo'">
                                                        <div class="btn-pallet-tag">
                                                            <button  class="btn-t font-20 RalewayMedium" type="button" data-bs-toggle="modal" data-bs-target="#BoxLabelImagen"><img src="/img/pencil-icon.svg" alt="edit"> {{ $t('orderView.Personalize') }}
                                                            </button>
                                                        </div>
                                                        <div class="desc-pallet d-flex justify-content-end text-end">
                                                            <p class="font-16 RalewayRegular">{{ $t('orderView.PersonalizeText') }}</p>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="content-t content-t-pdb">
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayBold">{{ $t('orderView.PALLETIZING') }}</h3>
                                    </div>
                                    <div class="body-t">
                                        <div class="body-td" v-for="i in information.length" :key="i" :id="'bt-' + i">
                                            <p class="font-18 RalewayRegular">{{ $t(`orderView.PALLETIZINGINFORMATION[${i - 1}]`) }}</p>
                                            <div class="data-t">
                                                <input class="font-20 RalewayRegular" type="text" name="" id="" :placeholder="information[i - 1].placeHolder" readonly>
                                                <div class="line-from" v-if="information[i - 1].placeHolder != '-'"></div>
                                                <img src="/img/check-icon.svg" alt="check" v-if="information[i - 1].placeHolder != '-'" >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="body-td" id="body-td-pallet">
                                        <p class="font-18 RalewayRegular">{{ $t('orderView.PalletLabel') }}</p>
                                        <div class="data-t">
                                            <div class="tags-pallet">
                                                <div class="tag-flex">
                                                    <div class="tag-pallet-text">
                                                    
                                                    </div>
                                                    <div class="tags-pallet-img">
                                                
                                                        <img :src="Pallet_label_imagen" style="width: 18.5rem;" alt="tags" v-if="Pallet_label_imagen">
                                                        <p v-else>-</p>
                                                    </div>
                                                </div>
                                                <div v-if="status == 'Desarrollo'">
                                                    <div class="btn-pallet-tag" >
                                                        <button  class="btn-t font-20 RalewayMedium" type="button" data-bs-toggle="modal" data-bs-target="#PalletLabelImagen"><img src="/iconbuttons/plus-icon.svg" alt="edit"> {{ $t('orderView.ExtraLabel') }}
                                                        </button>
                                                    </div>
                                                    <div class="desc-pallet-1">
                                                        <p class="font-16 RalewayRegular">{{ $t('orderView.ExtraLabelText') }}</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="content-t">
                                    <div class="head-t d-flex justify-content-start gap-1 align-items-center">
                                        <h3 class="font-18 RalewayBold mb-0">{{ $t('orderView.CommentsPale') }}</h3>
                                        <div data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="$t('orderView.CommentsPaleToltip')">
                                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 24px;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="comments-area row gap-4">
                                        <textarea  class="font-16 col-9" v-model="Pallet_comments" name="" id="" cols="150" rows="10"></textarea>
                                        <div class="col-2 ">
                                            
                                            <button @click="PalletComments" class=" btn-t font-20 RalewayMedium">{{ $t("orderView.Send")}}</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="content-t" v-if="tipo === 'Bulk'">
                                    <div class="head-t">
                                        <h3 class="font-18 RalewayExtraBold">{{$t('orderView.FillingInstructions')}}</h3>
                                    </div>
                                    <div class="d-lg-flex gap-4 justify-content-center">
                                        <div class="body-t body-t-filling body-t-bottle " >
                                            <div class="body-td">
                                                <p class="font-18 RalewayRegular">{{$t('orderView.Batch')}}</p>
                                                <div class="data-t">
                                                    <select v-model="Filling_batch" class="font-20 RalewayRegular form-select" @change="saveLote">
                                                        <option v-for="item in LotesList" :key="item.ID" :value="item.Format">
                                                            {{ item.Format }}
                                                        </option>
                                                    </select>
                                                    <input v-if="Filling_batch.startsWith('OTHER')" type="text"  v-model="Filling_batch_other" class="font-20 RalewayRegular mt-2" maxlength="12" :class="{ 'input-sent': loteSent }">
                                                    <button v-if="Filling_batch.startsWith('OTHER')" class="btn-t RalewayMedium font-16 ml-2" type="button" @click="saveLoteOther" :disabled="isLoteOtherLoading">
                                                        <span v-if="isLoteOtherLoading">Enviando...</span>
                                                        <span v-else>Enviar</span>
                                                    </button>
                                                    <div class="line-from" v-if="Filling_batch != '-'" />
                                                    <img src="/img/check-icon.svg" alt="check" v-if="Filling_batch != '-'">
                                                </div>
                                            </div>
                                            <div class="body-td">
                                                <p class="font-18 RalewayRegular">{{$t('orderView.ExpDate')}}</p>
                                                <div class="data-t">
                                                    <select v-model="Filling_exp_date" class="font-20 RalewayRegular form-select" @change="saveBBD">
                                                        <option v-for="item in BBDList" :key="item.ID" :value="item.Format">
                                                            {{ item.Format }}
                                                        </option>
                                                    </select>
                                                    <input v-if="Filling_exp_date === 'OTHER'" v-model="Filling_exp_date_other"  type="text" class="font-20 RalewayRegular mt-2" maxlength="12" :class="{ 'input-sent': bbdSent }">
                                                    <button v-if="Filling_exp_date === 'OTHER'" class="btn-t RalewayMedium font-16 ml-2" type="button" @click="saveBBDOther" :disabled="isBBDOtherLoading">
                                                        <span v-if="isBBDOtherLoading">Enviando...</span>
                                                        <span v-else>Enviar</span>
                                                    </button>
                                                    <div class="line-from"></div>
                                                    <img src="/img/check-icon.svg" alt="check" v-if="Filling_exp_date != '-'">
                                                </div>
                                            </div>
                                            <div class="body-td">
                                                <p class="font-18 RalewayRegular">{{$t('orderView.Location')}}</p>
                                                <div class="data-t">
                                                    <input type="text" name="" id="" :placeholder="Filling_location" class="font-20 RalewayRegular" readonly>
                                                    <div class="line-from"></div>
                                                    <img src="/img/check-icon.svg" alt="check" v-if="Filling_location != '-'">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bottle-img-1" >
                                            <img src="/img/bottle-instructions.png" alt="instructions">
                                        </div>
                                    </div>
                                </div> -->

                            </div>
                            <!-- end content -->
                        </div>
                        <!-- 5 -->
                        <div class="toggle-from m-top-toggle">
                            <div class="flex-elm-from row">
                                <div class="left-from col-8 d-flex ">
                                    <h2 class="RalewayBold font-24">{{$t('orderView.OtherRequirements')}}</h2>
                                    <div class="l-data-from d-flex ">
                                        <div class=" d-flex gap-1 check-from-label-2 ml-0 justify-content-center align-items-center">
                                            <input type="checkbox" name="" id="" v-model="noAnalytics"  @change="noAnalyticsCheck" :disabled="status === 'Cerrado cliente y calidad'">
                                            <label for="" class="RalewayBold font-18">{{ $t('orderView.NoAnalytics') }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-from col-4 d-flex gap-1">
                                
                                    <div class="line-from"></div>
                                    <div :class="[porcentajeLlenosAnalytics === 0 ? 'progress-bar-from-0' : 'progress-bar-from']" ><p class="font-19 MuseoSemiBold">{{formatPercent(porcentajeLlenosAnalytics)}}%</p></div>
                                    <img @click="toggleContent" id="id-4" class="arrow-t" :data-toggle-target="'container-toggle-5'" src="/img/arrow-close-down.svg" alt="arrow open">
                                </div>
                            </div>
                            <!-- content -->
                            <div id="container-toggle-5" class="container-toggle">
                              <div v-if="!noAnalytics" class="content-t-2" id="content-t-other">
                                <div class="head-t">
                                  <h3 class="font-18 RalewayBold">{{ $t('orderView.ANALYTICS') }}</h3>
                                </div>
                                <div class="content-others">
                                
                                    <div class="body-t w-full " >
                                        <div class="table-responsive">
                                            <table class="table table-borderless w-100">
                                                <thead class="text-table-th">
                                                    <th colspan="2" class="p-1">{{ $t("orderView.Type") }}</th>
                                                    <th class="p-1">{{ $t("orderView.Quantity") }}</th>
                                                    <th class="p-1">{{ $t("orderView.Source") }}</th>
                                                    <th class="p-1">{{ $t("orderView.Analitycs") }}</th>
                                                    <th class="p-1">{{ $t("orderView.Periodicity") }}</th>
                                                    <th class="p-1">{{ $t("orderView.Observations") }}</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in analytics" :key="item['Code']" class="text-table-td  RalewayRegular">
                                                        <td class="font-12" colspan="2">{{ item['Active'] }}</td>
                                                        <td class="font-12">{{ item['Quantity'] }}</td>
                                                        <td class="font-12">{{ item['Source'] }}</td>
                                                        <td class="text-center font-12">

                                                            <div class="check-from-label-2 ml-0 justify-content-center">
                                                                <input type="checkbox" name="" id="" v-model="item['Analitycs']" readonly>
                                                            </div>
                                                        
                                                        </td>
                                                        <td > 
                                                            <input type="text" class="form-control font-12" name="" id="" :placeholder="item['Periodicity']" readonly>
                                                        </td>
                                                        <td>
                                                            <input type="text" class="form-control font-12" name="" id="" :placeholder="item['Observations']" readonly>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="body-t-other">
                                            <div class="line-f"></div>
                                            <div class="body-td" id="body-td-other-2">
                                                    <p>{{ $t('orderView.TOTALPRICE') }}</p>
                                                    <div class="data-t" id="data-t-other">
                                                        <p  class="font-20">{{sumAnalytics}}€</p>
                                                    </div>
                                            </div>
                                            <div class="text-f-other" id="body-td-other-f-1" v-if="sumAnalytics > 0">
                                                <p class="font-16 RalewayBold">{{ $t('orderView.TOTALPRICETEXT') }}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                              </div>
                              <div v-else class="content-t-2" style="min-height: 40px; display: flex; align-items: center; justify-content: center;">
                                <span class="font-16 RalewayRegular">Sin analíticas</span>
                              </div>
                            </div>
                            <!-- end content -->
                        </div>
                    
                    </div>
                </div>
                <div class="btn-atr-confirm d-flex justify-content-end" v-if="Customer_accepted && prefijo =='RG35'">
                    <button data-bs-toggle="modal" data-bs-target="#confirmModal"
                        :class="[canConfirmAndSign ? (status !== 'Cerrado cliente y calidad' ? 'btn-save-confirm' : 'btn-save-confirm-firm') : 'btn-save-confirm-disabled']"
                        :disabled="!canConfirmAndSign"
                        class="RalewayRegular font-20">
                        {{ $t("orderView.ConfirmProductAndSign") }}
                    </button>
                </div>
               
        </div>
    
    </section>


        <ApproveModal :Customer_accepted="Customer_accepted" :codeRG35="Code" :Tomar_muestra="Tomar_muestra" :RG37="RG37" />
        <UploadTagModal/>
        <ConfirmModal v-model:isModalVisible="isConfirmModalVisible" @confirm="handleConfirm"  :Status="status" :codeRG35="Code" :RG37="RG37" :Pallet_comments="Pallet_comments"/>
        <thankYou  v-model:isModalVisible="isThankYouModalVisible"/>
        <PalletLabelImagen 
            :codeRG35="Code" 
            :typeImage="typeImageBoxLabel" 
            :ImageBoxLabel="ImageBoxLabel" 
            :setAccordionOpen="setAccordionOpen"
            @pallet-label-updated="handlePalletLabelUpdated"
        />
        <BoxLabelImagen 
            :codeRG35="Code" 
            :typeImage="typeImageBoxLabel" 
            :ImageBoxLabel="ImageBoxLabel" 
            :setAccordionOpen="setAccordionOpen"
            @box-label-updated="handleBoxLabelUpdated"
        />

        
        <ModalLabel 
            :optionsSizeLabel="optionsSizeLabel" 
            :optionsFinish="optionsFinish" 
            :optionsLabelMaterial="optionsLabelMaterial" 
            :optionsColorLabel="optionsColorLabel" 
            :selectedOptionLabels="selectedOptionLabels" 
            :codeRG35="Code" 
            :Final_imagen="Label_Imagen_Final" 
            :setAccordionOpen="setAccordionOpen"
            @label-options-updated="handleLabelOptionsUpdated"
            @draft-label-updated="handleDraftLabelUpdated"
        />
        <BoteCapData 
            :selectedOption="selectedOption"
            :selectedOptionCap="selectedOptionCap"
            :capData="capData"
            :boteData="boteData"
            :codeRG35="Code"
            :optionsColorBote="optionsColorBote"
            :optionsColorcover="optionsColorcover"
            :characteristics="characteristics"
           :setAccordionOpen="setAccordionOpen"
        />
    </div>
</template>
<style scoped>
    @import url('/src/assets/css/ordersheader.css');
    @import url('/src/assets/css/ordersbody.css');
    .steps-row {
      display: flex !important;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      max-width: 100% !important;
    }
    .steps-row > * {
      min-width: 180px;
      flex: 1 1 180px;
    }

    @media (max-width: 1919px) {
      .steps-row > * {
        flex: 0 1 180px;
      }
      .steps-row {
        flex-wrap: wrap !important;
        gap: 1.7rem;
      }
    }


.input-sent {
  background-color: #d4edda !important;
  border: 2px solid #28a745 !important;
  transition: background 0.3s, border 0.3s;
}

.btn-save-confirm-disabled {
  background: #e0e4ea !important;
  color: #bfc6d1 !important;
  border: none;
  border-radius: 2em;
  padding: 0.7em 2.5em;
  font-size: 1.2em;
  cursor: not-allowed;
  opacity: 1;
}

.btn-atr-confirm {
  margin-top: 2em;
}

.disabled-section {
  opacity: 0.5;
  pointer-events: none;
}

.disabled-text {
  color: #999 !important;
}

/* Estilos para checkboxes deshabilitados */
input[type="checkbox"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input[type="checkbox"]:disabled + label {
  color: #999;
  cursor: not-allowed;
}

/* Estilo específico para checkboxes deshabilitados en secciones de etiqueta y analíticas */
.check-from-label-2 input[type="checkbox"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.check-from-label-2 input[type="checkbox"]:disabled + label {
  color: #999;
  cursor: not-allowed;
}

</style>
