<template>
  <q-card class="my-card ancho" >
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
        ref="myForm"
      >
        <q-card-section>
          <div class="text-h6 text-center gris">{{objeto.tipo}}</div>
          
        </q-card-section>

        <q-separator />
        <q-card-section >
          <q-input v-model="nombre" label="Nombre" placeholder="Inserte el nombre" type="text" :dense="true" class="w90 gris"
          :rules="[ val => !!val || 'Por favor escriba algo']"/>
          <q-input v-model="preparacion" label="Preparacion" autogrow placeholder="La preparacion del ejercicio" type="text" :dense="true" class="w90 gris" maxlength='500' />
          <q-input v-model="detalles" label="Detalles" autogrow placeholder="Los detalles del ejercicio" type="text" :dense="true" class="w90 gris q-mt-md" maxlength='500' />
          <q-input v-model="ejecucion" label="Ejecucion" autogrow placeholder="Los ejecucion del ejercicio" type="text" :dense="true" class="w90 gris q-mt-md" maxlength='500' />
          
          <div class="grid">
            <q-select class="select" v-model="idCategoria" :options="categorias" label="Categoria" map-options emit-value option-value="id" option-label="nombre"/>
            <q-select class="select" v-model="idMusculoPrincipal" :options="musculos" label="Musculo Primario" map-options emit-value option-value="id" option-label="nombre"/>
            <q-select class="select" v-model="idMusculoSecundario" :options="musculos" label="Musculo Secundario" map-options emit-value option-value="id" option-label="nombre"/>
            <q-select class="select" v-model="idEquipamiento" :options="equipamientos" label="Equipamiento" map-options emit-value option-value="id" option-label="nombre"/>
            
            <q-toggle v-model="estado" label="Estado" class="w90 btn q-mt-md" />
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
      </q-form>
    </q-card>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onUpdated } from 'vue';
import { useStore } from 'vuex'
export default {
    name: 'Create',
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

    },
    setup(props){
        const $q = useQuasar(),
              store = useStore(),
              myForm = ref(null);
        let detalles= ref(props.objeto.detalles),
            ejecucion= ref(props.objeto.ejecucion),
            estado= ref(props.objeto.estado),
            idCategoria= ref(props.objeto.idCategoria),
            idEquipamiento= ref(props.objeto.idEquipamiento),
            idMusculoPrincipal= ref(props.objeto.idMusculoPrincipal),
            idMusculoSecundario= ref(props.objeto.idMusculoSecundario),
            nombre= ref(props.objeto.nombre),
            preparacion= ref(props.objeto.preparacion);
        let numeroSerie= ref(1),
            descansoSerie= ref(0),
            tipoSerie= ref(1),
            observaciones= ref(''),
            unidadTiempo= ref(1);
        let repUno= ref(),
            cargaUno= ref(),
            repDos= ref(),
            cargaDos= ref(),
            repTres= ref(),
            cargaTres= ref(),
            repCuatro= ref(),
            cargaCuatro= ref(),
            repCinco= ref(),
            cargaCinco= ref();

        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            respuesta = await store.dispatch('ejercicios/setEjercicio',{
              detalles: detalles.value,
              ejecucion: ejecucion.value,
              estado: estado.value,
              idCategoria: idCategoria.value,
              idEquipamiento: idEquipamiento.value,
              idMusculoPrincipal: idMusculoPrincipal.value,
              idMusculoSecundario: idMusculoSecundario.value,
              nombre: nombre.value,
              preparacion: preparacion.value,
              idPerfil: 2 //corregir esto luego con login
            });
            reset();
            
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
            
            respuesta = await store.dispatch('ejercicios/editEjercicio',{
              id: props.objeto.id,
              detalles: detalles.value,
              ejecucion: ejecucion.value,
              estado: estado.value,
              idCategoria: idCategoria.value,
              idEquipamiento: idEquipamiento.value,
              idMusculoPrincipal: idMusculoPrincipal.value,
              idMusculoSecundario: idMusculoSecundario.value,
              nombre: nombre.value,
              preparacion: preparacion.value,
              idPerfil: 2 //corregir esto luego con login
            });
            reset();
            
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
        const reset =()=>{
          detalles.value='',
          ejecucion.value='',
          estado.value=null,
          idCategoria.value='',
          idEquipamiento.value='',
          idMusculoPrincipal.value='',
          idMusculoSecundario.value='',
          nombre.value='',
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
          nombre.value=props.objeto.nombre
          preparacion.value=props.objeto.preparacion
        })
        
        return{
          detalles,
          ejecucion,
          estado,
          idCategoria,
          idEquipamiento,
          idMusculoPrincipal,
          idMusculoSecundario,
          nombre,
          preparacion,
          onSubmit,
          myForm,
          serieRules: [
            val => (val !== null && val !== '') || 'Por favor escriba un numero',
            val => (val > 0 && val < 5) || 'El numero debe ser entre 1 y 5'
          ],
          numeroSerie,
          descansoSerie,
          tipoSerie,
          repUno,
          cargaUno,
          repDos,
          cargaDos,
          repTres,
          cargaTres,
          repCuatro,
          cargaCuatro,
          repCinco,
          cargaCinco,
          unidadTiempo,
          observaciones
        }
    }
}
</script>

<style>
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
</style>