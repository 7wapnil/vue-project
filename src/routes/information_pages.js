export default [
  {
    path: 'support',
    name: 'support',
    component: () => import('@/views/information-pages/support/Page')
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/views/information-pages/about/Page')
  },
  {
    path: 'blog',
    name: 'blog',
    component: () => import('@/views/information-pages/blog/Page')
  },
  {
    path: 'promotions',
    name: 'promotions',
    component: () => import('@/views/information-pages/promotions/Page')
  },
  {
    path: 'responsible-gaming',
    name: 'responsible-gaming',
    component: () => import('@/views/information-pages/responsible-gaming/Page')
  }
]
