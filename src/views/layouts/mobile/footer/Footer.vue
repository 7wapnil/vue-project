<template>
  <b-container
    fluid
    class="footer-mobile-wrapper p-0">
    <b-container
      class="footer-mobile bg-arc-clr-soil-darker p-0">
      <b-row class="footer-mobile-topicons-section">
        <b-col
          v-for="(topicon, index) in topicons"
          :key="index"
          :class="`d-flex justify-content-center py-2 px-3 ${topicon}-icon`">
          <b-img :src="require(`@/assets/images/footer/${topicon}.svg`)"/>
        </b-col>
      </b-row>
      <b-nav
        vertical
        class="flex-nowrap">
        <b-nav-item
          v-for="item in homepageLinks"
          :to="item.path"
          :key="item.path"
          class="footer-mobile-nav-item">
          <span class="text-arc-clr-gold font-weight-bold font-size-14 letter-spacing-2 text-truncate text-capitalize">
            {{ item.name }}
          </span>
        </b-nav-item>
        <b-nav-item
          v-for="item in footerItems"
          :key="item.id"
          class="footer-mobile-nav-item">
          <footer-menu-item :item="item"/>
        </b-nav-item>
      </b-nav>
      <b-row
        class="footer-social-section"
        no-gutters>
        <b-col class="d-flex align-items-center justify-content-center pt-5">
          <arc-circle
            v-for="(socialicon, index) in socialicons"
            :key="index"
            :size="50"
            class="mx-2 pointer">
            <icon
              :name="socialicon"
              size="20px"
              color="arc-clr-soil-darker"/>
          </arc-circle>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col>
          <div class="footer-mobile-policy-section-wrapper">
            <span class="footer-mobile-policy-section line-height-24">
              TH Gambling N.V. E-Commerce Park Vredenberg, Curacao, Ara Hill Top Building Unit A-2 Pletterijweg Oost 1.<br>
              License and regulation is provided by the Government of Curacao, license #365/JAZ.<br>
              All video streaming is provided by various third parties and we do not carry any responsibility for actual content, stream quality, or streaming rights.<br>
              For customer support related questions, you can reach us through <a href="mailto:contact@arcanebet.com">contact@arcanebet.com</a> or by phone: + 31 6 44 28 36 07<br>
              © Copyrights 2018 All rights reserved. Gambling can be addictive. Please gamble responsibly.
            </span>
          </div>
        </b-col>
      </b-row>
      <div class="footer-mobile-bottom-icons-section">
        <b-row no-gutters>
          <b-col class="p-3 text-right">
            <img :src="require('@/assets/images/footer/18years.svg')">
          </b-col>
          <b-col class="p-3 text-left">
            <img :src="require('@/assets/images/footer/gamcare.svg')">
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col
            cols="7"
            class="p-3 text-right overflow-hidden">
            <iframe
              width="147"
              height="48"
              src="https://licensing.gaming-curacao.com/validator/?lh=5c65391c57c056b0380cc6159a4fb20d&template=tseal"
              scrolling="no"
              frameborder="0"/>
          </b-col>
          <b-col
            cols="5"
            class="p-3 text-left">
            <img :src="require('@/assets/images/footer/esic.svg')">
          </b-col>
        </b-row>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import FooterMenuItem from './FooterMenuItem'

export default {
  name: 'MobileFooter',
  components: {
    FooterMenuItem
  },
  data () {
    return {
      topicons: [
        'visa',
        'master-card',
        'skrill',
        'neteller',
        'paysafecard',
        'ecoPayz',
        'iDebit',
        'bitcoin'
      ],
      footerItems: [
        {
          id: 1,
          title: 'Support',
          icon: 'support',
          route: { name: 'support' },
          children: [
            {
              id: 1.1,
              title: 'Contact us',
              route: { name: 'contact us' }
            },
            {
              id: 1.2,
              title: 'Terms and conditions',
              route: { name: 'terms and conditions' }
            },
            {
              id: 1.3,
              title: 'Sports betting rules',
              route: { name: 'sports betting rules' }
            },
            {
              id: 1.4,
              title: 'Privacy policy',
              route: { name: 'privacy policy' }
            },
            {
              id: 1.5,
              title: 'Cookie policy',
              route: { name: 'cookie policy' }
            },
            {
              id: 1.6,
              title: 'FAQ',
              route: { name: 'faq' }
            }]
        },
        {
          id: 2,
          title: 'About',
          icon: 'arcanebet-default-icon',
          route: { name: 'about' },
          children: [{
            id: 2.1,
            title: 'About Arcanebet',
            route: { name: 'about arcanebet' }
          },
          {
            id: 2.2,
            title: 'Affiliates',
            route: { name: 'affiliates' }
          }],
        },
        {
          id: 3,
          title: 'Promotions',
          icon: 'promotional',
          route: { name: 'promotions' },
          children: [
            {
              id: 3.1,
              title: 'Welcome Offer Sport',
              route: { name: 'welcome offer sport' }
            },
            {
              id: 3.2,
              title: 'Welcome Offer Casino',
              route: { name: 'welcome offer casino' }
            },
            {
              id: 3.3,
              title: 'Bonus rules',
              route: { name: 'bonus rules' }
            }],
        },
        {
          id: 4,
          title: 'Responsible gaming',
          icon: 'help',
          route: { name: 'responsible gaming' },
          children: [
            {
              id: 4.1,
              title: 'Introduction',
              route: { name: 'introduction' }
            },
            {
              id: 4.2,
              title: 'Setting limits',
              route: { name: 'setting limits' }
            }],
        },

      ],
      homepageLinks: [
        {
          path: '/esports',
          name: 'Esport Homepage'
        },
        {
          path: '/sports',
          name: 'Sport Homepage'
        },
        {
          path: '/casino',
          name: 'Casino Homepage'
        },
        {
          path: '/live-casino',
          name: 'Live casino Homepage'
        }
      ],
      socialicons: ['facebook', 'twitter', 'discord']
    }
  }
}
</script>
