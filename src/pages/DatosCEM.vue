<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-table
        title="Categorias"
        :rows="categorias"
        :columns="columnsCategory"
        virtual-scroll
        :loading="loadingC"
        :rows-per-page-options="[0]"
        style="height: 410px; overflow-y:hidden"
        row-key="name"
        class="tabla encabezadoFijo"
        no-data-label="No encontre nada para ti"
      >
        <template v-slot:top-right>
          <q-btn
          color="primary"
          icon-right="archive"
          label="Exportar"
          no-caps
          unelevated
          @click="exportarTable('cat')"
          />
          <q-btn
          class="plus"
          size="12px"
          color="primary"
          round
          unelevated
          icon="fa-solid fa-plus"
          @click="crear('Categoria')"
          />
        
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="editar(props.row.id,'Categoria')">
            <q-td key="nombre" :props="props">
              {{ props.row.nombre.length > 20 ? props.row.nombre.substr(0,20) + '...' : props.row.nombre  }}
            </q-td>
            <q-td key="creada" :props="props">{{ props.row.createdAt }}</q-td>
            <q-td key="actualizada" :props="props">{{ props.row.updatedAt }}</q-td>
            <q-td key="estado" :props="props">
              {{ props.row.estado ? 'Activada' : 'Desactivada' }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div v-if="respuestaC" class="verMas">
            <q-btn 
            flat
            color="primary"
            icon-right="fa-solid fa-circle-arrow-down"
            label="Ver mas"
            no-caps
            unelevated
            @click="fetchCategorias()"
            />
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Equipamientos"
        :rows="equipamientos"
        :columns="columns"
        virtual-scroll
        :loading="loadingE"
        :rows-per-page-options="[0]"
        style="height: 410px; overflow-y:hidden"
        row-key="name"
        class="tabla encabezadoFijo"
        no-data-label="No encontre nada para ti"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Exportar"
            no-caps
            unelevated
            @click="exportarTable"
          />
          <q-btn
            class="plus"
            size="12px"
            color="primary"
            round
            unelevated
            icon="fa-solid fa-plus"
            @click="crear('Equipamiento')"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="editar(props.row.id,'Equipamiento')">
            <q-td key="nombre" :props="props">
              {{ props.row.nombre.length > 20 ? props.row.nombre.substr(0,20)+ '...' : props.row.nombre }}
            </q-td>
            <q-td key="creado" :props="props">{{ props.row.createdAt }}</q-td>
            <q-td key="actualizado" :props="props">{{ props.row.updatedAt }}</q-td>
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
            @click="fetchEquipamientos()"
            />
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Musculos"
        :rows="musculos"
        :columns="columns"
        virtual-scroll
        :loading="loadingM"
        :rows-per-page-options="[0]"
        style="height: 410px; overflow-y:hidden"
        row-key="name"
        class="tabla encabezadoFijo"
        no-data-label="No encontre nada para ti"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="Exportar"
            no-caps
            unelevated
            @click="exportarTable"
          />
          <q-btn
          class="plus"
          size="12px"
          color="primary"
          round
          unelevated
          icon="fa-solid fa-plus"
          @click="crear('Musculo')"
        />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="editar(props.row.id,'Musculo')">
            <q-td key="nombre" :props="props">
              {{ props.row.nombre.length > 20 ? props.row.nombre.substr(0,20)+ '...' : props.row.nombre }}
            </q-td>
            <q-td key="creado" :props="props">{{ props.row.createdAt }}</q-td>
            <q-td key="actualizado" :props="props">{{ props.row.updatedAt }}</q-td>
            <q-td key="estado" :props="props">
              {{ props.row.estado ? 'Activado' : 'Desactivado' }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div v-if="respuestaM" class="verMas">
            <q-btn 
            flat
            color="primary"
            icon-right="fa-solid fa-circle-arrow-down"
            label="Ver mas"
            no-caps
            unelevated
            @click="fetchMusculos()"
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
      <create  :objeto="objeto" :accion="accion" class="tabla"></create>
    </div>
  </q-page>
</template>

<script>
import {  exportFile, useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

import Create from '../components/Create.vue';


export default defineComponent({
  components: { Create },
  name: 'DatosCEM',
  setup(){
    const route = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          accion = ref(),
          show = ref(false);
  
    //Columnas tablas
    const columnsCategory = [
      {
        name: 'nombre',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.nombre,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'creada', align: 'center', label: 'Creada', field: row => row.createdAt, sortable: true },
      { name: 'actualizada', align: 'center', label: 'Actualizada', field: row => row.updatedAt, sortable: true },
      { name: 'estado', align: 'center', label: 'Estado', field: row => row.estado, sortable: true }
    ]
    const columns = [
      {
        name: 'nombre',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.nombre,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'creado', align: 'center', label: 'Creado', field: row => row.createdAt, sortable: true },
      { name: 'actualizado', align: 'center', label: 'Actualizado', field: row => row.updatedAt, sortable: true },
      { name: 'estado', align: 'center', label: 'Estado', field: row => row.estado,format: val => val?'Activa':'Desactivada', sortable: true }
    ]
    const extra=()=>{
      return true;
    }
    const fetchCategorias = async()=>{
      const fromCategoria = computed(() => store.getters['categorias/getFrom']);
      await store.dispatch('categorias/loadCategorias',{limite:10,desde:fromCategoria.value});
    }
    const fetchEquipamientos = async()=>{
      const fromEquipamiento = computed(() => store.getters['equipamientos/getFrom']);
      await store.dispatch('equipamientos/loadEquipamientos',{limite:10,desde:fromEquipamiento.value});
    }
    const fetchMusculos = async()=>{
      const fromMusculo = computed(() => store.getters['musculos/getFrom']);
      await store.dispatch('musculos/loadMusculos',{limite:10,desde:fromMusculo.value});
    }
    onMounted(()=> 
      extra(),
      fetchCategorias(),
      fetchEquipamientos(),
      fetchMusculos()
    );
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
      if (t=='Categoria') {
        const {id, nombre, createdAt, updatedAt, estado} = categorias.value.find( categoria => categoria.id === objetoId )
        objeto.value = {id,nombre,estado, tipo : t};
      }else if (t=='Equipamiento') {
        const {id, nombre, createdAt, updatedAt, estado} = equipamientos.value.find( equipamiento => equipamiento.id === objetoId )
        objeto.value = {id,nombre,estado, tipo : t};
      }else{
        const {id, nombre, createdAt, updatedAt, estado} = musculos.value.find( musculo => musculo.id === objetoId )
        objeto.value = {id,nombre,estado, tipo : t};
      }
      accion.value='E';
      show.value = true;
    }
    const categorias = computed(() => store.getters['categorias/getCategorias']);
    const respuestaC = computed(() => store.getters['categorias/getRespuesta']);
    const loadingC = computed(() => store.getters['categorias/getLoading']);
    const equipamientos = computed(() => store.getters['equipamientos/getEquipamientos']);
    const respuestaE = computed(() => store.getters['equipamientos/getRespuesta']);
    const loadingE = computed(() => store.getters['equipamientos/getLoading']);
    const musculos = computed(() => store.getters['musculos/getMusculos']);
    const respuestaM = computed(() => store.getters['musculos/getRespuesta']);
    const loadingM = computed(() => store.getters['musculos/getLoading']);
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
        if (t=='cat') {
          rows = columnsCategory;
        }else{
          rows = columns;
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
      respuestaC,
      loadingC,
      columns,
      columnsCategory,
      equipamientos,
      respuestaE,
      loadingE,
      musculos,
      respuestaM,
      loadingM,
      objeto,
      show,
      fetchCategorias,
      fetchEquipamientos,
      fetchMusculos,
      crear,
      editar,
      exportarTable
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
  min-width: 500px;
  max-width: 532px;
}
.plus{
  margin-left: 15px;
}
</style>
