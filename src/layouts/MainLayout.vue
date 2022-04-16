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
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
          <div class="cursor-pointer non-selectable">
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
                <!-- Datos -->
                <q-item clickable dense to="/datoscem">
                  <q-item-section>
                    <q-item-label>Datos</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>                  
                </q-item>                
                <q-separator />
                <!-- Datos -->
                <q-item clickable dense to="/datoscem">
                  <q-item-section>
                    <q-item-label>Datos</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>                  
                </q-item>  
              </q-list>
            </q-menu>
          </div>
        <div class="fixed-bottom">
        <EssentialLink
          v-for="link in links"
          :key="link.title"
          v-bind="link" 
        />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="pageContainer">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const menuAbierto = ref(false),
          ruta = ref('login'),
          titulo = ref('Iniciar Sesion');
    const linksList = [
      {
        title: 'Mi Perfil',
        icon: 'fa-solid fa-user',
        link: 'login'
      },
      {
        title: 'Buscar Rutinas',
        icon: 'fa-solid fa-magnifying-glass',
        link: 'https://github.com/quasarframework'
      },
      {
        title: 'Estadisticas',
        icon: 'fa-solid fa-chart-column',
        link: 'https://chat.quasar.dev'
      }
    ]
    const links = [
      {
        title: 'Configuracion',
        icon: 'fa-solid fa-gear',
        link: 'https://quasar.dev'
      },
      {
        title: titulo.value,
        icon: 'fa-solid fa-arrow-right-from-bracket',
        link: ruta.value
      }
    ]
    
    ruta.value= 'login'
    titulo.value='Iniciar Sesion'
    

    onMounted(()=>{
      if (true) {
        ruta.value= 'login'
        titulo.value='Iniciar Sesion'
      }else{
        ruta.value='logout',
        titulo.value='Salir'
      }
    })
          

    return {
      linksList,
      links,
      ruta,
      titulo,
      menuAbierto,
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
