<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho" v-if="!listo">
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
          <q-toggle v-model="accept" label="Aceptar los términos" class="w90 btn">
            <q-icon color="primary" name="fa-solid fa-file-invoice" class="q-ml-sm" @click="terminos()"/>
          </q-toggle>
          <q-btn color="primary" label="Registrate" class="w90 btn" type="submit"/>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿Ya estas registrado? </label>
            <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-card class="my-card ancho w90" v-else>
        <q-card-section>
          <div class="text-h6 text-center gris">El usuario se ha creado satisfactoriamente</div>
          <div class="text-h6 text-center gris">Se ha enviado un correo electrónico a <span>{{email}}</span>  Contiene un enlace de activación en el que debes hacer clic para activar tu cuenta.</div>
          <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label>
        </q-card-section>
    </q-card>
    <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terminos y condiciones</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Rechazar" color="primary" v-close-popup @click="aceptar(false)"/>
          <q-btn flat label="Aceptar" color="primary" v-close-popup @click="aceptar(true)"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, computed } from 'vue'
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
          listo = ref(false),
          fixed = ref(false),
          password = ref('');
    const error = computed(() => store.getters['usuarios/getError']);
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
    const terminos = ()=>{
      fixed.value = !fixed.value;
    }
    const aceptar = (valor)=>{
      accept.value = valor;
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
          $q.loading.show({
            delay: 400
          })
          const respuesta = await store.dispatch('usuarios/setUsuario',{email: email.value,nombre: nombre.value, password: password.value});
          $q.loading.hide()
          if (!respuesta) {
            $q.notify({
              timeout: 500,
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: error.value[0].msg
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
            listo.value=true
          }  
        }
      }
    return{
      accept,
      aceptar,
      email,
      iniciar,
      isPwd,
      listo,
      myForm,
      nombre,
      onSubmit,
      fixed,
      password,
      validarEmail,
      terminos
    }
  }
})
</script>
<style scoped>
span{
  font-weight: bold;
}
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
