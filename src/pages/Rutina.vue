<template>
  <q-page class="flex column">
    <div class="q-pa-md">
      <div class="flex row items-center">
        <h1 class="text-h3 h3">{{rutina.nombre}}</h1>
        <div>
          <q-btn
            class="plus q-ml-md"
            size="12px"
            color="primary"
            round
            unelevated
            icon="fa-solid fa-plus"
            @click="crear()"
            v-if="rutina.idPerfil == perfil.id"
            />
          <q-btn
            class="plus q-ml-md"
            size="12px"
            color="primary"
            round
            unelevated
            icon="fa-solid fa-circle-play"
            @click="recorrerRutina()"
            v-if="detallesR.length > 0"
            
            />
            <q-btn
              class="plus q-ml-md"
              size="12px"
              color="primary"
              label="Ver Perfil"
              unelevated
              @click="verPerfil"
              />
            <q-rating
              v-model="meGusta"
              max="1"
              size="3em"
              color="primary"
              color-selected="primary"
              class="q-ml-md"
              icon="favorite_border"
              icon-selected="favorite"
              icon-half="favorite"
              no-dimming
              @click="darLike"
              v-if="rutina.idPerfil != perfil.id"
            />
        </div>
      </div>
    </div>
    <div v-if="show" class="q-pa-md">
      <create @cancelar="cancelar()" :objeto="objeto" :objetoE="detalleE" :isRutina="true" :ejercicios="ejercicios" :categorias="categorias" :musculos="musculos" :equipamientos="equipamientos" :accion="accion" class="tabla index"></create>
    </div>
    <div class="flex" v-if="detallesR"> 
        <detalle v-for="{id = 0, nombre, musculoPrincipal, musculoSecundario, tiempo, img} in detallesImagen" :key="id"  
        :nombre="nombre"
        :musculoPrincipal="musculoPrincipal"
        :musculoSecundario="musculoSecundario"
        :tiempo="tiempo"
        :imagen="img"        
        class="q-ma-md detalle"
        @click="verEjercicio(id)"
        ></detalle>
      </div>
  </q-page>
</template>

