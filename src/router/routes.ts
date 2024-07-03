export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/pages/upload/upload.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue')
  }
]
