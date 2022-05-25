<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  setup(){
    const store = useStore();
    const init = async()=>{
      await store.dispatch('auth/init');
    }
    onMounted(()=>{
      init();
    })
  }
})
</script>
<style lang="sass">
.encabezadoFijo
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th 
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  
  thead tr:last-child th
    
    top: 48px
  thead tr:first-child th
    top: 0
</style>
