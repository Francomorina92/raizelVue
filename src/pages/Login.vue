<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho" v-if="!recuperar">
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
          <q-btn color="primary" label="Iniciar Sesión" type="submit" class="w90 btn"/>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿No estás registrado? </label>
            <label class="text-subtitle1 colorP" @click="registrarse">Regístrate</label>
          </div>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿Olvidaste tu contraseña? </label>
            <label class="text-subtitle1 colorP" @click="recuperarPassword(true)">Recuperar contraseña</label>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-card class="my-card ancho" v-else>
      <q-form
        @submit="onSubmitPassword"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="text-h6 text-center gris">Recuperar Contraseña</div>
        </q-card-section>

        <q-separator />
        <q-card-section >
          <q-input v-model="email" label="Email" placeholder="Inserte su Email" type="email" :dense="true" class="w90 gris"
          :rules="[ val => !!val || 'Por favor escriba algo', val => validarEmail(val) || 'Por favor escriba un email real' ]"/>
        </q-card-section>

        <q-card-actions vertical >
          <q-btn color="primary" label="Recuperar" type="submit" class="w90 btn"/>
          <div class="text-center">
            <label class="text-subtitle1 gris">¿Recuerdas la clave? </label>
            <label class="text-subtitle1 colorP" @click="recuperarPassword(false)">Inicia Sesión</label>
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup(){
    const router = useRouter(),
          route = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          email = ref(''),
          isPwd= ref(true),
          recuperar= ref(false),
          password = ref('');
    const registrarse=()=>{
      router.replace({name:'registro'});
    }
    const validarEmail = (value) => {
      const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(emailRegex.test(value)){
        return true;
      }
      return false;
    }
    const onSubmit = async() => {
      try {
        $q.loading.show({
          delay: 400
        })
        const respuesta = await store.dispatch('auth/login',{email: email.value, password: password.value});
        $q.loading.hide()
        router.push('/index');
      } catch (error) {
        $q.loading.hide()
        if (error.response.data.msg) {
          $q.notify({
            timeout: 400,
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.response.data.msg
          })
        }          
      }
    
    }
    const onSubmitPassword = async() => {
      try {
        $q.loading.show({
          delay: 400
        })
        const respuesta = await store.dispatch('auth/recuperar',{email: email.value});
        $q.loading.hide()
        recuperar.value = false;
        router.push('/');
      } catch (error) {
        $q.loading.hide()
        if (error.response.data.msg) {
          $q.notify({
            timeout: 400,
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.response.data.msg
          })
        }          
      }
    
    }
    const recuperarPassword=(valor)=>{
      recuperar.value = valor;
    }
    return{
      email,
      isPwd,
      password,
      recuperar,
      recuperarPassword,
      onSubmit,
      onSubmitPassword,
      registrarse,
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
