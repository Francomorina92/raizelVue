<template>
  <q-card class="my-card ancho" >
      <q-form
        class="q-gutter-md q-mb-md"
        ref="myForm"
      >
        
        <div class="q-mb-md">
          <q-card-section class="cancelar">
            <div class="text-h6 text-center gris">{{objeto.tipo}}</div>            
          </q-card-section>
          <q-separator />
        <q-card-section class="imagen">
          <input type="file" id="seleccionArchivos" accept="image/*" class="input">          
          <q-img :fit="contain" :src="imagen != '' ? imagen : 'https://res.cloudinary.com/raizel/image/upload/v1655250986/wmozjlogmld4lpb7un4c.jpg'" />        
        </q-card-section>
          <q-separator />
          <q-card-section >
            <q-input v-model="nombre" :readonly="isRutina" label="Nombre" placeholder="Inserte el nombre" type="text" :dense="true" class="w90 gris"
            :rules="[ val => !!val || 'Por favor escriba algo']"/>
            <q-input v-model="preparacion" :readonly="isRutina" label="Preparacion" autogrow placeholder="La preparacion del ejercicio" type="text" :dense="true" class="w90 gris" maxlength='500' />
            <q-input v-model="detalles" :readonly="isRutina" label="Detalles" autogrow placeholder="Los detalles del ejercicio" type="text" :dense="true" class="w90 gris q-mt-md" maxlength='500' />
            <q-input v-model="ejecucion" :readonly="isRutina" label="Ejecucion" autogrow placeholder="Los ejecucion del ejercicio" type="text" :dense="true" class="w90 gris q-mt-md" maxlength='500' />
            <q-input v-model.number="tiempo" :readonly="isRutina" label="Tiempo" mask="###" autogrow placeholder="El tiempo promedio del ejercicio" type="number" :dense="true" class="w90 gris q-mt-md" />
            
            <div class="grid">
              <q-select class="select" :readonly="isRutina" v-model="idCategoria" :options="categorias" label="Categoria" map-options emit-value option-value="id" option-label="nombre"/>
              <q-select class="select" :readonly="isRutina" v-model="idMusculoPrincipal" :options="musculos" label="Musculo Primario" map-options emit-value option-value="id" option-label="nombre"/>
              <q-select class="select" :readonly="isRutina" v-model="idMusculoSecundario" :options="musculos" label="Musculo Secundario" map-options emit-value option-value="id" option-label="nombre"/>
              <q-select class="select" :readonly="isRutina" v-model="idEquipamiento" :options="equipamientos" label="Equipamiento" map-options emit-value option-value="id" option-label="nombre"/>
            </div>
          
            <div class="tipoSerie">
              <q-btn-toggle
              v-if="false"
              :readonly="isRutina"
                v-model="tipoSerie"
                class="toggle"
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  {label: 'Rep y Series', value: 1},
                  {label: 'Tiempo', value: 2},
                  {label: 'Repeticiones', value: 3},
                  {label: 'Carga', value: 4}
                ]"
              />
            </div>
            <div v-if="tipoSerie==2" class="row justify-start items-center q-mt-md">
              <label class="gris">Unidad de tiempo:</label>
              <q-btn-toggle
              v-if="false"
              :readonly="isRutina"
                v-model="unidadTiempo"
                class="toggle q-ml-md"
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  {label: 'Minuto(s)', value: 1},
                  {label: 'Segundos', value: 2}
                ]"
              />
            </div>
            <div class="grid">
            <q-input v-model.number="numeroSerie"  :readonly="isRutina" label="Numero de Serie" autogrow type="number" mask="#" :dense="true" class=" gris q-mt-md" 
            :rules="serieRules"/>
            <q-input v-model.number="descansoSerie" :readonly="isRutina" label="Descanso entre series" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="s"/>
            </div>
            <label class="gris"> Series</label>
            <div v-if="tipoSerie != 2">
              <div class="flex series justify-center" v-if="numeroSerie>=1">
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">1° Rep:</p>
                  </template>
                </q-input>
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '1° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=2">
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">2° Rep:</p>
                  </template>
                </q-input>
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '2° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=3">
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">3° Rep:</p>
                  </template>
                </q-input>
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '3° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=4">
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">4° Rep:</p>
                  </template>
                </q-input>
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '4° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=5">
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">5° Rep:</p>
                  </template>
                </q-input>
                <q-input :readonly="isRutina" v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '5° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Duracion -->
            <div v-if="tipoSerie==2" class=" flex justify-center">
              <div class="series justify-center tiempo" v-if="numeroSerie>=1">
                <q-input :readonly="isRutina" v-model.number="repUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">1° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=2">
                <q-input :readonly="isRutina" v-model.number="repDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">2° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=3">
                <q-input :readonly="isRutina" v-model.number="repTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">3° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=4">
                <q-input :readonly="isRutina" v-model.number="repCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">4° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=5">
                <q-input :readonly="isRutina" v-model.number="repCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">5° Duración:</p>
                  </template>
                </q-input>
              </div>
            </div>
            <q-input :readonly="isRutina" v-model="observaciones" label="Observaciones" autogrow type="text" :dense="true" class="w90 gris" maxlength='500' />
          </q-card-section>
        </div>
      </q-form>
    </q-card>

