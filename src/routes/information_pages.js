export const InformationPages = {
  routes: [
    {
      path: 'support',
      name: 'support',
      title: 'support',
      redirect: 'styleguide/typography',
      icon: 'support',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: 'contact-us',
          name: 'Contact Us',
          title: 'Contact Us',
          component: () => import('@/views/information-pages/support/contact-us/Page')
        },
        {
          path: 'terms-and-conditions',
          name: 'Terms And Conditions',
          title: 'Terms And Conditions',
          component: () => import('@/views/information-pages/support/terms-and-conditions/Page')
        },
        {
          path: 'betting-rules',
          name: 'Sports Betting Rules',
          title: 'Sports Betting Rules',
          component: () => import('@/views/information-pages/support/betting-rules/Page')
        },
        {
          path: 'privacy-policy',
          name: 'Privacy Policy',
          title: 'Privacy Policy',
          component: () => import('@/views/information-pages/support/privacy-policy/Page')
        },
        {
          path: 'cookie-policy',
          name: 'Cookie Policy',
          title: 'Cookie Policy',
          component: () => import('@/views/information-pages/support/cookie-policy/Page')
        },
        {
          path: 'faq',
          name: 'FAQ',
          title: 'FAQ',
          component: () => import('@/views/information-pages/support/faq/Page')
        }
      ]
    },
    {
      path: 'about',
      name: 'about',
      title: 'about',
      icon: 'arcanebet-default-icon',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: 'welcome-to-arcanebet',
          name: 'Welcome to arcanebet',
          title: 'Welcome to arcanebet',
          component: () => import('@/views/information-pages/about/welcome/Page')
        },
        {
          path: 'about-arcanebet',
          name: 'About arcanebet',
          title: 'About arcanebet',
          component: () => import('@/views/information-pages/about/main/Page')
        }
      ]
    },
    {
      path: 'promotions',
      title: 'promotions',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: '',
          name: 'Promotions',
          title: 'Promotions',
          component: () => import('@/views/information-pages/promotions/main/Page')
        },
        {
          path: 'bonus-rules',
          name: 'Bonus Rules',
          title: 'Bonus Rules',
          component: () => import('@/views/information-pages/promotions/bonus-rules/Page')
        }
      ]
    },
    {
      path: 'responsible-gaming',
      name: 'Responsible Gaming',
      title: 'Responsible Gaming',
      icon: 'help',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: 'introduction',
          name: 'Introduction',
          title: 'Introduction',
          component: () => import('@/views/information-pages/responsible-gaming/introduction/Page')
        },
        {
          path: 'limits',
          name: 'Setting Limits',
          title: 'Setting Limits',
          component: () => import('@/views/information-pages/responsible-gaming/limits/Page')
        }
      ]
    }
  ]
}

export default InformationPages
