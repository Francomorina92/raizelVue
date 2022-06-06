<template>
  <q-page class="flex">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-btn
          color="primary"
          icon-right="fa-solid fa-pen-to-square"
          label="Editar"
          class="editar"
          no-caps
          unelevated
          @click="editar()"
          v-if="user.id == perfil.idUsuario && !edit"
        />
        <q-btn
          color="primary"
          label="Guardar"
          class="guardar"
          no-caps
          unelevated
          @click="guardar()"
          v-if="user.id == perfil.idUsuario && edit"
        />
        <q-btn
          color="negative"
          label="Cancelar"
          class="cancelar"
          no-caps
          unelevated
          @click="cancelar()"
          v-if="user.id == perfil.idUsuario && edit"
        />
        <img src="~assets/user.svg" class="img" >

        <q-list v-if="!edit">
          <q-item clickable v-if="perfil.nombre">
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-n" />
            </q-item-section>

            <q-item-section>
              <q-item-label >{{perfil.nombre}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-if="perfil.apellido">
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-a" />
            </q-item-section>

            <q-item-section>
               <q-item-label >{{perfil.apellido}}</q-item-label>
            </q-item-section>
          </q-item> 
          <q-item :href="perfil.instagram" target="_blank" v-if="perfil.instagram || edit">
            <q-item-section avatar>
              <q-icon color="pink-5" name="fa-brands fa-instagram" />
            </q-item-section>

            <q-item-section>
              <q-item-label >Instagram</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable :href="perfil.facebook" target="_blank" v-if="perfil.facebook || edit">
            <q-item-section avatar>
              <q-icon color="blue" name="fa-brands fa-facebook" />
            </q-item-section>

            <q-item-section>
              <q-item-label >Facebook</q-item-label>           
            </q-item-section>
          </q-item>

          <q-item clickable :href="perfil.twitter" target="_blank" v-if="perfil.twitter || edit">
            <q-item-section avatar>
              <q-icon color="light-blue-4" name="fa-brands fa-twitter" />
            </q-item-section>

            <q-item-section>
              <q-item-label >Twitter</q-item-label> 
            </q-item-section>
          </q-item>
          <q-item clickable :href="perfil.linkedin" target="_blank" v-if="perfil.linkedin || edit">
            <q-item-section avatar>
              <q-icon color="blue-9" name="fa-brands fa-linkedin" />
            </q-item-section>

            <q-item-section>
              <q-item-label >Linkedin</q-item-label> 
            </q-item-section>
          </q-item>
          <q-item clickable :href="perfil.web" target="_blank" v-if="perfil.web || edit">
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-globe" />
            </q-item-section>

            <q-item-section>
              <q-item-label >Pagina web</q-item-label> 
            </q-item-section>
          </q-item>                   
        </q-list>
        <!-- editar -->
        <q-list v-else>
          <q-item >
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-n" />
            </q-item-section>

            <q-item-section>
               <q-input v-model="nombre"  placeholder="Inserte el nombre" type="text" :dense="true" class="w90 gris nombre"
            :rules="[ val => !!val || 'Por favor escriba algo']"/>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-a" />
            </q-item-section>

            <q-item-section>
               <q-input v-model="apellido"  placeholder="Inserte el apellido" type="text" :dense="true" class="w90 gris"/>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="pink-5" name="fa-brands fa-instagram" />
            </q-item-section>

            <q-item-section>
              <q-input  v-model="instagram" placeholder="Link de instagram" type="text" :dense="true" class="w90 gris"/>
            </q-item-section>
          </q-item>

          <q-item >
            <q-item-section avatar>
              <q-icon color="blue" name="fa-brands fa-facebook" />
            </q-item-section>

            <q-item-section>
               
              <q-input  v-model="facebook" placeholder="Link de facebook" type="text" :dense="true" class="w90 gris"/>           
            </q-item-section>
          </q-item>

          <q-item >
            <q-item-section avatar>
              <q-icon color="light-blue-4" name="fa-brands fa-twitter" />
            </q-item-section>

            <q-item-section> 
              <q-input v-model="twitter" placeholder="Link de twitter" type="text" :dense="true" class="w90 gris"/>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section avatar>
              <q-icon color="blue-9" name="fa-brands fa-linkedin" />
            </q-item-section>

            <q-item-section>
              <q-input v-model="linkedin" placeholder="Link de linkedin" type="text" :dense="true" class="w90 gris"/>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section avatar>
              <q-icon color="indigo-8" name="fa-solid fa-globe" />
            </q-item-section>

            <q-item-section> 
              <q-input v-model="web" placeholder="Link de su web" type="text" :dense="true" class="w90 gris" />
            </q-item-section>
          </q-item>
                    
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {  useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Perfil',
  setup(){
    const route = useRoute(),
          store = useStore(),
          $q = useQuasar(),
          objeto = ref({});
  let  show = ref(false),
          facebook = ref(''),
          instagram = ref(''),
          linkedin = ref(''),
          twitter = ref(''),
          web = ref(''),
          nombre = ref(''),
          apellido = ref(''),
          edit = ref(false);
  
    
    const extra=()=>{
      return true;
    }
    const fetchPerfil = async()=>{
      await store.dispatch('perfiles/loadPerfil',{id: route.params.id});
      facebook.value = perfil.value.facebook
      instagram.value = perfil.value.instagram
      linkedin.value = perfil.value.linkedin
      twitter.value = perfil.value.twitter
      web.value = perfil.value.web
    }
    const editar = () => {
      edit.value = true;
      facebook.value = perfil.value.facebook
      instagram.value = perfil.value.instagram
      linkedin.value = perfil.value.linkedin
      twitter.value = perfil.value.twitter
      web.value = perfil.value.web
      nombre.value = perfil.value.nombre
      apellido.value = perfil.value.apellido
    }
    const guardar = async () => {
      edit.value = false;
      await store.dispatch('perfiles/editPerfil',{id: route.params.id,idUsuario: perfil.value.id, nombre: nombre.value,apellido: apellido.value,facebook: facebook.value,twitter: twitter.value,instagram: instagram.value,web: web.value});
    }
    const cancelar = () => {
      edit.value = false;
    }
    
    onMounted(()=> 
      extra(),
      fetchPerfil()
    );
    const user = computed(() => store.getters['auth/getMe']);
    const perfil = computed(() => store.getters['perfiles/getPerfil']);
    const loading = computed(() => store.getters['perfiles/getLoading']);
    
    
    return{
      cancelar,
      guardar,
      editar,
      facebook,
      instagram,
      linkedin,
      twitter,
      web,
      nombre,
      apellido,
      perfil,
      loading,
      show,
      user,
      edit,
      fetchPerfil
    }
  }
})
</script>
<style scoped>
.my-card{
  width: 100%;
  max-width: 300px;
}
.img{
  padding: 50px;
}
.editar{
  position: absolute;
  top: 10px;
  left: 185px;
}
.guardar{
  position: absolute;
  top: 10px;
  left: 205px;
}
.cancelar{
  position: absolute;
  top: 10px;
  left: 10px;
}
  

</style>
