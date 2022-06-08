<template >
  <q-card class="my-card ancho" :class="ver ? '': 'fi'">
       <q-btn
          v-if="!ver"
          color="primary"
          icon-right="fa-solid fa-circle-xmark"
          class=""
          no-caps
          unelevated
          @click="$emit('cancelar')"           
        />
      <q-form
        @submit.prevent="onSubmit"
        class="q-gutter-md"
        ref="myForm"
      >
        <q-card-section v-if="!ver">
          <div class="text-h6 text-center gris">Comentario</div>          
        </q-card-section>
        <q-card-section>
          <q-rating v-model="calificacion" :readonly="ver" :max="5" :min="1"  size="32px" color="orange" v-if="calificacion"/>         
        </q-card-section>

        <q-separator />
        <q-card-section >
          <q-input v-model="comentario" :readonly="ver" label="Comentario" placeholder="Inserte el comentario" type="textarea" :dense="true" class="w90 gris textArea"/>
        </q-card-section>

        <q-card-actions vertical v-if="!ver">
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
    emits: ['cancelar'],
    props:{
        objeto:{
            type: Object, default: () => ({})
        },
        accion: {
            type: String, default: 'C'
        },
        idUsuario: {
            type: Number, default: 0
        },
        idPerfil: {
            type: Number, default: 0
        },
        ver: {
          type: Boolean, default: true
        }
    },
    setup(props, ctx){
        const $q = useQuasar(),
              store = useStore(),
              myForm = ref(null);
        let comentario= ref(props.objeto.mensaje),
            calificacion= ref(props.objeto.calificacion ? props.objeto.calificacion : 1);
        
        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            
            respuesta = await store.dispatch('comentarios/setCalificacion',{mensaje: comentario.value, calificacion: calificacion.value, idPerfil: props.idPerfil, idUsuario: props.idUsuario});
            reset();
            ctx.emit('cancelar');
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
            
            respuesta = await store.dispatch('comentarios/editCalificacion',{id: props.objeto.id, mensaje: comentario.value, calificacion: calificacion.value, idPerfil: props.idPerfil, idUsuario: props.idUsuario});
            reset();
            ctx.emit('cancelar');
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
          calificacion.value=''
          comentario.value=null
          myForm.value.reset()
        }       
        onUpdated(()=>{
          myForm.value.reset()
          calificacion.value=props.objeto.calificacion
          comentario.value=props.objeto.mensaje
        })
        
        return{
          comentario,
          calificacion,
          onSubmit,
          myForm
        }
    }
}
</script>

<style>
textarea{
  resize: none !important;
}
.fi{
  position: absolute;
  left: 35%;
}
</style>