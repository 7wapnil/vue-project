import ContactUs from '@/views/information-pages/support/contact-us/Page'
import TermsAndConditions from '@/views/information-pages/support/terms-and-conditions/Page'
import BettingRules from '@/views/information-pages/support/betting-rules/Page'
import PaymentMethods from '@/views/information-pages/support/payment-methods/Page'
import CookiePolicy from '@/views/information-pages/support/cookie-policy/Page'
import PrivacyPolicy from '@/views/information-pages/support/privacy-policy/Page'
import Faq from '@/views/information-pages/support/faq/Page'
import WelcomePage from '@/views/information-pages/about/welcome/Page'
import MainPage from '@/views/information-pages/about/main/Page'
import Blog from '@/views/information-pages/about/blog/Page'

import Promotions from '@/views/information-pages/promotions/main/Page'

import Introduction from '@/views/information-pages/responsible-gaming/introduction/Page'
import SelfAssessment from '@/views/information-pages/responsible-gaming/self-assessment/Page'
import Limits from '@/views/information-pages/responsible-gaming/limits/Page'

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
          component: ContactUs
        },
        {
          path: 'terms-and-conditions',
          name: 'terms and conditions',
          component: TermsAndConditions
        },
        {
          path: 'betting-rules',
          name: 'sports betting rules',
          component: BettingRules
        },
        {
          path: 'payment-methods',
          name: 'payment methods',
          component: PaymentMethods
        },
        {
          path: 'privacy-policy',
          name: 'privacy policy',
          component: PrivacyPolicy
        },
        {
          path: 'cookie-policy',
          name: 'cookie policy',
          component: CookiePolicy
        },
        {
          path: 'faq',
          name: 'FAQ',
          component: Faq
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
          component: WelcomePage
        },
        {
          path: 'about-arcanebet',
          name: 'about arcanebet',
          component: MainPage
        },
        {
          path: 'blog',
          name: 'blog',
          component: Blog
        }
      ]
    },
    {
      path: 'promotions',
      name: 'promotions',
      component: () => import('@/views/layouts/information-page/Content'),
      children: [
        {
          path: '',
          name: 'promotions',
          component: Promotions
        },
        {
          path: 'bonus-rules',
          name: 'Bonus Rules',
          component: Promotions
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
          component: Introduction
        },
        {
          path: 'self-assessment',
          name: 'self assessment test',
          component: SelfAssessment
        },
        {
          path: 'limits',
          name: 'setting limits',
          component: Limits
        },
      ]
    }
  ]
}

export default InformationPages