<script>
import {  exportFile, useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import Detalle  from '../components/Detalle.vue';
import Create from '../components/CreateEjercicio.vue';


export default defineComponent({
  components: { Create, Detalle },
  name: 'Rutina',
  setup(){
    const route = useRoute(),
          router = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          detalleE = ref({}),
          accion = ref(),
          meGusta = ref(),
          filtroEjercicio = ref(''),
          show = ref(false);
    let detallesImagen = ref({});
  
    //Columnas tablas
    const columnsEjercicio = [
      {
        name: 'nombre',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.nombre,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'musculo', align: 'center', label: 'Músculo Principal', field: row => row.musculo, sortable: false },
      { name: 'musculoS', align: 'center', label: 'Músculo Secundario', field: row => row.musculoS, sortable: false },
      { name: 'equipamiento', align: 'center', label: 'Equipamiento', field: row => row.equipamiento, sortable: false },
      { name: 'categoria', align: 'center', label: 'Categoría', field: row => row.categoria, sortable: false },
      { name: 'estado', align: 'center', label: 'Estado', field: row => row.estado, sortable: true },
    ]
    const extra=()=>{
      return true;
    }
    const fetchPerfil = async()=>{
      await store.dispatch('perfiles/loadPerfil',{id: user.value.id});
      fetchMeGusta();
    }
    const fetchMeGusta = async()=>{      
      await store.dispatch('perfiles/loadMeGusta',{rutina: route.params.id, perfil: perfil.value.id});
      meGusta.value = like.value == true ? 1 : 0;
    }
    const fetchEjercicios = async()=>{
      const fromEjercicio = computed(() => store.getters['ejercicios/getFrom']);
      await store.dispatch('ejercicios/loadEjercicios',{limite:100,desde:fromEjercicio.value, id: rutina.value.idPerfil});
      fetchDetalles();
    }
    const fetchDetalles = async()=>{
      await store.dispatch('rutinas/resetDetalles');
      await store.dispatch('rutinas/loadDetalles',{limite:100,desde:0, id: route.params.id});
      detallesImagen.value = detallesR.value;
      let arraySuplementario = [];
      for (let i = 0; i < detallesImagen.value.length; i++) {
        let d = detallesImagen.value[i];
        let {img} = ejercicios.value.find( ejercicio => ejercicio.id === d.idEjercicio )
        arraySuplementario.push({...d, img: img});
      }
      detallesImagen.value =arraySuplementario;
    }
    const fetchRutina = async()=>{
      await store.dispatch('rutinas/loadRutina',{id: route.params.id});
      fetchPerfil();
      fetchEjercicios();      
    }
    const darLike = async() =>{
      await store.dispatch('perfiles/setMeGusta',{idRutina: route.params.id, idPerfil: perfil.value.id, like: meGusta.value == 1 ? true : false});
      meGusta.value = like.value ? 1 : 0;
    }
    const cancelar = ()=>{
      show.value = false;
    }
    const fetchMusculos = async()=>{
      await store.dispatch('musculos/loadMusculos',{limite:100,desde:0, filtro: ''});
    }
    const fetchEquipamientos = async()=>{
      await store.dispatch('equipamientos/loadEquipamientos',{limite:100,desde:0, filtro:''});
    }
    const fetchCategorias = async()=>{
      await store.dispatch('categorias/loadCategorias',{limite:100,desde:0,filtro:''});
    }
    const fetchDatos = async()=>{
      Promise.all([fetchMusculos(),fetchEquipamientos(),fetchCategorias()])
      .then(()=>{
        
        fetchRutina();
      })
      .catch(()=>{
        console.log('error');
      })
    }
    onMounted(()=> 
      extra(),
      fetchDatos()
    );
    const crear = () => {
      show.value = false;
      objeto.value = {};
      detalleE.value={};
      accion.value='C';
      show.value = true;
    }
    const verPerfil = ()=>{
      router.push(`/perfil/${rutina.value.idPerfil}`);
    }
  
    const verEjercicio = (valor) => {
      show.value = false;
      objeto.value = {};
      detalleE.value = detallesR.value.find( detalle => detalle.id === valor )
      const {id, nombre, detalles, preparacion, ejecucion, estado, idMusculoPrincipal, idMusculoSecundario, idEquipamiento,idCategoria, img} = ejercicios.value.find( ejercicio => ejercicio.id === detalleE.value.idEjercicio )
      objeto.value = {id,nombre, detalles, preparacion, ejecucion, estado, idMusculoPrincipal, idMusculoSecundario, idEquipamiento, idCategoria,  img}; 
      accion.value='E';
      show.value = true;
    }
    const perfil = computed(() => store.getters['perfiles/getPerfil']);
    const like = computed(() => store.getters['perfiles/getMegusta']);
    const user = computed(() => store.getters['auth/getMe']);
    const ejercicios = computed(() => store.getters['ejercicios/getEjercicios']);
    const rutina = computed(() => store.getters['rutinas/getRutina']);
    const detallesR = computed(() => store.getters['rutinas/getDetalles']);
    const respuestaE = computed(() => store.getters['ejercicios/getRespuesta']);
    const loadingE = computed(() => store.getters['ejercicios/getLoading']);
    const categorias = computed(() => store.getters['categorias/getCategorias']);
    const equipamientos = computed(() => store.getters['equipamientos/getEquipamientos']);
    const musculos = computed(() => store.getters['musculos/getMusculos']);
    const wrapCsvValue = (val, formatFn) => {
      let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }
    const exportarTable = (t) => {
        // naive encoding to csv format
        let rows = {};
        if (t=='user') {
          rows = columnsEjercicio;
        }
        
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
            col.format
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
    }
    const recorrerRutina=()=>{
      router.push('/recorrerrutina/'+route.params.id);
    }
    return{
      accion,
      categorias,
      detallesR,
      equipamientos,
      musculos,
      filtroEjercicio,
      ejercicios,
      respuestaE,
      loadingE,
      columnsEjercicio,
      objeto,
      show,
      verEjercicio,
      fetchEjercicios,
      crear,
      exportarTable,
      darLike,
      verPerfil,
      detalleE,
      rutina,
      user,
      perfil,
      meGusta,
      detallesImagen,
      cancelar,
      recorrerRutina
    }
  }
})
</script>
<style scoped>
.verMas{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.ancho{
  min-width: 450px;
}
.w90{
  width: 90%;
  margin: 0 auto;
}
.gris{
  color: #707070;
}
.tabla{
  min-width: 600px;
  max-width: 750px;
}
.plus{
  margin-left: 15px;
}
.detalle{
  max-height: 300px;
}
.index{
  z-index: 1;
}
</style>
