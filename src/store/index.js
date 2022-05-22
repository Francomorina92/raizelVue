import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import categorias from './categorias'
import equipamientos from './equipamientos'
import musculos from './musculos'
import usuarios from './usuarios'
import perfiles from './perfiles'
import ejercicios from './ejercicios'
import rutinas from './rutinas'
import auth from './auth'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      categorias: categorias,
      equipamientos: equipamientos,
      musculos: musculos,
      usuarios: usuarios,
      perfiles: perfiles,
      ejercicios: ejercicios,
      rutinas: rutinas,
      auth: auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
