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
        <q-toggle v-model="estado" label="Estado" class="w90 btn" />
          
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
            type: String, default: 'categoria'
        },
        objeto:{
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
        let nombre= ref(props.objeto.nombre),
            estado= ref(props.objeto.estado);
        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            if (props.objeto.tipo =='Categoria') {
              respuesta = await store.dispatch('categorias/setCategoria',{nombre: nombre.value, estado: estado.value});
              reset();
            }else if(props.objeto.tipo =='Equipamiento'){
              respuesta = await store.dispatch('equipamientos/setEquipamiento',{nombre: nombre.value, estado: estado.value});
              reset();
            }else{
              respuesta = await store.dispatch('musculos/setMusculo',{nombre: nombre.value, estado: estado.value});
              reset();
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
            if (props.objeto.tipo =='Categoria') {
              respuesta = await store.dispatch('categorias/editCategoria',{id: props.objeto.id, nombre: nombre.value, estado: estado.value});
              reset();
            }else if(props.objeto.tipo =='Equipamiento'){
              respuesta = await store.dispatch('equipamientos/editEquipamiento',{id: props.objeto.id, nombre: nombre.value, estado: estado.value});
              reset();
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
        const reset =()=>{
          nombre.value=''
          estado.value=null
          myForm.value.reset()
        }       
        onUpdated(()=>{
          myForm.value.reset()
          nombre.value=props.objeto.nombre
          estado.value=props.objeto.estado
        })
        
        return{
          nombre,
          estado,
          onSubmit,
          myForm
        }
    }
}
</script>

<style>

</style>