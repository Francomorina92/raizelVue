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

        <q-card-actions vertical >
          <q-btn color="primary" :label="accion=='C'?'Crear':'Actualizar'" type="submit" class="w90 btn"/>
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
          myForm
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
</style>