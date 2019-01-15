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
    path: 'grouped-events',
    name: 'styleguide-grouped-events',
    component: () => import('@/views/styleguide/Pages/GroupedEvents/Page')
  }
]
