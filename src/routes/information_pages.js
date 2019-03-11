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
          path: 'contact-us',
          name: 'contact us',
          component: () => import('@/views/information-pages/support/contact-us/Page')
        },
        {
          path: 'terms-and-conditions',
          name: 'terms and conditions',
          component: () => import('@/views/information-pages/support/terms-and-conditions/Page')
        },
        {
          path: 'betting-rules',
          name: 'sports betting rules',
          component: () => import('@/views/information-pages/support/betting-rules/Page')
        },
        {
          path: 'payment-methods',
          name: 'payment methods',
          component: () => import('@/views/information-pages/support/payment-methods/Page')
        },
        {
          path: 'privacy-policy',
          name: 'privacy policy',
          component: () => import('@/views/information-pages/support/privacy-policy/Page')
        },
        {
          path: 'cookie-policy',
          name: 'cookie policy',
          component: () => import('@/views/information-pages/support/cookie-policy/Page')
        },
        {
          path: 'faq',
          name: 'FAQ',
          component: () => import('@/views/information-pages/support/faq/Page')
        }
      ]
    },
    {
      path: 'about',
      name: 'about',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: 'welcome-to-arcanebet',
          name: 'welcome to arcanebet',
          component: () => import('@/views/information-pages/about/welcome/Page')
        },
        {
          path: 'about-arcanebet',
          name: 'about arcanebet',
          component: () => import('@/views/information-pages/about/main/Page')
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/information-pages/about/blog/Page')
        }
      ]
    },
    {
      path: 'promotions',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: '',
          name: 'promotions',
          component: () => import('@/views/information-pages/promotions/main/Page')
        },
        {
          path: 'bonus-rules',
          name: 'Bonus Rules',
          component: () => import('@/views/information-pages/promotions/main/Page')
        },
      ]
    },
    {
      path: 'responsible-gaming',
      name: 'responsible Gaming',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: 'introduction',
          name: 'introduction',
          component: () => import('@/views/information-pages/responsible-gaming/introduction/Page')
        },
        {
          path: 'self-assessment',
          name: 'self assessment test',
          component: () => import('@/views/information-pages/responsible-gaming/self-assessment/Page')
        },
        {
          path: 'limits',
          name: 'setting limits',
          component: () => import('@/views/information-pages/responsible-gaming/limits/Page')
        },
      ]
    }
  ]
}

export default InformationPages
