export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/pages/upload/upload.vue')
  },
  {
    path: '/style',
    name: 'style',
    component: () => import('@/pages/style/style.vue')
  },
  {
    path: '/inquiry',
    name: 'inquiry',
    component: () => import('@/pages/inquiry/inquiry.vue')
  },
  {
    path: '/itemlist',
    name: 'itemlist',
    component: () => import('@/pages/itemlist/itemlist.vue')
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/pages/banner/banner.vue')
  }
]
