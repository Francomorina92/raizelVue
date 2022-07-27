<template>
  <q-page class="flex column">
    <div class=" row flex justify-center q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <h6 class="margen">¿Qué es Raizel?</h6>
          <p class="margen">Raizel es una página web donde puedes crear tus rutinas de ejercicios. Además puedes buscar rutinas de otras personas y agregarlas a favoritos para tenerlas a mano cada vez que quieras usarlas. Contamos con un sistema de estadísticas para que veas tu progreso.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen">¿Cómo funciona Raizel?</h6>
          <p class="margen">Cada usuario tiene la posibilidad de crear diversas rutinas y compartirlas con otros, pudiendo elegir en cada uno el musculo y maquina a utilizar.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen">¿Puedo tener más de una rutina?</h6>
          <p class="margen">¡Sí!, puedes crear y agregar a favoritos cuantas rutinas quieras.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen">¿Qué costo tiene utilizar Raizel?</h6>
          <p class="margen">No tiene ningún costo, es totalmente gratuito.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen">¿La página web tiene alguna app para Android o IOs?</h6>
          <p class="margen">Por ahora no contamos con aplicación para móviles, solo con la versión para navegador Web.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen"> ¿Las rutinas estas hechas por profesionales?</h6>
          <p class="margen">No, las rutinas son hechas por los usuarios que se registran en nuestra web.</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen"> ¿Puedo calificar algun perfil si me gustó?</h6>
          <p class="margen">Sí, no solo puedes calificar algun perfil, sino también, otros usuarios pueden calificar el tuyo</p>
        </q-card-section>
        <q-card-section>
          <h6 class="margen"> ¿Tienes alguna duda que no sale en preguntas frecuentes? Contáctanos: <a href="mailto:RAIZELAPP@GMAIL.COM" class="mail">RAIZELAPP@GMAIL.COM</a> </h6>
        </q-card-section>
      </q-card>
    </div>
        
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'Preguntas',
  setup(){
    return{
    }
  }
})
</script>
<style scoped>
.my-card{
  width: 100% !important;
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
.margen{
  margin: 10px;
}
.mail{
  text-decoration: none;
}
</style>
