<template>
  <q-page class="flex">
    <div class="q-pa-md completo">
      <div class="flex row items-center">
        <h1 class="text-h3 h3">Mis Rutinas</h1>
        <div>
          <q-btn
              class="plus q-ml-md"
              size="12px"
              color="primary"
              round
              unelevated
              icon="fa-solid fa-plus"
              @click="crear('Rutina')"
              />
        </div>
      </div>
      <div v-if="!show" class="q-pa-md tabla">
        <q-card class="my-card tabla" >

        </q-card>
      </div>
      <div v-else class="q-pb-md">
        <create  :objeto="objeto" :accion="accion" class="tabla"></create>
      </div>
      <div class="flex justify-center">
        <rutina v-for="{id, nombre, calificacion, tiempo, img} in rutinas" :key="id" 
        :nombre="nombre"
        :calificacion="calificacion"
        :tiempo="tiempo"
        :imagen="img"
        class="q-ma-md"
        @click="verRutina(id)"></rutina>
      </div>
    </div>
    
    
  </q-page>
</template>

<script>
import {  useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'

import Create from '../components/Create.vue';
import Rutina from '../components/Rutina.vue';


export default defineComponent({
  components: { Create, Rutina },
  name: 'Rutinas',
  setup(){
    const route = useRoute(),
          router = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({}),
          accion = ref(),
          filtroUsuario = ref(''),
          show = ref(false);
  
    
    const extra=()=>{
      return true;
    }
    const fetchRutinas = async()=>{
      await store.dispatch('rutinas/resetRutinas');
      await store.dispatch('rutinas/loadRutinas', {id: route.params.id, idP: perfil.value.id});
    }
    const busquedaUsuario = async(tecla)=>{
      if (tecla==0 && filtroUsuario.value.length==1) {
        filtroUsuario.value='';
      }
      if (tecla==1||filtroUsuario.value.length==0) {
        await store.dispatch('usuarios/resetUsuarios');
        fetchRutinas();
      }
    }
    const verRutina = (valor) =>{
      router.push('/rutina/'+valor);
    }
    onMounted(()=> 
      extra(),
      fetchRutinas()
    );
    const crear = (t) => {
      show.value = false;
      objeto.value = {};
      objeto.value={tipo:t}
      accion.value='C';
      show.value = true;
    }
  
    /* const editar= (objetoId,t) => {
      show.value = false;
      objeto.value = {};
      if (t=='Usuario') {
        const {id, email, rol, createdAt, updatedAt, estado} = usuarios.value.find( usuario => usuario.id === objetoId )
        objeto.value = {id,email, rol,estado, tipo : t};
      }
      accion.value='E';
      show.value = true;
    } */
    const user = computed(() => store.getters['auth/getMe']);
    const rutinas = computed(() => store.getters['rutinas/getRutinas']);
    const respuestaU = computed(() => store.getters['usuarios/getRespuesta']);
    const loadingU = computed(() => store.getters['usuarios/getLoading']);
    const idRutinas = () =>{
      return user.value.id == route.params.id;
    }
    const perfil = computed(() => store.getters['perfiles/getPerfil']);
    const fetchPerfil = async()=>{
      await store.dispatch('perfiles/loadPerfil',{id: user.value.id});
    }
    
    return{
      accion,
      filtroUsuario,
      rutinas,
      loadingU,
      objeto,
      show,
      verRutina,
      fetchRutinas,
      busquedaUsuario,
      crear,
      idRutinas
    }
  }
})
</script>
<style scoped>
.tabla{
  min-width: 400px;
  max-width: 650px;
}
.completo{
  width: 100%;
}
</style>
