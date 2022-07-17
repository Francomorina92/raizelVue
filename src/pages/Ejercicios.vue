<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md">
      <q-table
        title="Ejercicios"
        :rows="ejercicios"
        :columns="columnsEjercicio"
        virtual-scroll
        :loading="loadingE"
        :rows-per-page-options="[0]"
        :filter="filtroEjercicio"
        style="height: 410px; overflow-y:hidden"
        row-key="name"
        class="tabla encabezadoFijo"
        no-data-label="No encontre nada para ti"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="100" v-model="filtroEjercicio" placeholder="Búsqueda" @keyup.enter="busquedaEjercicio(1)" @keyup.delete="busquedaEjercicio(0)">
          </q-input>          
          <q-btn
          class="plus"
          size="12px"
          color="primary"
          round
          unelevated
          icon="fa-solid fa-plus"
          @click="crear('Ejercicio')"
          />
        
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="editar(props.row.id,'Ejercicio')">
            <q-td key="nombre" :props="props">
              {{ props.row.nombre.length > 20 ? props.row.nombre.substr(0,20) + '...' : props.row.nombre  }}
            </q-td>
            <q-td key="musculo" :props="props">
              {{ musculoFiltro(props.row.idMusculoPrincipal) > 20 ? musculoFiltro(props.row.idMusculoPrincipal) + '...' : musculoFiltro(props.row.idMusculoPrincipal) }}
            </q-td>
            <q-td key="musculoS" :props="props">
              {{ musculoFiltro(props.row.idMusculoSecundario) > 20 ? musculoFiltro(props.row.idMusculoSecundario) + '...' : musculoFiltro(props.row.idMusculoSecundario)  }}
            </q-td>
            <q-td key="equipamiento" :props="props">
              {{ equipamientoFiltro(props.row.idEquipamiento) > 20 ? equipamientoFiltro(props.row.idEquipamiento) + '...' : equipamientoFiltro(props.row.idEquipamiento)  }}
            </q-td>
            <q-td key="categoria" :props="props">
              {{ categoriaFiltro(props.row.idCategoria) > 20 ? categoriaFiltro(props.row.idCategoria) + '...' : categoriaFiltro(props.row.idCategoria)  }}
            </q-td>
            <q-td key="estado" :props="props">
              {{ props.row.estado ? 'Activado' : 'Desactivado' }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div v-if="respuestaE" class="verMas">
            <q-btn 
            flat
            color="primary"
            icon-right="fa-solid fa-circle-arrow-down"
            label="Ver mas"
            no-caps
            unelevated
            @click="fetchEjercicios()"
            />
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <div v-if="!show" class="q-pa-md tabla">
      <q-card class="my-card tabla" >

      </q-card>
    </div>
    <div v-else class="q-pa-md">
      <create  @cancelar="cancelar()" :objeto="objeto" :categorias="categorias" :musculos="musculos" :ejercicios="[]" :equipamientos="equipamientos" :accion="accion" :isRutina="false" class="tabla"></create>
    </div>
  </q-page>
</template>

<script>
import {  exportFile, useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import Create from '../components/CreateEjercicio.vue';


export default defineComponent({
  components: { Create },
  name: 'Ejercicios',
  setup(){
    const route = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          accion = ref(),
          filtroEjercicio = ref(''),
          show = ref(false);
  
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
    const cancelar = ()=>{
      show.value = false;
    }
    const fetchEjercicios = async()=>{
      const fromEjercicio = computed(() => store.getters['ejercicios/getFrom']);
      await store.dispatch('ejercicios/loadEjercicios',{limite:11,desde:fromEjercicio.value,filtro:filtroEjercicio.value});
    }
    const busquedaEjercicio = async(tecla)=>{
      if (tecla==0 && filtroEjercicio.value.length==1) {
        filtroEjercicio.value='';
      }
      if (tecla==1||filtroEjercicio.value.length==0) {
        await store.dispatch('ejercicios/resetEjercicios');
        fetchEjercicios();
      }
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
      })
      .catch(()=>{
        console.log('error');
      })
    }
    onMounted(()=> 
      extra(),
      fetchDatos()
    );
    const categoriaFiltro = (categoria)=>{
      const cat = categorias.value.filter(c => c.id == categoria);
      return cat[0].nombre
    }
    const musculoFiltro = (musculo)=>{
      const mus = musculos.value.filter(m => m.id == musculo);
      return mus[0].nombre
    }
    const equipamientoFiltro = (equipamiento)=>{
      const equi = equipamientos.value.filter(m => m.id == equipamiento);
      return equi[0].nombre
    }
    const crear = (t) => {
      show.value = false;
      objeto.value = {};
      objeto.value={tipo:t}
      accion.value='C';
      show.value = true;
    }
  
    const editar= (objetoId,t) => {
      show.value = false;
      objeto.value = {};
      const {id, nombre, detalles, preparacion, ejecucion, estado, idMusculoPrincipal, idMusculoSecundario, idEquipamiento,idCategoria, tiempo, img} = ejercicios.value.find( ejercicio => ejercicio.id === objetoId )
      objeto.value = {id,nombre, detalles, preparacion, ejecucion, estado, idMusculoPrincipal, idMusculoSecundario, idEquipamiento, idCategoria, tipo : t, tiempo, img};
      accion.value='E';
      show.value = true;
    }
    const ejercicios = computed(() => store.getters['ejercicios/getEjercicios']);
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
      equipamientos,
      musculos,
      filtroEjercicio,
      ejercicios,
      respuestaE,
      loadingE,
      columnsEjercicio,
      objeto,
      show,
      categoriaFiltro,
      musculoFiltro,
      equipamientoFiltro,
      fetchEjercicios,
      busquedaEjercicio,
      crear,
      editar,
      exportarTable,
      cancelar
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
</style>
