import InfoPageSidemenu from '@/views/layouts/information-page/InfoPageSidemenu'
import Betslip from '@/components/betslip/Betslip'
import ContactUsPage from '@/views/information-pages/support/contact-us/Page'
import TermsConditionPage from '@/views/information-pages/support/terms-and-conditions/Page'
import BettingRulesPage from '@/views/information-pages/support/betting-rules/Page'
import PrivacyPolicyPage from '@/views/information-pages/support/privacy-policy/Page'
import CookiePolicyPage from '@/views/information-pages/support/cookie-policy/Page'
import FAQPage from '@/views/information-pages/support/faq/Page'
import AboutPage from '@/views/information-pages/about/main/Page'
import WelcomeOfferSportPage from '@/views/information-pages/promotions/welcome-offer-sport/Page'
import WelcomeOfferCasinoPage from '@/views/information-pages/promotions/welcome-offer-casino/Page'
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
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/contact-us',
      name: 'contact us',
      components: {
        left: InfoPageSidemenu,
        content: ContactUsPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/terms-and-conditions',
      name: 'terms and conditions',
      components: {
        left: InfoPageSidemenu,
        content: TermsConditionPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/betting-rules',
      name: 'sports betting rules',
      components: {
        left: InfoPageSidemenu,
        content: BettingRulesPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/privacy-policy',
      name: 'privacy policy',
      components: {
        left: InfoPageSidemenu,
        content: PrivacyPolicyPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/cookie-policy',
      name: 'cookie policy',
      components: {
        left: InfoPageSidemenu,
        content: CookiePolicyPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/support/faq',
      name: 'faq',
      components: {
        left: InfoPageSidemenu,
        content: FAQPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        left: InfoPageSidemenu,
        content: AboutPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      },
    },
    {
      path: '/about/about-arcanebet',
      name: 'about arcanebet',
      components: {
        left: InfoPageSidemenu,
        content: AboutPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
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
        content: WelcomeOfferSportPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/promotions/welcome-offer-sport',
      name: 'welcome offer sport',
      components: {
        left: InfoPageSidemenu,
        content: WelcomeOfferSportPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/promotions/welcome-offer-casino',
      name: 'welcome offer casino',
      components: {
        left: InfoPageSidemenu,
        content: WelcomeOfferCasinoPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/promotions/bonus-rules',
      name: 'bonus rules',
      components: {
        left: InfoPageSidemenu,
        content: BonusRulesPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/responsible-gaming',
      name: 'responsible gaming',
      components: {
        left: InfoPageSidemenu,
        content: IntroductionPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      },
    },
    {
      path: '/responsible-gaming/introduction',
      name: 'introduction',
      components: {
        left: InfoPageSidemenu,
        content: IntroductionPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    },
    {
      path: '/responsible-gaming/limits',
      name: 'setting limits',
      components: {
        left: InfoPageSidemenu,
        content: LimitsPage,
        right: Betslip,
        mobileSidemenu: InfoPageSidemenu
      }
    }
  ]
}

export default support