</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onUpdated, onMounted, computed } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';
export default {
    name: 'Create',
    emits: ['cancelar'],
    props:{
        tipo: {
            type: String, default: 'ejercicio'
        },
        objeto:{
            type: Object, default: () => ({})
        },
        categorias: {
          type: Object, default: () => ({})
        },
        ejercicios: {
          type: Object, default: () => ({})
        },
        objetoE:{
            type: Object, default: () => ({})
        },
        musculos: {
          type: Object, default: () => ({})
        },
        equipamientos: {
          type: Object, default: () => ({})
        },
        accion: {
            type: String, default: 'C'
        },
        isRutina: {
            type: Boolean, default: false
        },
        isShow: {
            type: Boolean, default: false
        },


    },
    setup(props, ctx){
        const $q = useQuasar(),
              route = useRoute(),
              store = useStore(),
              myForm = ref(null);
        let detalles= ref(props.objeto.detalles),
            ejecucion= ref(props.objeto.ejecucion),
            estado= ref(props.objeto.estado),
            idCategoria= ref(props.objeto.idCategoria),
            idEjercicio= ref(props.objetoE.idEjercicio),
            idEquipamiento= ref(props.objeto.idEquipamiento),
            idMusculoPrincipal= ref(props.objeto.idMusculoPrincipal),
            idMusculoSecundario= ref(props.objeto.idMusculoSecundario),
            tiempo= ref(props.objeto.tiempo),
            nombre= ref(props.objeto.nombre),
            show= ref(props.isRutina),
            preparacion= ref(props.objeto.preparacion),
            imagen= ref(props.objeto.img ? props.objeto.img : ''),
            imagenSeleccionada,
            primerArchivo;

        let numeroSerie= ref(props.objetoE.numeroSerie ? props.objetoE.numeroSerie : 1),
            descansoSerie= ref(props.objetoE.descansoSerie ? props.objetoE.descansoSerie : 0),
            tipoSerie= ref(props.objetoE.tipoSerie ? props.objetoE.tipoSerie : 1),
            observaciones= ref(props.objetoE.observaciones ? props.objetoE.observaciones : ''),
            unidadTiempo= ref(props.objetoE.unidadTiempo ? props.objetoE.unidadTiempo : 1);

        let repUno= ref(props.objetoE.repeticionesUno ? props.objetoE.repeticionesUno : null),
            cargaUno= ref(props.objetoE.cargaUno ? props.objetoE.cargaUno : null),
            repDos= ref(props.objetoE.repeticionesDos ? props.objetoE.repeticionesDos : null),
            cargaDos= ref(props.objetoE.cargaDos ? props.objetoE.cargaDos : null),
            repTres= ref(props.objetoE.repeticionesTres ? props.objetoE.repeticionesTres : null),
            cargaTres= ref(props.objetoE.cargaTres ? props.objetoE.cargaTres : null),
            repCuatro= ref(props.objetoE.repeticionesCuatro ? props.objetoE.repeticionesCuatro : null),
            cargaCuatro= ref(props.objetoE.cargaCuatro ? props.objetoE.cargaCuatro : null),
            repCinco= ref(props.objetoE.repeticionesCinco ? props.objetoE.repeticionesCinco : null),
            cargaCinco= ref(props.objetoE.cargaCinco ? props.objetoE.cargaCinco : null);

        onMounted(()=>{
          fetchPerfil();
          cambiarImagen();
        })
        function eliminar (){
          $q.dialog({
            title: 'Eliminar',
            message: '¿Seguro que quiere eliminar el detalle?',
            cancel: true,
            persistent: true
          }).onOk(async() => {
            await store.dispatch('rutinas/deleteDetalle',{id:props.objetoE.id})
          })
        }
        const uploads = computed(() => store.getters['uploads/getUrl']);
        const perfil = computed(() => store.getters['perfiles/getPerfil']);
        const fetchPerfil = async()=>{
          await store.dispatch('perfiles/loadPerfil',{id: user.value.id});
        }
        const user = computed(() => store.getters['auth/getMe']);
        
        const cambiarImagen = () => {
          
            
            const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
            $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
            if ($seleccionArchivos) {
             
              // Escuchar cuando cambie
              $seleccionArchivos.addEventListener("change", () => {
                // Los archivos seleccionados, pueden ser muchos o uno
                const archivos = $seleccionArchivos.files;
                // Si no hay archivos salimos de la función y quitamos la imagen
                if (!archivos || !archivos.length) {
                  imagen.value = "";
                  return;
                }
                // Ahora tomamos el primer archivo, el cual vamos a previsualizar
                primerArchivo = archivos[0];
                // Lo convertimos a un objeto de tipo objectURL
                const objectURL = URL.createObjectURL(primerArchivo);
                // Y a la fuente de la imagen le ponemos el objectURL
                imagen.value = objectURL;
              });
            }
        };
        const reset =()=>{
          detalles.value='',
          ejecucion.value='',
          estado.value=null,
          idCategoria.value='',
          idEquipamiento.value='',
          idMusculoPrincipal.value='',
          idMusculoSecundario.value='',
          tiempo.value=0,
          imagen.value='',
          nombre.value='',
          show.value=false,
          preparacion.value='',
          myForm.value.reset()
        }       
        onUpdated(()=>{
          myForm.value.reset()
          detalles.value=props.objeto.detalles
          ejecucion.value=props.objeto.ejecucion
          estado.value=props.objeto.estado
          idCategoria.value=props.objeto.idCategoria
          idEquipamiento.value=props.objeto.idEquipamiento
          idMusculoPrincipal.value=props.objeto.idMusculoPrincipal
          idMusculoSecundario.value=props.objeto.idMusculoSecundario
          tiempo.value=props.objeto.tiempo
          nombre.value=props.objeto.nombre
          imagen.value=props.objeto.img
          show.value=props.isRutina
          preparacion.value=props.objeto.preparacion
          numeroSerie= props.objetoE.numeroSerie ? props.objetoE.numeroSerie : 1
          descansoSerie= props.objetoE.descansoSerie ? props.objetoE.descansoSerie : 0
          tipoSerie= props.objetoE.tipoSerie ? props.objetoE.tipoSerie : 1
          observaciones= props.objetoE.observaciones ? props.objetoE.observaciones : ''
          unidadTiempo= props.objetoE.unidadTiempo ? props.objetoE.unidadTiempo : 1
          repUno=props.objetoE.repeticionesUno ? props.objetoE.repeticionesUno : null
          cargaUno=props.objetoE.cargaUno ? props.objetoE.cargaUno : null
          repDos=props.objetoE.repeticionesDos ? props.objetoE.repeticionesDos : null
          cargaDos=props.objetoE.cargaDos ? props.objetoE.cargaDos : null
          repTres=props.objetoE.repeticionesTres ? props.objetoE.repeticionesTres : null
          cargaTres=props.objetoE.cargaTres ? props.objetoE.cargaTres : null
          repCuatro=props.objetoE.repeticionesCuatro ? props.objetoE.repeticionesCuatro : null
          cargaCuatro=props.objetoE.cargaCuatro ? props.objetoE.cargaCuatro : null
          repCinco=props.objetoE.repeticionesCinco ? props.objetoE.repeticionesCinco : null
          cargaCinco=props.objetoE.cargaCinco ? props.objetoE.cargaCinco : null
        })
        const mostrar = () => {
          show.value = false
          const e = props.ejercicios.find( ej => ej.id === idEjercicio.value )
          detalles.value=e.detalles
          ejecucion.value=e.ejecucion
          estado.value=e.estado
          idCategoria.value=e.idCategoria
          idEquipamiento.value=e.idEquipamiento
          idMusculoPrincipal.value=e.idMusculoPrincipal
          idMusculoSecundario.value=e.idMusculoSecundario
          tiempo.value=e.tiempo
          nombre.value=e.nombre
          imagen.value = e.img
          preparacion.value=e.preparacion
        }
        return{
          detalles,
          ejecucion,
          estado,
          idCategoria,
          idEquipamiento,
          idMusculoPrincipal,
          idMusculoSecundario,
          tiempo,
          nombre,
          mostrar,
          preparacion,
          myForm,
          serieRules: [
            val => (val !== null && val !== '') || 'Por favor escriba un numero',
            val => (val > 0 && val < 6) || 'El numero debe ser entre 1 y 5'
          ],
          numeroSerie,
          descansoSerie,
          tipoSerie,
          repUno,
          cargaUno,
          idEjercicio,
          repDos,
          cargaDos,
          repTres,
          cargaTres,
          repCuatro,
          cargaCuatro,
          repCinco,
          cargaCinco,
          unidadTiempo,
          show,
          observaciones,
          imagen,
          imagenSeleccionada,
          cambiarImagen,
          user,
          eliminar
        }
    }
}
</script>

<style>
.input{
  opacity: 0;
  position: absolute;
}
.imagen{
  position: relative;

}

.labelArchivo{
  position: absolute;
  z-index: 1;
  top: 6%;
  left: 4%;
}
.grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.toggle{
  border: 1px solid #2CB1BC;
}
.tipoSerie{
  display: flex;
  justify-content: center;
}
.label{
  font-size: 15px;
}
.series .q-field__marginal{
  height: auto !important;
  margin: auto;
}
.series p{
  margin: auto;
}
.tiempo{
  max-width: 50%;
}
.gris{
  color: #707070;
}
.cancelar{
  padding-top: 0;
}

</style>