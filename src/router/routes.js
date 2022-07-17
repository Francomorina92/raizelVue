
const routes = [
  {
    path: '/', redirect: { name: 'index' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'index',name: 'index', component: () => import('pages/IndexPage.vue') , meta:{ requireLogin: true} },
      { path: 'login', name:'login', component: () => import('pages/Login.vue') , meta:{ requireLogin: false} },
      { path: 'preguntas', name:'preguntas', component: () => import('pages/Preguntas.vue') , meta:{ requireLogin: false} },
      { path: 'registro', name:'registro', component: () => import('pages/Registro.vue') , meta:{ requireLogin: false} },
      { path: 'datoscem', name:'datoscem', component: () => import('src/pages/DatosCEM.vue'), meta:{ requireLogin: true} },
      { path: 'usuarios', name:'usuarios', component: () => import('src/pages/Usuarios.vue') , meta:{ requireLogin: true} },
      { path: 'ejercicios', name:'ejercicios', component: () => import('src/pages/Ejercicios.vue') , meta:{ requireLogin: true} },
      { path: 'rutinas/:id', name:'rutinas', component: () => import('src/pages/Rutinas.vue') , meta:{ requireLogin: true} },
      { path: 'rutina/:id', name:'rutina', component: () => import('src/pages/Rutina.vue') , meta:{ requireLogin: true} },
      { path: 'recorrerrutina/:id', name:'recorrerrutina', component: () => import('src/pages/RecorrerRutina.vue') , meta:{ requireLogin: true} },
      { path: 'perfil/:id', name:'perfil', component: () => import('src/pages/Perfil.vue') , meta:{ requireLogin: true} },
      { path: 'estadisticas', name:'estadisticas', component: () => import('src/pages/Estadisticas.vue') , meta:{ requireLogin: true} },
      { path: 'confirmacion/:token', name:'confirmacion', component: () => import('src/pages/Confirmacion.vue') , meta:{ requireLogin: false} },
      { path: 'recuperacion/:token', name:'recuperacion', component: () => import('src/pages/Recuperacion.vue') , meta:{ requireLogin: false} },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
