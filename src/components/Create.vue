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

        <q-separator v-if="objeto.tipo == 'Rutina'"/>
        <q-card-section class="imagen" v-if="objeto.tipo == 'Rutina'">
          <label for="seleccionArchivos" class="labelArchivo q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable w90 btn">
            Cambiar
          </label>
          <input type="file" id="seleccionArchivos" accept="image/*" class="input">
          
          <q-img :src="imagen != '' ? imagen : 'https://res.cloudinary.com/raizel/image/upload/v1655250986/wmozjlogmld4lpb7un4c.jpg'" />        
          
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
import { defineComponent, ref, onUpdated, onMounted } from 'vue';
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
            estado= ref(props.objeto.estado),
            imagen= ref(props.objeto.imagen ? props.objeto.imagen : ''),
            imagenSeleccionada,
            primerArchivo;
        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            if (props.objeto.tipo =='Categoria') {
              respuesta = await store.dispatch('categorias/setCategoria',{nombre: nombre.value, estado: estado.value});
              reset();
            }else if(props.objeto.tipo =='Equipamiento'){
              respuesta = await store.dispatch('equipamientos/setEquipamiento',{nombre: nombre.value, estado: estado.value});
              reset();
            }else if(props.objeto.tipo =='Rutina'){
              respuesta = await store.dispatch('rutinas/setRutina',{nombre: nombre.value, idPerfil: props.objeto.idPerfil});
              if (imagen.value != '') {
                await store.dispatch('uploads/editUploads',{coleccion: 'rutinas',id: respuesta.id, archivo: primerArchivo });
              }
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
            }else{
              respuesta = await store.dispatch('musculos/editMusculo',{id: props.objeto.id, nombre: nombre.value, estado: estado.value});
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

        onMounted(()=>{
          cambiarImagen();
        })
        const cambiarImagen = () => {
          if (props.objeto.tipo == 'Rutina') {
            
            const $seleccionArchivos = document.querySelector("#seleccionArchivos"),
            $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
  
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
          nombre.value=''
          estado.value=null
          imagen.value=null
          myForm.value.reset()
        }       
        onUpdated(()=>{
          myForm.value.reset()
          nombre.value=props.objeto.nombre
          estado.value=props.objeto.estado
          imagen.value=props.objeto.imagen ? props.objeto.imagen : '';
        })
        
        return{
          nombre,
          estado,
          onSubmit,
          myForm,
          imagen,
          imagenSeleccionada,
          cambiarImagen
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
.icon{
  color: white;
  font-size: 30px;
}

</style>