import InfoPageSidemenu from '@/views/layouts/information-page/InfoPageSidemenu'
import Betslip from '@/components/betslip/Betslip'
import ContactUsPage from '@/views/information-pages/support/contact-us/Page'
import TermsConditionPage from '@/views/information-pages/support/terms-and-conditions/Page'
import BettingRulesPage from '@/views/information-pages/support/betting-rules/Page'
import PrivacyPolicyPage from '@/views/information-pages/support/privacy-policy/Page'
import CookiePolicyPage from '@/views/information-pages/support/cookie-policy/Page'
import FAQPage from '@/views/information-pages/support/faq/Page'
import AboutPage from '@/views/information-pages/about/main/Page'
import PromotionsPage from '@/views/information-pages/promotions/main/Page'
import BonusRulesPage from '@/views/information-pages/promotions/bonus-rules/Page'
import IntroductionPage from '@/views/information-pages/responsible-gaming/introduction/Page'
import LimitsPage from '@/views/information-pages/responsible-gaming/limits/Page'

export const support = {
  routes: [
    {
      path: '/support',
      name: 'support',
      components: {
        left: InfoPageSidemenu,
        content: ContactUsPage,
        right: Betslip
      }
    },
    {
      path: '/support/contact-us',
      name: 'contact us',
      components: {
        left: InfoPageSidemenu,
        content: ContactUsPage,
        right: Betslip
      }
    },
    {
      path: '/support/terms-and-conditions',
      name: 'terms and conditions',
      components: {
        left: InfoPageSidemenu,
        content: TermsConditionPage,
        right: Betslip
      }
    },
    {
      path: '/support/betting-rules',
      name: 'sports betting rules',
      components: {
        left: InfoPageSidemenu,
        content: BettingRulesPage,
        right: Betslip
      }
    },
    {
      path: '/support/privacy-policy',
      name: 'privacy policy',
      components: {
        left: InfoPageSidemenu,
        content: PrivacyPolicyPage,
        right: Betslip
      }
    },
    {
      path: '/support/cookie-policy',
      name: 'cookie policy',
      components: {
        left: InfoPageSidemenu,
        content: CookiePolicyPage,
        right: Betslip
      }
    },
    {
      path: '/support/faq',
      name: 'faq',
      components: {
        left: InfoPageSidemenu,
        content: FAQPage,
        right: Betslip
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        left: InfoPageSidemenu,
        content: AboutPage,
        right: Betslip
      },
    },
    {
      path: '/about/about-arcanebet',
      name: 'about arcanebet',
      components: {
        left: InfoPageSidemenu,
        content: AboutPage,
        right: Betslip
      }
    },
    {
      path: '/about/affiliates-arcanebet',
      name: 'affiliates',
      beforeEnter () { location.href = process.env.VUE_APP_AFFILIATE_URL }
    },
    {
      path: '/promotions',
      name: 'promotions',
      components: {
        left: InfoPageSidemenu,
        content: PromotionsPage,
        right: Betslip
      },
    },
    {
      path: '/promotions/bonus-rules',
      name: 'bonus rules',
      components: {
        left: InfoPageSidemenu,
        content: BonusRulesPage,
        right: Betslip
      }
    },
    {
      path: '/responsible-gaming',
      name: 'responsible gaming',
      components: {
        left: InfoPageSidemenu,
        content: IntroductionPage,
        right: Betslip
      },
    },
    {
      path: '/responsible-gaming/introduction',
      name: 'introduction',
      components: {
        left: InfoPageSidemenu,
        content: IntroductionPage,
        right: Betslip
      }
    },
    {
      path: '/responsible-gaming/limits',
      name: 'setting limits',
      components: {
        left: InfoPageSidemenu,
        content: LimitsPage,
        right: Betslip
      }
    }
  ]
}

export default support
