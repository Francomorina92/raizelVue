<template>
  <q-page class="flex column">
    <div class="q-pa-md">
      <div class="flex row items-center">
        <h1 class="text-h3 h3">{{rutina.nombre}}</h1>
        <div>
          <q-btn
            class="plus q-ml-md"
            size="12px"
            label="Anterior"
            color="primary"
            unelevated
            icon="fa-solid fa-plus"
            @click="siguienteRutina('A')"
            v-if="index > 0"
            />
          <q-btn
            class="plus q-ml-md"
            size="12px"
            label="Siguiente"
            color="primary"
            unelevated
            icon="fa-solid fa-plus"
            @click="siguienteRutina('S')"
            v-if="index < detallesR.length -1"
            />
          <q-btn
            class="plus q-ml-md"
            size="12px"
            label="Terimar"
            color="primary"
            unelevated
            @click="terminar()"
            v-if="index == detallesR.length -1"
            />
        </div>
      </div>
    </div>
    <div v-if="show" class="q-pa-md" >
      <ejercicio @cancelar="cancelar()" :objeto="objeto" :objetoE="detalleE" :isRutina="true" :ejercicios="ejercicios" :categorias="categorias" :musculos="musculos" :equipamientos="equipamientos" :accion="accion" class="tabla index"></ejercicio>
    </div>
  </q-page>
</template>

<script>
import {  exportFile, useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import Ejercicio from '../components/Ejercicio.vue';


export default defineComponent({
  components: { Ejercicio },
  name: 'RecorrerRutina',
  setup(){
    const route = useRoute(),
          router = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          detalleE = ref([]),
          accion = ref(),
          index = ref(0),
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
      siguienteRutina('x');
    }
    
    const fetchEjercicios = async()=>{
      const fromEjercicio = computed(() => store.getters['ejercicios/getFrom']);
      await store.dispatch('ejercicios/loadEjercicios',{limite:100,desde:fromEjercicio.value});
    }
    const fetchDetalles = async()=>{
      await store.dispatch('rutinas/resetDetalles');
      await store.dispatch('rutinas/loadDetalles',{limite:100,desde:0, id: route.params.id});
      detallesImagen.value = detallesR.value;
      detallesImagen.value.filter((d)=>{
        let {img} = ejercicios.value.find( ejercicio => ejercicio.id === d.idEjercicio )
        let det = d;
        det.img = img;
        return det;
      })
    }
    const fetchRutina = async()=>{
      await store.dispatch('rutinas/loadRutina',{id: route.params.id});
      fetchPerfil();      
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
        fetchEjercicios();
        fetchDetalles();
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
    const terminar = ()=>{
      router.push(`/rutina/`+route.params.id);
    }
    const siguienteRutina = (valor)=>{
      detalleE.value={};
      if (valor == 'S') {
        index.value ++;
      }else if(valor == 'A'){
        index.value --;
      }
      detalleE.value = detallesR.value[index.value]
      show.value = false;
      objeto.value = {};
      verEjercicio()
    }
  
    const verEjercicio = () => {      
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
      siguienteRutina,
      fetchEjercicios,
      crear,
      exportarTable,
      darLike,
      detalleE,
      rutina,
      user,
      perfil,
      meGusta,
      detallesImagen,
      cancelar,
      index,
      terminar
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
.h3{
  margin: 0;
}
</style>
