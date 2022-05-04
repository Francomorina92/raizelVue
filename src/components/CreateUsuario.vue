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
          <q-input v-if="accion=='C'" v-model="nombre" label="Nombre" placeholder="Inserte el nombre" type="text" :dense="true" class="w90 gris"
          :rules="[ val => !!val || 'Por favor escriba algo']"/>
          <q-input v-model="email" label="Email" placeholder="Inserte el email" type="text" :dense="true" class="w90 gris"
          :rules="[ val => !!val || 'Por favor escriba algo', val => validarEmail(val) || 'Por favor escriba un email real' ]"/>
          <q-input v-if="accion=='C'" v-model="password" label="Contraseña" placeholder="Inserte la contraseña" type="text" :dense="true" class="w90 gris"
          :rules="[ val => !!val || 'Por favor escriba algo']"/>
          <q-toggle v-model="estado" label="Estado" class="w90 btn" />
          <q-select v-model="rol" :options="roles" label="Rol" />
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
            type: String, default: 'usuario'
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
        let email= ref(props.objeto.email),
            estado= ref(props.objeto.estado),
            nombre= ref(props.objeto.nombre),
            password= ref(''),
            rol= ref(props.objeto.rol);

        const validarEmail = (value) => {
          const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(emailRegex.test(value)){
            return true;
          }
          return false;
        }
        const onSubmit =async () => {
          let respuesta = null;
          if (props.accion=='C') {
            if (props.objeto.tipo =='Usuario') {
              respuesta = await store.dispatch('usuarios/setUsuario',{email: email.value,nombre: nombre.value, estado: estado.value, rol: rol.value == 'Administrador' ? 'ADMIN_ROLE' : 'USER_ROLE', password: password.value});
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
            if (props.objeto.tipo =='Usuario') {
              respuesta = await store.dispatch('usuarios/editUsuario',{id: props.objeto.id, email: email.value, estado: estado.value, rol: rol.value});
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
          email.value='',
          nombre.value='',
          rol.value='',
          password.value='',
          estado.value=null
          myForm.value.reset()
        }       
        onUpdated(()=>{
          myForm.value.reset()
          password.value=''
          email.value=props.objeto.email
          nombre.value=''
          rol.value=props.objeto.rol
          estado.value=props.objeto.estado
        })
        
        return{
          email,
          nombre,
          password,
          rol,
          estado,
          onSubmit,
          myForm,
          roles: [
            'Administrador', 'Usuario'
          ],
          validarEmail
        }
    }
}
</script>

<style>

</style>