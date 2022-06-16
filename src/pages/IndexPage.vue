<template>
  <q-page class="flex flex-center" v-if="!rutinas">
    <img
      alt="Raizel logo"
      src="~assets/raizel-logo.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
  <q-page class="flex" v-else>
    <div class="q-pa-md completo">
      <div class="flex row items-center">
        <h1 class="text-h3 h3">Rutinas</h1>
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


import Rutina from '../components/Rutina.vue';


export default defineComponent({
  components: { Rutina },
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
      await store.dispatch('rutinas/loadRutinasTodas');
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
    
    const user = computed(() => store.getters['auth/getMe']);
    const rutinas = computed(() => store.getters['rutinas/getRutinas']);
    const respuestaU = computed(() => store.getters['usuarios/getRespuesta']);
    const loadingU = computed(() => store.getters['usuarios/getLoading']);
    const idRutinas = () =>{
      return user.value.id == route.params.id;
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