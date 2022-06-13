<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md">
      <q-table
        title="Usuarios"
        :rows="usuarios"
        :columns="columnsUsuario"
        virtual-scroll
        :loading="loadingU"
        :rows-per-page-options="[0]"
        :filter="filtroUsuario"
        style="height: 410px; overflow-y:hidden"
        row-key="name"
        class="tabla encabezadoFijo"
        no-data-label="No encontre nada para ti"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="100" v-model="filtroUsuario" placeholder="Búsqueda" @keyup.enter="busquedaUsuario(1)" @keyup.delete="busquedaUsuario(0)">
          </q-input>
          <q-btn
          color="primary"
          icon-right="archive"
          label="Exportar"
          no-caps
          unelevated
          @click="exportarTable('user')"
          />
          <q-btn
          class="plus"
          size="12px"
          color="primary"
          round
          unelevated
          icon="fa-solid fa-plus"
          @click="crear('Usuario')"
          />
        
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" @click="editar(props.row.id,'Usuario')">
            <q-td key="email" :props="props">
              {{ props.row.email.length > 20 ? props.row.email.substr(0,20) + '...' : props.row.email  }}
            </q-td>
            <q-td key="rol" :props="props">{{ props.row.rol }}</q-td>
            <q-td key="creado" :props="props">{{ props.row.createdAt }}</q-td>
            <q-td key="actualizado" :props="props">{{ props.row.updatedAt }}</q-td>
            <q-td key="estado" :props="props">
              {{ props.row.estado ? 'Activado' : 'Desactivado' }}
            </q-td>
            <q-td key="google" :props="props">
              {{ props.row.google ? 'Si' : 'No' }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom>
          <div v-if="respuestaU" class="verMas">
            <q-btn 
            flat
            color="primary"
            icon-right="fa-solid fa-circle-arrow-down"
            label="Ver mas"
            no-caps
            unelevated
            @click="fetchUsuarios()"
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

import Create from '../components/CreateUsuario.vue';


export default defineComponent({
  components: { Create },
  name: 'Usuarios',
  setup(){
    const route = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          accion = ref(),
          filtroUsuario = ref(''),
          show = ref(false);
  
    //Columnas tablas
    const columnsUsuario = [
      {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: row => row.email,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'rol', align: 'center', label: 'Rol', field: row => row.rol, sortable: true },
      { name: 'creado', align: 'center', label: 'Creado', field: row => row.createdAt, sortable: true },
      { name: 'actualizado', align: 'center', label: 'Actualizado', field: row => row.updatedAt, sortable: true },
      { name: 'estado', align: 'center', label: 'Estado', field: row => row.estado, sortable: true },
      { name: 'google', align: 'center', label: 'Google', field: row => row.google, sortable: true },
    ]
    const extra=()=>{
      return true;
    }
    const fetchUsuarios = async()=>{
      const fromUsuario = computed(() => store.getters['usuarios/getFrom']);
      await store.dispatch('usuarios/loadUsuarios',{limite:11,desde:fromUsuario.value,filtro:filtroUsuario.value});
    }
    const busquedaUsuario = async(tecla)=>{
      if (tecla==0 && filtroUsuario.value.length==1) {
        filtroUsuario.value='';
      }
      if (tecla==1||filtroUsuario.value.length==0) {
        await store.dispatch('usuarios/resetUsuarios');
        fetchUsuarios();
      }
    }
    onMounted(()=> 
      extra(),
      fetchUsuarios()
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
      if (t=='Usuario') {
        const {id, email, rol, createdAt, updatedAt, estado} = usuarios.value.find( usuario => usuario.id === objetoId )
        objeto.value = {id,email, rol,estado, tipo : t};
      }
      accion.value='E';
      show.value = true;
    }
    const usuarios = computed(() => store.getters['usuarios/getUsuarios']);
    const respuestaU = computed(() => store.getters['usuarios/getRespuesta']);
    const loadingU = computed(() => store.getters['usuarios/getLoading']);
    
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
          rows = columnsUsuario;
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
      filtroUsuario,
      usuarios,
      respuestaU,
      loadingU,
      columnsUsuario,
      objeto,
      show,
      fetchUsuarios,
      busquedaUsuario,
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
  min-width: 600px;
  max-width: 750px;
}
.plus{
  margin-left: 15px;
}
</style>
