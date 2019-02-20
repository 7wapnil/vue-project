import LiveSupportPage from '@/views/information-pages/support/live-support/Page'
import WelcomePage from '@/views/information-pages/about/welcome/Page'
import GettingStartedPage from '@/views/information-pages/support/getting-started/Page'

export const InformationPages = {
  routes: [
    {
      path: 'support',
      name: 'support',
      redirect: 'styleguide/typography',
      icon: 'promotional',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: '/support/live-support',
          name: 'live support',
          alias: '/',
          component: LiveSupportPage
        },
        {
          path: '/support/getting-started',
          name: 'getting started',
          component: GettingStartedPage
        }
      ]
    },
    {
      path: 'about',
      name: 'about',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: '/about/welcome-to-arcanebet',
          name: 'welcome to arcanebet',
          component: WelcomePage
        }
      ]
    },
    {
      path: 'blog',
      name: 'blog',
      component: () => import('@/views/layouts/information-page/Content')
    },
    {
      path: 'promotions',
      name: 'promotions',
      component: () => import('@/views/layouts/information-page/Content')
    },
    {
      path: 'responsible-gaming',
      name: 'responsible Gaming',
      component: () => import('@/views/layouts/information-page/Content')
    }
  ]
}

export default InformationPages
