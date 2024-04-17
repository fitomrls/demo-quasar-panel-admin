
const routes = [
  {
    path: '/login',
    meta: {guest: true},
    component: () => import('layouts/LoginLayout.vue'),
    children:[
      {
        path: '',
        component: () => import('pages/LoginPage.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {auth: true},
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/campaings', component: () => import('pages/CampaingsPage.vue') },
      { path: '/clients', component: () => import('pages/ClientsPage.vue') },
      { path: '/ganadores', component: () => import('pages/GanadoresPage.vue') },
      { path: '/tombola', component: () => import('pages/TombolaPage.vue') },
      { path: '/config', component: () => import('pages/ConfigPage.vue') },
      { path: '/users', component: () => import('pages/UserPage.vue') },
      { path: '/form', component: () => import('pages/FormPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default routes
