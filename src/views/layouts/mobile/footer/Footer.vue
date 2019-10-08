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
          class="d-flex justify-content-center py-2 px-3">
          <b-img :src="require(`@/assets/images/footer/${topicon}.svg`)"/>
        </b-col>
      </b-row>
      <b-list-group>
        <b-list-group-item
          v-for="item in homepageLinks"
          :to="item.path"
          :key="item.path"
          class="footer-mobile-nav-item"
          active-class="footer-mobile-nav-item-active"
          exact-active-class="footer-mobile-nav-item-exact-active">
          <span class="text-arc-clr-gold font-weight-bold font-size-14 letter-spacing-2 text-truncate text-capitalize">
            {{ item.name }}
          </span>
        </b-list-group-item>
        <b-list-group-item
          v-for="(item, index) in footerItems"
          :key="index"
          class="footer-mobile-nav-item"
          active-class="footer-mobile-nav-item-active"
          exact-active-class="footer-mobile-nav-item-exact-active">
          <footer-menu-item :item="item"/>
        </b-list-group-item>
      </b-list-group>

      <b-row
        class="footer-social-section"
        no-gutters>
        <b-col class="d-flex align-items-center justify-content-center pt-5">
          <arc-circle
            v-for="(socialicon, index) in socialIcons"
            :key="index"
            :size="50"
            class="mx-2 pointer">
            <b-link
              :href="socialicon.path"
              class="h-100 w-100 d-flex align-items-center justify-content-center"
              target="_blank">
              <icon
                :name="socialicon.name"
                size="18px"
                color="arc-clr-soil-darker"/>
            </b-link>
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
import InformationPages from '@/routes/information_pages'
import FooterMenuItem from './FooterMenuItem'

export default {
  components: {
    FooterMenuItem
  },
  data () {
    return {
      topicons:
          ['visa',
            'master-card',
            'skrill',
            'neteller',
            'paysafecard',
            'skinpay',
            'bitcoin'],
      footerItems: InformationPages.routes,
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
      socialIcons: [
        {
          name: 'facebook',
          path: 'https://www.facebook.com/arcanebet'
        },
        {
          name: 'twitter',
          path: 'https://twitter.com/ArcaneBet'
        },
        { name: 'discord',
          path: 'https://discordapp.com/invite/SutBDGd'
        }
      ]
    }
  }
}
</script>
