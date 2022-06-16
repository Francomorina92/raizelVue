<template>
  <q-card class="my-card">
      <q-img :src="imagen  ? imagen : 'https://res.cloudinary.com/raizel/image/upload/v1655250986/wmozjlogmld4lpb7un4c.jpg'" />
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

        <q-rating readonly v-model="calificacionR" :max="5"  size="32px" color="orange" :class="!calificacionR ? 'clasificacion' : ''" />
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="musculoPrincipalR">
        <div class="text-subtitle1">
          Musculo Principal
        </div>
        <div class="text-caption text-grey">
          {{musculoPrincipalR}}
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
    name: 'Rutinas',
    props:{
        calificacion: {
            type: String, default: '0'
        },
        musculoPrincipal:{
            type: String, default: ''
        },
        nombre: {
            type: String, default: 'C'
        },
        tiempo: {
            type: String, default: '0'
        },
        imagen: {
            type: String, default: ''
        },    
    },
    setup(props){
        const $q = useQuasar(),
              store = useStore();
        let nombreR= ref(props.nombre),
            tiempoR= ref(props.tiempo ? props.tiempo : 0),
            calificacionR= ref(props.calificacion * 5),
            musculoPrincipalR= ref(props.musculoPrincipal);
        const valorCalificacion = (v) => {
            return v*5;
        }
        return{
            valorCalificacion,
            nombreR,
            tiempoR,
            calificacionR,
            musculoPrincipalR
        }
    }
})
</script>

<style scoped>
.my-card{
    width: 100%;
    max-width: 300px;
}
.clasificacion{
    opacity: 0%;
}
</style>