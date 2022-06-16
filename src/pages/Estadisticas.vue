<template>
  <q-page class="flex flex-center around">
    <q-card class="my-card ancho" >
      <q-card-section>
        <q-btn-toggle
          v-model="meGustas"
          class="toggle q-ml-md"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            {label: 'Todos', value: 1},
            {label: 'Ultimos 3 meses', value: 2}
          ]"
          @click="seleccionMeGustas"
        />
      </q-card-section>
        <q-card-section>
         <canvas id="myChart" width="400" height="400"></canvas>
        </q-card-section>
        <q-card-actions vertical class="paddingTop0 marginTop0">
          <div class="text-center">
            <!-- <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label> -->
          </div>
        </q-card-actions>
    </q-card>
    <q-card class="my-card ancho" >
      <q-card-section class="alto">
       <q-btn-toggle
          v-model="mcalificaciones"
          class="toggle q-ml-md"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
            {label: 'Promedio Calificaciones', value: 1}
          ]"
        />
      </q-card-section>
      <q-card-section>
        <canvas id="myChartCircle" width="400" height="400"></canvas>
      </q-card-section>
      <q-card-actions vertical class="paddingTop0 marginTop0">
        <div class="text-center">
          <!-- <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label> -->
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'Estadisticas',
  setup(){
    const router = useRouter(),
          route = useRoute(),
          store = useStore(),
          $q = useQuasar();
    const listaLabels = ref({}),
          mcalificaciones = ref(1),
          meGustas = ref(1);
          let myChart;
          let myChartCircle;
    const likes = computed(() => store.getters['likes/getLikes']);
    const fetchMeGustaTotales = async()=>{
      const error = computed(() => store.getters['likes/getError']);
      $q.loading.show({
        delay: 400
      })
      await store.dispatch('likes/loadTodos');
      $q.loading.hide()
      tabla();
    }
    const fetchMeGustaUltimos = async()=>{
      const error = computed(() => store.getters['likes/getError']);
      $q.loading.show({
        delay: 400
      })
      await store.dispatch('likes/loadUltimos');
      $q.loading.hide()
      tablaUltimos();
    }
    const calificaciones = computed(() => store.getters['comentarios/getCalificaciones']);
    const fetchCalificacionesTotales = async()=>{
      const error = computed(() => store.getters['comentarios/getError']);
      $q.loading.show({
        delay: 400
      })
      await store.dispatch('comentarios/loadCalificacionesTotales');
      $q.loading.hide()
      tablaCalificaciones();
    }
    const seleccionMeGustas = ()=>{
      if (meGustas.value == 1) {
        fetchMeGustaTotales();
      }else{
        fetchMeGustaUltimos();
      }
    } 
    const tabla = ()=>{
      
      let labelsLikes = [];
      let dataLikes = [];
      let backgroundColorLikes = [];
      let borderColorLikes = [];
      likes.value.forEach(l => {
        labelsLikes = [...labelsLikes, l.nombre];
        dataLikes = [...dataLikes, l.cantidad];
        if (borderColorLikes.length % 2 == 0) {
          borderColorLikes = [...borderColorLikes, 'rgba(255, 99, 132, 1)'];
        }else{
          borderColorLikes = [...borderColorLikes, 'rgba(54, 162, 235, 1)'];
        }
        if (backgroundColorLikes.length % 2 == 0) {
          backgroundColorLikes = [...backgroundColorLikes, 'rgba(255, 99, 132, 0.2)'];
        }else{
          backgroundColorLikes = [...backgroundColorLikes, 'rgba(54, 162, 235, 0.2)'];
        }
      });
      const ctx = document.getElementById('myChart');
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labelsLikes,
              datasets: [{
                  label: 'Me Gustas Totales',
                  data: dataLikes,
                  backgroundColor: backgroundColorLikes,
                  borderColor: borderColorLikes,
                  borderWidth: 1
              }],              
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
    }
    const tablaUltimos = ()=>{
      
      let labelsLikes = [];
      let dataLikes = [];
      let backgroundColorLikes = [];
      let borderColorLikes = [];
      
      let rutinas = [];
      let fechaActual = new Date();
      
      //Creamos un nuevo objeto donde vamos a almacenar por idRutina. 
      let rutinasArray = {}
      //Recorremos el arreglo 
      likes.value.forEach( x => {
        //Si la rutina no existe en rutinasArray entonces
        //la creamos e inicializamos el arreglo de rutinas. 
        if( !rutinasArray.hasOwnProperty(x.idRutina)){
          rutinasArray[x.idRutina] = {
            rutinas: []
          }
        }
        //Agregamos los datos de rutinas. 
          rutinasArray[x.idRutina].rutinas.push({
            nombre: x.nombre,
            idRutina: x.idRutina,
            mes: x.mes,
            cantidad: x.cantidad
          })
      })
      
      let arrayNuevo =Object.keys(rutinasArray).map(function (key) {return [Number(key), rutinasArray[key]];});
      for (let i = 0; i < arrayNuevo.length; i++) {
        let r = arrayNuevo[i];
        let rr = r[1].rutinas;
        let mesUno = { nombre: '', cantidad: 0, mes: ''};
        let mesDos = { nombre: '', cantidad: 0, mes: ''};
        let mesTres = { nombre: '', cantidad: 0, mes: ''};
        let arrayNuevoRutinas =Object.keys(rr).map(function (key) {return [Number(key), rr[key]];});
        for (let j = 0; j < arrayNuevoRutinas.length; j++) {
          let l = arrayNuevoRutinas[j];
          let ll = l[1];
          if (ll.mes == fechaActual.getMonth()) {
            mesUno.nombre = ll.nombre;
            mesUno.cantidad = ll.cantidad;
            mesUno.mes = ll.mes
          }else if (ll.mes == fechaActual.getMonth() -1) {
            
              mesDos.nombre = ll.nombre;
            
            mesDos.cantidad = ll.cantidad;
            mesDos.mes = ll.mes
          }else if (ll.mes == fechaActual.getMonth() -2) {
            
              mesTres.nombre = ll.nombre;
            
            mesTres.cantidad = ll.cantidad;
            mesTres.mes = ll.mes
          }          
        };
        
        dataLikes = [mesUno.cantidad, mesDos.cantidad, mesTres.cantidad];
        if (rutinas.length % 2 == 0) {
          borderColorLikes = [ 'rgba(255, 99, 132, 1)'];
        }else{
          borderColorLikes = [ 'rgba(54, 162, 235, 1)'];
        }
        if (rutinas.length % 2 == 0) {
          backgroundColorLikes = [ 'rgba(255, 99, 132, 0.2)'];
        }else{
          backgroundColorLikes = [ 'rgba(54, 162, 235, 0.2)'];
        }
        let nuevo = {              
          label: mesUno.nombre,
          data: dataLikes,
          backgroundColor: backgroundColorLikes,
          borderColor: borderColorLikes,
          borderWidth: 1              
        }
        rutinas = [...rutinas, nuevo];
      };
      labelsLikes = [...labelsLikes, "Mes uno", "Mes dos", "Mes tres"];
      const ctx = document.getElementById('myChart');
      if (myChart) {
        myChart.destroy();
      }
      myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labelsLikes,
              datasets: rutinas,
          },
          options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
          }
      });
    }
    const tablaCalificaciones = ()=>{
      
      let labelsCalificaciones = [];
      let dataCalificaciones = [];
      let backgroundColorLikes = [];
      let borderColorLikes = [];
      let totalCalificaciones=0;
      calificaciones.value.forEach(c => {
        totalCalificaciones += c.cantidad;
      });
      labelsCalificaciones = ['1', '2', '3','4', '5']
      calificaciones.value.forEach(c => {
        
        let data = [0,0,0,0,0];
        if (c.calificacion % 2 == 0) {
          borderColorLikes = ['rgba(255, 99, 132, 1)'];
        }else{
          borderColorLikes = ['rgba(54, 162, 235, 1)'];
        }
        if (c.calificacion % 2 == 0) {
          backgroundColorLikes = ['rgba(255, 99, 132, 0.2)'];
        }else{
          backgroundColorLikes = ['rgba(54, 162, 235, 0.2)'];
        }
        data[c.calificacion - 1] = (c.cantidad/totalCalificaciones)*100;
        let nuevo = {              
          label: c.calificacion,
          data: data,
          backgroundColor: backgroundColorLikes,
          borderColor: borderColorLikes,
          borderWidth: 1              
        }
        dataCalificaciones = [...dataCalificaciones, nuevo];
      });
      const ctx2 = document.getElementById('myChartCircle');
      if (myChartCircle) {
        myChartCircle.destroy();
      }
      myChartCircle = new Chart(ctx2, {
        type: 'polarArea',
        data: {
            labels: labelsCalificaciones,
            datasets: dataCalificaciones,              
        },
        options: {
          scales: {
            y: {
                beginAtZero: true
            }
          }
        }
      });
    }
    
    onMounted(()=>{
      fetchMeGustaTotales();
      fetchCalificacionesTotales();
    })
    return{
      likes,
      meGustas,
      seleccionMeGustas,
      mcalificaciones
    }
  }
})
</script>
<style scoped>
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
.paddingTop{
  padding-top: 0;
}
.paddingBottom0{
  padding-bottom: 0;
}
.paddingBottom10{
  padding-bottom: 10;
}
.colorP{
  color: #2CB1BC;
  cursor: pointer;
}
.alto{
  height: 68px;
}
.around{
  justify-content: space-around;
}
</style>
