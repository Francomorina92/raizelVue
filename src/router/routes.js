
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'login', name:'login', component: () => import('pages/Login.vue') },
      { path: 'registro', name:'registro', component: () => import('pages/Registro.vue') },
      { path: 'datoscem', name:'datoscem', component: () => import('src/pages/DatosCEM.vue') },
      { path: 'usuarios', name:'usuarios', component: () => import('src/pages/Usuarios.vue') },
      { path: 'ejercicios', name:'ejercicios', component: () => import('src/pages/Ejercicios.vue') },
      { path: 'perfil/:id', name:'perfil', component: () => import('src/pages/Perfil.vue') },
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
