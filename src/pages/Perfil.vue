<template>
  <q-page class="flex column">
    <div class="q-pa-md row flex justify-center q-gutter-md">
      <q-card class="my-card cardd">
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
        <label v-show="user.id == perfil.idUsuario && edit" for="seleccionArchivos" class="labelArchivo q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable w90 btn">
          Cambiar
        </label>
        <input v-show="user.id == perfil.idUsuario && edit" type="file" id="seleccionArchivos" accept="image/*" class="input">
        <img :src="imagen != '' ? imagen : 'https://res.cloudinary.com/raizel/image/upload/v1655250986/wmozjlogmld4lpb7un4c.jpg'" class="img" >

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
      <div class="flex column items-center">
        <div class="flex row items-center">
          <h1 class="text-h5 h5 q-mr-md">Calificaciones</h1>
          <q-btn
            color="primary"
            icon-right="fa-regular fa-star-half-stroke"
            label="Calificame"
            class=""
            no-caps
            unelevated
            @click="calificar()"
            v-if="user.id != perfil.idUsuario"
          />
        </div>      
        <div class="flex">
          <q-carousel
            v-model="slideC"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            infinite
            control-color="primary"
            arrows
            :autoplay="3000"
            height="auto"
            class="bg-grey-1 shadow-2 rounded-borders"
          >
            <q-carousel-slide v-for="({id, mensaje, calificacion}, index) in calificaciones" :key="id" :name="index"  class="column no-wrap">
            <comentario  
              :objeto="{id, mensaje, calificacion}"
              class="q-ma-md rutina"
              >
              </comentario>
            </q-carousel-slide>          
          </q-carousel>
        </div>
      </div>
      <comentario  v-if="showM"
        :objeto="mensaje"
        :accion="accion"
        :ver="false"
        :idUsuario="user.id"
        :idPerfil="idPerfil()"
        class="q-ma-md"
        @cancelar="cancelarM()"
      >
      </comentario>
      
    </div>
    <div class="q-pa-md flex justify-center  espacio">
      <div class="flex column items-center">
        <div class="flex row items-center">
          <h1 class="text-h4 h4">Mis Rutinas</h1>
        </div>      
        <div class="flex">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            infinite
            control-color="primary"
            arrows
            :autoplay="2500"
            height="auto"
            class="bg-grey-1 shadow-2 rounded-borders"
          >
            <q-carousel-slide v-for="({id, nombre, calificacion, tiempo, img}, index) in rutinas" :key="id" :name="index"  class="column no-wrap">
            <rutina  
              :nombre="nombre"
              :calificacion="calificacion"
              :tiempo="tiempo"
              :imagen="img"
              class="q-ma-md rutina"
              @click="verRutina(id)"
              >
              </rutina>
            </q-carousel-slide>          
          </q-carousel>
        </div>
      </div>
      <div class="flex column items-center">
        <div class="flex row items-center">
          <h1 class="text-h4 h4">Mis Favoritas</h1>
        </div>      
        <div class="flex">
          <q-carousel
            v-model="slideF"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            infinite
            control-color="primary"
            arrows
            :autoplay="2500"
            height="auto"
            class="bg-grey-1 shadow-2 rounded-borders"
          >
            <q-carousel-slide v-for="({id, nombre, calificacion, tiempo, img}, index) in rutinasF" :key="id" :name="index"  class="column no-wrap">
            <rutina  
              :nombre="nombre"
              :calificacion="calificacion"
              :tiempo="tiempo"
              :imagen="img"
              class="q-ma-md rutina"
              @click="verRutina(id)"
              >
              </rutina>
            </q-carousel-slide>          
          </q-carousel>
        </div>
      </div>
      
    </div>
  </q-page>
</template>

