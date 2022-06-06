<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho">
      <q-form
        @submit.prevent="onSubmit"
        ref="myForm"
        class="q-gutter-md"
      >
        <q-card-section>
          <div class="text-h6 text-center gris">Recuperar Contraseña</div>
        </q-card-section>

        <q-separator />
        <q-card-section >
        <q-input v-model="password" label="Nueva Contraseña" :type="isPwd ? 'password' : 'text'" placeholder="Inserte su Contraseña" :dense="true" class="w90 gris" 
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
          <q-btn color="primary" label="Recuperar" class="w90 btn" type="submit"/>
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
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Recuperacion',
  setup(){
    const router = useRouter(),
          route = useRoute(),
          store = useStore(),
          $q = useQuasar(),
          isPwd= ref(true),
          password = ref('');
    const iniciar=()=>{
      router.replace({name:'login'});
    }
    const onSubmit = async()=>{
      const error = computed(() => store.getters['auth/getError']);
      $q.loading.show({
        delay: 400
      })
      const respuesta = await store.dispatch('auth/cambiarPassword', {password: password.value, token: route.params.token});
      $q.loading.hide()
      if (!respuesta) {
        $q.notify({
          timeout: 1300,
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: error.value.msg
        })            
      }else{
        iniciar();
      }
    }
    return{
      iniciar,
      password,
      onSubmit,
      isPwd
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
