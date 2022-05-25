<template>
  <q-layout view="hHh Lpr lff" class="relative">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="fa-solid fa-bars"
          aria-label="Menu"
          @click="abrirMenu"
        />

        <q-toolbar-title>
          Raizel
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="menuAbierto"
      :width="200"
      :breakpoint="700"
      bordered
      overlay
      class="absolute"
    >
      <q-list >
        <q-item clickable @click="linkPerfil()" v-if="user.rol && autenticado" >
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-user" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mi Perfil</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>
        <!-- Ejercicios -->
        <q-item clickable to="/ejercicios" v-if="autenticado">
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-dumbbell" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ejercicios</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>
        <!-- Mis Rutinas -->
        <q-item clickable @click="linkRutinas()" v-if="autenticado">
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-clock-rotate-left" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mis rutinas</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>
        <div v-if="autenticado">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        </div>
        <div class="cursor-pointer non-selectable" v-if="user && user.rol =='ADMIN_ROLE' && autenticado">
          <q-item
            clickable            
          >
            <q-item-section class="icono"
              avatar
            > 
              <q-icon name="fa-solid fa-gears" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Administrar</q-item-label>
            </q-item-section>
          </q-item>
          <q-menu anchor="top end" self="top start">
            <!-- nivel 1 -->
            <q-list class="no-border-radius" style="min-width: 80px; max-width: 180px">
              <!-- Datos -->
              <q-item clickable dense to="/datoscem">
                <q-item-section>
                  <q-item-label>Datos</q-item-label>
                </q-item-section>
                <q-item-section side>
                </q-item-section>                  
              </q-item>
              <q-separator />
              <!-- Usuarios -->
              <q-item clickable dense to="/usuarios">
                <q-item-section>
                  <q-item-label>Usuarios</q-item-label>
                </q-item-section>
                <q-item-section side>
                </q-item-section>                  
              </q-item>                 
            </q-list>
          </q-menu>
        </div>
        <div class="fixed-bottom">
          <!-- Configuracion -->
        <q-item clickable to="/configuracion" v-if="autenticado">
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-gear" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configuración</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>             
        <!-- Login -->   
        <q-item clickable to="/login" v-if="!autenticado">
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-arrow-right-from-bracket" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Iniciar Sesión</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>     
        <!-- Cerrar -->           
        <q-item clickable @click="singOut()" v-else>
          <q-item-section class="icono"
            avatar
          > 
            <q-icon name="fa-solid fa-arrow-right-from-bracket" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar Sesión</q-item-label>
          </q-item-section>
          <q-item-section side>
          </q-item-section>                  
        </q-item>                
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="pageContainer">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, onMounted, ref, computed, onUpdated } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const menuAbierto = ref(false),
          route = useRouter(),
          rout = useRoute(),
          $q = useQuasar(),
          store = useStore(),
          ruta = ref('login'),
          titulo = ref('Iniciar Sesion');
    const linksList = [
      {
        title: 'Buscar Rutinas',
        icon: 'fa-solid fa-magnifying-glass',
        link: 'https://github.com/quasarframework'
      },
      {
        title: 'Estadísticas',
        icon: 'fa-solid fa-chart-column',
        link: 'https://chat.quasar.dev'
      }
    ]
    
    const singOut= async()=>{
      await store.dispatch('auth/singOut');
      route.push('/login');
    }
    const comprobar = async()=>{
      await store.dispatch('auth/comprobar');
      if (!autenticado.value) {
        $q.notify({
          timeout: 400,
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Debes iniciar sesion'
        })
        route.push('/login');
      }
    }
    const linkPerfil = ()=>{
      route.push({name: 'perfil', params: { id: user.value.id}});
    }
    const linkRutinas = ()=>{
      route.push({name: 'rutinas', params: { id: user.value.id}});
    }
    const autenticado = computed(() => store.getters['auth/getAutenticado']);
    const user = computed(() => store.getters['auth/getMe']);
          

    return {
      autenticado,
      linksList,
      user,
      ruta,
      titulo,
      menuAbierto,
      singOut,
      linkPerfil,
      linkRutinas,
      abrirMenu () {
        menuAbierto.value = !menuAbierto.value
      }
    }
  }
})
</script>
<style scoped>
  .pageContainer{
    background-color: #F0F4F8;
    width: 80%;
    margin: 0 auto;
  }
  .absolute{
    position: absolute;
  }
  .icono{
    color: #2CB1BC;
  }
</style>
