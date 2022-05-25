<template>
  <q-page class="flex flex-center">
    <q-card class="my-card ancho" >
        <q-card-section>
          <div class="text-h4 text-center gris">Gracias por confirmar el mail</div>
        </q-card-section>
        <q-card-actions vertical class="paddingTop0 marginTop0">
          <div class="text-center">
            <label class="text-subtitle1 colorP" @click="iniciar">Inicia Sesión</label>
          </div>
        </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup(){
    const router = useRouter(),
          route = useRoute(),
          store = useStore(),
          $q = useQuasar();
    
    const fetchConfirmacion = async()=>{
      const error = computed(() => store.getters['auth/getError']);
      $q.loading.show({
        delay: 400
      })
      const respuesta = await store.dispatch('auth/confirmar', {token: route.params.token});
      $q.loading.hide()
      if (!respuesta) {
        $q.notify({
          timeout: 1300,
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: error.value.msg
        })            
      }
    }
    onMounted(()=>{
      fetchConfirmacion()
    })
    return{
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
