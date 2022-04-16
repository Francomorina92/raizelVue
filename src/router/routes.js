
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'login', name:'login', component: () => import('pages/Login.vue') },
      { path: 'registro', name:'registro', component: () => import('pages/Registro.vue') },
      { path: 'datoscem', name:'datoscem', component: () => import('src/pages/DatosCEM.vue') },
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
