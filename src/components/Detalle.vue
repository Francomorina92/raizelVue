<template>
  <q-card class="my-card">
      <q-img :src="imagen != '' ? imagen : 'https://cdn.quasar.dev/img/chicken-salad.jpg'" />
  
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{nombreR}}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="fa-solid fa-stopwatch" />
            {{tiempoR}}m
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="musculoPrincipalR">
        <div class="text-subtitle1">
          Musculo Principal
        </div>
        <div class="text-caption text-grey">
          {{musculoPrincipalR}}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="musculoSecundarioR">
        <div class="text-subtitle1">
          Musculo Secundario
        </div>
        <div class="text-caption text-grey">
          {{musculoSecundarioR}}
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
import {  useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default defineComponent({
    name: 'Detalle',
    props:{        
        musculoPrincipal:{
            type: String, default: ''
        },
        musculoSecundario:{
            type: String, default: ''
        },
        nombre: {
            type: String, default: 'C'
        },
        tiempo: {
            type: Number, default: 0
        },
        imagen: {
            type: String, default: ''
        },    
    },
    setup(props){
        const $q = useQuasar(),
              store = useStore();
        let nombreR= ref(props.nombre),
            tiempoR= ref(props.tiempo),
            calificacionR= ref(props.calificacion * 5),
            musculoPrincipalR= ref(props.musculoPrincipal),
            musculoSecundarioR= ref(props.musculoSecundario);
        return{
            nombreR,
            tiempoR,
            calificacionR,
            musculoPrincipalR,
            musculoSecundarioR
        }
    }
})
</script>

<style>
.my-card{
    width: 100%;
    max-width: 300px;
}
</style>