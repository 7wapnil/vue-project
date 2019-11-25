export const support = {
  routes: [
    {
      path: 'support',
      name: 'support',
      title: 'support',
      icon: 'support',
      meta: { sidemenu: 'info' },
      component: () => import('@/views/layouts/common/Content'),
      children: [
        {
          path: 'contact-us',
          name: 'Contact Us',
          title: 'Contact Us',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/contact-us/Page')
        },
        {
          path: 'terms-and-conditions',
          name: 'Terms And Conditions',
          title: 'Terms And Conditions',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/terms-and-conditions/Page')
        },
        {
          path: 'betting-rules',
          name: 'Sports Betting Rules',
          title: 'Sports Betting Rules',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/betting-rules/Page')
        },
        {
          path: 'privacy-policy',
          name: 'Privacy Policy',
          title: 'Privacy Policy',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/privacy-policy/Page')
        },
        {
          path: 'cookie-policy',
          name: 'Cookie Policy',
          title: 'Cookie Policy',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/cookie-policy/Page')
        },
        {
          path: 'faq',
          name: 'FAQ',
          title: 'FAQ',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/support/faq/Page')
        }
      ]
    },
    {
      path: 'about',
      name: 'about',
      title: 'about',
      icon: 'arcanebet-default-icon',
      meta: { sidemenu: 'info' },
      component: () => import('@/views/layouts/common/Content'),
      children: [
        {
          path: 'about-arcanebet',
          name: 'About arcanebet',
          title: 'About arcanebet',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/about/main/Page')
        },
        {
          path: 'affiliates-arcanebet',
          name: 'Affiliates',
          title: 'Affiliates',
          meta: { sidemenu: 'info' },
          beforeEnter () { location.href = process.env.VUE_APP_AFFILIATE_URL }
        }
      ]
    },
    {
      path: 'promotions',
      title: 'promotions',
      meta: { sidemenu: 'info' },
      component: () => import('@/views/layouts/common/Content'),
      children: [
        {
          path: '',
          name: 'Promotions',
          title: 'Promotions',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/promotions/main/Page')
        },
        {
          path: 'bonus-rules',
          name: 'Bonus Rules',
          title: 'Bonus Rules',
          meta: { sidemenu: 'info' },
          component: () => import('@/views/information-pages/promotions/bonus-rules/Page')
        }
      ]
    },
    {
      path: 'responsible-gaming',
      name: 'Responsible Gaming',
      title: 'Responsible Gaming',
      meta: { sidemenu: 'info' },
      icon: 'help',
      component: () => import('@/views/layouts/common/Content'),
      children: [
        {
          path: 'introduction',
          name: 'Introduction',
          meta: { sidemenu: 'info' },
          title: 'Introduction',
          component: () => import('@/views/information-pages/responsible-gaming/introduction/Page')
        },
        {
          path: 'limits',
          name: 'Setting Limits',
          meta: { sidemenu: 'info' },
          title: 'Setting Limits',
          component: () => import('@/views/information-pages/responsible-gaming/limits/Page')
        }
      ]
    }
  ]
}

export default support
