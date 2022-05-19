<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho" >
      <q-form
        @submit.prevent="onSubmit"
        ref="myForm"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="text-h6 text-center gris">Registrate</div>
          
        </q-card-section>

        <q-separator />
        <q-card-section >
        <q-input v-model="nombre" label="Nombre" placeholder="Inserte su nombre"  :dense="true" class="w90 gris"
        :rules="[ val => !!val || 'Por favor escriba algo' ]"/>
        <q-input v-model="email" label="Email" placeholder="Inserte su Email" type="email" :dense="true" class="w90 gris"
        :rules="[ val => !!val || 'Por favor escriba algo', val => validarEmail(val) || 'Por favor escriba un email real' ]"/>
        <q-input v-model="password" label="Contraseña" :type="isPwd ? 'password' : 'text'" placeholder="Inserte su Contraseña" :dense="true" class="w90 gris" 
        :rules="[ val => !!val || 'Por favor escriba algo', val => val.length > 6 || 'La contraseña tiene que ser mayor a 6 caracteres' ]">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
          
        </q-card-section>

        <q-card-actions vertical class="paddingTop0 marginTop0">
          <q-toggle v-model="accept" label="Aceptar los términos" class="w90 btn" />
          <q-btn color="primary" label="Registrate" class="w90 btn" type="submit"/>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿Ya estas registrado? </label>
            <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Registro',
  setup(){
    const route = useRouter(),
          $q = useQuasar(),
          store = useStore(),
          accept = ref(false),
          email = ref(''),
          isPwd= ref(true),
          myForm = ref(null),
          nombre = ref(''),
          password = ref('');

    const validate= () => {
      myForm.value.validate().then(success => {
        if (success) {
          // yay, models are correct
        }
        else {
          // oh no, user has filled in
          // at least one invalid value
        }
      })
    }
    const iniciar=()=>{
      route.replace({name:'login'});
    }
    const validarEmail = (value) => {
      const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(emailRegex.test(value)){
        return true;
      }
      return false;
    }
    const onSubmit = async() => {
        
        if (accept.value !== true) {
          $q.notify({
            timeout: 200,
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Primero debe aceptar los términos'
          })
        }
        else {
          const respuesta = await store.dispatch('usuarios/setUsuario',{email: email.value,nombre: nombre.value, password: password.value});
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
            await $q.notify({
              timeout: 300,
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Logeado'
            })
            route.push({name: 'login'});
          }  
        }
      }
    return{
      accept,
      email,
      isPwd,
      myForm,
      nombre,
      password,
      iniciar,
      onSubmit,
      validarEmail
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
.marginTop0{
  margin-top: 0;
}
.paddingTop0{
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
</style>
