export default [
  {
    path: 'tabs',
    name: 'styleguide-tabs',
    component: () => import('@/views/styleguide/Pages/Tabs/Page')
  },
  {
    path: 'buttons',
    name: 'styleguide-buttons',
    component: () => import('@/views/styleguide/Pages/Buttons/Page')
  },
  {
    path: 'typography',
    name: 'styleguide-typography',
    component: () => import('@/views/styleguide/Pages/Typography/Page')
  },
  {
    path: 'betslip',
    name: 'styleguide-betslip',
    component: () => import('@/views/styleguide/Pages/Betslip/Page')
  }
]
