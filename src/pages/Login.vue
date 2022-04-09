<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho" >
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="text-h6 text-center gris">Bienvenido</div>
          
        </q-card-section>

        <q-separator />
        <q-card-section >
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

        <q-card-actions vertical >
          <q-btn color="primary" label="Iniciar Sesion" type="submit" class="w90 btn"/>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿No estas registrado? </label>
            <label class="text-subtitle1 colorP" @click="registrarse">Registrate</label>
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

export default defineComponent({
  name: 'Login',
  setup(){
    const route = useRouter(),
          $q = useQuasar(),
          isPwd= ref(true),
          email = ref(''),
          password = ref('');
    const registrarse=()=>{
      route.replace({name:'registro'});
    }
    const validarEmail = (value) => {
      const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(emailRegex.test(value)){
        return true;
      }
      return false;
    }
    const onSubmit = () => {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Primero debe aceptar los términos'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Logeado'
          })
        }
      }
    return{
      email,
      isPwd,
      password,
      validarEmail,
      registrarse,
      onSubmit
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
.paddingTop{
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