<script>
import {  useQuasar } from 'quasar'
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import Rutina from '../components/Rutina.vue';
import Comentario from '../components/Comentario.vue';
export default defineComponent({
  name: 'Perfil',
  components: { Rutina, Comentario },
  setup(){
    const route = useRoute(),
          router = useRouter(),
          store = useStore(),
          $q = useQuasar(),
          showM = ref(false),
          objeto = ref({}),
          accion = ref(''),
          mensaje = ref({});
  let  show = ref(false),
          facebook = ref(''),
          instagram = ref(''),
          linkedin = ref(''),
          twitter = ref(''),
          web = ref(''),
          nombre = ref(''),
          apellido = ref(''),
          slide = ref(0),
          slideF = ref(0),
          slideC = ref(0),
          edit = ref(false),
          imagen= ref(''),
          primerArchivo;
    const cancelarM = ()=>{
      showM.value = false;
    }
    const fetchRutinas = async()=>{
      await store.dispatch('rutinas/resetRutinas');
      await store.dispatch('rutinas/loadRutinas', {idP: route.params.id});
    }
    const fetchRutinasFavoritas = async()=>{
      await store.dispatch('rutinas/loadRutinasFavoritas', {idP: route.params.id});
    }
    const fetchCalificaciones = async()=>{
      await store.dispatch('comentarios/loadCalificaciones', {perfil: route.params.id});
      cambiarImagen();
    }
    const verRutina = (valor) =>{
      router.push('/rutina/'+valor);
    }
    const idRutinas = () =>{
      return user.value.id == route.params.id;
    }
    
    const extra=()=>{
      return true;
    }
    const fetchPerfil = async()=>{
      await store.dispatch('comentarios/resetCalificaciones');
      await store.dispatch('perfiles/loadPerfilPropio',{id: route.params.id});
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
    const idPerfil = ()=>{
      return route.params.id
    }
    const calificar = () => {
      showM.value = false;
      mensaje.value = {};
      mensaje.value = calificaciones.value.find(c => c.idUsuario == user.value.id)
      if (mensaje.value != {} && mensaje.value != undefined) {
        accion.value =  'E'
      }else{
        accion.value =  'C'
      }
      showM.value = true;
    }
    const guardar = async () => {
      edit.value = false;
      await store.dispatch('perfiles/editPerfil',{id: route.params.id,idUsuario: user.value.id, nombre: nombre.value,apellido: apellido.value,facebook: facebook.value,twitter: twitter.value,instagram: instagram.value,web: web.value});
      if (imagen.value != '') {
        await store.dispatch('uploads/editUploads',{coleccion: 'usuarios',id: user.value.id, archivo: primerArchivo });
        await store.dispatch('auth/setImg', uploads.value );
      }
    }
    const cancelar = () => {
      edit.value = false;
    }
    
    
    onMounted(()=> 
      extra(),
      fetchPerfil(),
      fetchRutinas(),
      fetchRutinasFavoritas(),
      fetchCalificaciones()
    );
    
    const cambiarImagen = () => {
        imagen.value = user.value.img;
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
    };
    const user = computed(() => store.getters['auth/getMe']);
    const uploads = computed(() => store.getters['uploads/getUrl']);
    const perfil = computed(() => store.getters['perfiles/getPerfilPropio']);
    const loading = computed(() => store.getters['perfiles/getLoading']);
    const rutinas = computed(() => store.getters['rutinas/getRutinas']);
    const rutinasF = computed(() => store.getters['rutinas/getRutinasFavoritas']);
    const calificaciones = computed(() => store.getters['comentarios/getCalificaciones']);
    
    return{
      cancelar,
      cancelarM,
      guardar,
      editar,
      showM,
      calificar,
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
      rutinas,
      fetchPerfil,
      verRutina,
      fetchRutinas,
      idRutinas,
      slide,
      slideF,
      rutinasF,
      slideC,
      accion,
      calificaciones,
      idPerfil,
      mensaje,
      imagen
    }
  }
})
</script>
<style scoped>
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
  top: 10px;
  left: 35%;
}
.cardd{
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
.rutina{
  margin-left: 0;
}
.espacio{
  column-gap: 5%;
}
.img{
  padding: 2px;
}

</style>
