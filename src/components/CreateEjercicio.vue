<template>
  <q-card class="my-card ancho" >
      <q-btn
        color="primary"
        icon-right="fa-solid fa-circle-xmark"
        no-caps
        unelevated
        @click="$emit('cancelar')"           
      />
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
        ref="myForm"
      >
        <!-- Seleccionar ejercicio -->
        <div v-show="show && Object.keys(objetoE).length === 0 ">
          <q-card-section class="cancelar">
            <div class="text-h6 text-center gris ">Seleccione un ejercicio</div>            
          </q-card-section>
          <div class="q-pa-md ">
            <q-select class="select q-ma-md " v-model="idEjercicio" :options="ejercicios" label="Ejercicio" map-options emit-value option-value="id" option-label="nombre"/>
          </div>
          <q-card-actions vertical v-if="idEjercicio">
            <q-btn color="primary" @click="mostrar" label="Siguiente" type="button" class="w90 btn"/>
          </q-card-actions>
        </div>
        <!-- Ejercicio en si -->
        <div v-show="show || isRutina == false">
          <q-card-section class="cancelar">
            <div class="text-h6 text-center gris">{{objeto.tipo}}</div>            
          </q-card-section>
          <q-separator />
        <q-card-section class="imagen">
          <label v-show="!isRutina" for="seleccionArchivos" class="labelArchivo q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable w90 btn">
            Cambiar
          </label>
          <input type="file" id="seleccionArchivos" accept="image/*" class="input">
          
          <q-img :src="imagen != '' ? imagen : 'https://res.cloudinary.com/raizel/image/upload/v1655250986/wmozjlogmld4lpb7un4c.jpg'" />        
          
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
              
              <q-toggle v-model="estado" :readonly="isRutina" label="Estado" class="w90 btn q-mt-md" />
            </div>
          </q-card-section>
          <q-card-section v-if="isRutina">
            <div class="tipoSerie">
              <q-btn-toggle
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
            <q-input v-model.number="numeroSerie" label="Numero de Serie" autogrow type="number" mask="#" :dense="true" class=" gris q-mt-md" 
            :rules="serieRules"/>
            <q-input v-model.number="descansoSerie" label="Descanso entre series" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="s"/>
            </div>
            <label class="gris"> Series</label>
            <div v-if="tipoSerie != 2">
              <div class="flex series justify-center" v-if="numeroSerie>=1">
                <q-input v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">1° Rep:</p>
                  </template>
                </q-input>
                <q-input v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '1° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=2">
                <q-input v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">2° Rep:</p>
                  </template>
                </q-input>
                <q-input v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '2° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=3">
                <q-input v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">3° Rep:</p>
                  </template>
                </q-input>
                <q-input v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '3° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=4">
                <q-input v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">4° Rep:</p>
                  </template>
                </q-input>
                <q-input v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '4° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
              <div class="flex series justify-center" v-if="numeroSerie>=5">
                <q-input v-if="tipoSerie==1 || tipoSerie==3" v-model.number="repCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' >
                  <template v-slot:before>
                    <p class="label">5° Rep:</p>
                  </template>
                </q-input>
                <q-input v-if="tipoSerie==1 || tipoSerie==4" v-model.number="cargaCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' suffix="kg">
                  <template v-slot:before>
                    <p class="label">{{tipoSerie == 4 ? '5° ':''}}Carga:</p>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Duracion -->
            <div v-if="tipoSerie==2" class=" flex justify-center">
              <div class="series justify-center tiempo" v-if="numeroSerie>=1">
                <q-input v-model.number="repUno" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">1° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=2">
                <q-input v-model.number="repDos" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">2° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=3">
                <q-input v-model.number="repTres" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">3° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=4">
                <q-input v-model.number="repCuatro" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">4° Duración:</p>
                  </template>
                </q-input>
              </div>
              <div class="series justify-center tiempo" v-if="numeroSerie>=5">
                <q-input v-model.number="repCinco" autogrow type="number" mask="###" :dense="true" input-class="text-right" class=" gris q-mt-md" maxlength='500' :suffix="unidadTiempo == 1 ? 'min':'s'" >
                  <template v-slot:before>
                    <p class="label">5° Duración:</p>
                  </template>
                </q-input>
              </div>
            </div>
            <q-input v-model="observaciones" label="Observaciones" autogrow type="text" :dense="true" class="w90 gris" maxlength='500' />
          </q-card-section>

          <q-card-actions vertical >
            <q-btn color="primary" :label="accion == 'C' ? 'Crear' : 'Actualizar'" type="submit" class="w90 btn"/>
          </q-card-actions>
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
        }

    },
    setup(props){
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

        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            if (props.isRutina) {
              respuesta = await store.dispatch('rutinas/setDetalle',{
                idRutina: route.params.id,
                idEjercicio: idEjercicio.value,
                tipoSerie: tipoSerie.value,
                cantidadSerie: numeroSerie.value,
                descanso: descansoSerie.value,
                repeticionesUno: repUno.value,
                repeticionesDos: repDos.value,
                repeticionesTres: repTres.value,
                repeticionesCuatro: repCuatro.value,
                repeticionesCinco: repCinco.value,
                cargaUno: cargaUno.value,
                cargaDos: cargaDos.value,
                cargaTres: cargaTres.value,
                cargaCuatro: cargaCuatro.value,
                cargaCinco: cargaCinco.value,
                unidad: unidadTiempo.value,
                observaciones: observaciones.value
              });
              reset();
              ctx.emit('cancelar');
            }else{
              respuesta = await store.dispatch('ejercicios/setEjercicio',{
                detalles: detalles.value,
                ejecucion: ejecucion.value,
                estado: estado.value,
                idCategoria: idCategoria.value,
                idEquipamiento: idEquipamiento.value,
                idMusculoPrincipal: idMusculoPrincipal.value,
                idMusculoSecundario: idMusculoSecundario.value,
                tiempo: tiempo.value,
                nombre: nombre.value,
                preparacion: preparacion.value,
                idPerfil: perfil.value.id
              });
              if (imagen.value != '') {
                await store.dispatch('uploads/editUploads',{coleccion: 'ejercicios',id: respuesta.id, archivo: primerArchivo });
              }
              reset();
              ctx.emit('cancelar');
            }
            
            
            if (!respuesta) {
              $q.notify({
                timeout: 300,
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Se produjo un error'
              })
            }
            else {
              $q.notify({
                timeout: 300,
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: props.accion=='C' ? 'Se ha podido crear correctamente' :'Se ha podido modificar correctamente'
              })
            }  
          }else if (props.accion=='E') {
            if (props.isRutina) {
                respuesta = await store.dispatch('rutinas/editDetalle',{
                  id: props.objetoE.id,
                  idRutina: route.params.id,
                  idEjercicio: idEjercicio.value,
                  tipoSerie: tipoSerie.value,
                  cantidadSerie: numeroSerie.value,
                  descanso: descansoSerie.value,
                  repeticionesUno: repUno.value,
                  repeticionesDos: repDos.value,
                  repeticionesTres: repTres.value,
                  repeticionesCuatro: repCuatro.value,
                  repeticionesCinco: repCinco.value,
                  cargaUno: cargaUno.value,
                  cargaDos: cargaDos.value,
                  cargaTres: cargaTres.value,
                  cargaCuatro: cargaCuatro.value,
                  cargaCinco: cargaCinco.value,
                  unidad: unidadTiempo.value,
                  observaciones: observaciones.value
                });                
                reset();
                ctx.emit('cancelar');
            }
            else{
              respuesta = await store.dispatch('ejercicios/editEjercicio',{
                id: props.objeto.id,
                detalles: detalles.value,
                ejecucion: ejecucion.value,
                estado: estado.value,
                idCategoria: idCategoria.value,
                idEquipamiento: idEquipamiento.value,
                idMusculoPrincipal: idMusculoPrincipal.value,
                idMusculoSecundario: idMusculoSecundario.value,
                tiempo: tiempo.value,
                nombre: nombre.value,
                preparacion: preparacion.value,
                idPerfil: perfil.value.id
              });
              if (imagen.value != '') {
                await store.dispatch('uploads/editUploads',{coleccion: 'ejercicios',id: respuesta.id, archivo: primerArchivo });
                respuesta.img = uploads.value;
                await store.dispatch('ejercicios/cambiarImagen', respuesta);
              }
              reset();
              ctx.emit('cancelar');
            }
            
            
            if (!respuesta) {
              $q.notify({
                timeout: 300,
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Se produjo un error'
              })
            }
            else {
              $q.notify({
                timeout: 300,
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: props.accion=='C' ? 'Se ha podido crear correctamente' :'Se ha podido modificar correctamente'
              })
            } 
          }
                    
        } 
        onMounted(()=>{
          fetchPerfil();
          cambiarImagen();
        })
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
          onSubmit,
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
          user
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