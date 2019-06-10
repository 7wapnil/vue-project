<template>
  <b-container
    fluid
    class="footer-wrapper">
    <b-container
      class="footer p-0 bg-arc-clr-soil-darker"
    >
      <b-row
        class="footer-topicons-section"
        no-gutters>
        <b-col
          v-for="(topicon, index) in topicons"
          :key="index"
          class="d-flex justify-content-center">
          <b-img :src="require(`@/assets/images/footer/${topicon}.svg`)"/>
        </b-col>
      </b-row>
      <b-row
        class="footer-links-section"
        no-gutters>
        <b-col class="d-flex justify-content-center">
          <ul class="p-0 footer-list">
            <li class="font-weight-bold text-arc-clr-gold letter-spacing-2 line-height-18 my-2 text-capitalize">
              Sport
            </li>
            <li
              v-for="(item, index) in homepageLinks"
              :key="index"
              class="footer-list">
              <b-link
                :to="`${ item.path }`"
                class="text-capitalize">
                {{ item.name }}
              </b-link>
            </li>
          </ul>
        </b-col>
        <b-col
          v-for="(item, index) in footerItems"
          v-if="item.children"
          :key="index"
          class="d-flex justify-content-center">
          <ul
            class="p-0 footer-list">
            <li class="font-weight-bold text-arc-clr-gold letter-spacing-2 line-height-18 my-2 text-capitalize">
              {{ item.title }}
            </li>
            <li
              v-for="(child, index) in item.children"
              :key="index"
              class="footer-list">
              <b-link
                :to="{ name: `${ child.name }` }"
              >
                {{ child.name }}
              </b-link>
            </li>
          </ul>
        </b-col>
      </b-row>
      <b-row
        class="footer-social-section"
        no-gutters>
        <b-col class="d-flex align-items-center justify-content-center pt-5">
          <arc-circle
            v-for="(icon, index) in socialIcons"
            :key="index"
            :size="50"
            class="mx-2 pointer">
            <b-link
              :href="icon.path"
              target="_blank">
              <icon
                :name="icon.name"
                size="20px"
                color="arc-clr-soil-darker"/>
            </b-link>
          </arc-circle>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="text-center py-5">
          <span class="footer-policy-section line-height-24">
            TH Gambling N.V. E-Commerce Park Vredenberg, Curacao, Ara Hill Top Building Unit A-2 Pletterijweg Oost 1.<br>
            License and regulation is provided by the Government of Curacao, license #365/JAZ.<br>
            All video streaming is provided by various third parties and we do not carry any responsibility for actual content, stream quality, or streaming rights.<br>
            For customer support related questions, you can reach us through <a href="mailto:contact@arcanebet.com">contact@arcanebet.com</a> or by phone: + 31 6 44 28 36 07<br>
            © Copyrights 2018 All rights reserved. Gambling can be addictive. Please gamble responsibly.
          </span>
        </b-col>
      </b-row>
      <b-row no-gutters>
        <b-col class="d-flex align-items-center justify-content-center pb-5">
          <img
            v-for="(bottomicon, index) in bottomicons"
            :key="index"
            :src="require(`@/assets/images/footer/${bottomicon}.svg`)"
            class="px-4">
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import InformationPages from '@/routes/information_pages'

export default {
  data () {
    return {
      topicons:
        ['visa',
          'master-card',
          'skrill',
          'neteller',
          'paysafe',
          'skinpay',
          'bitcoin'],
      bottomicons:
        ['18years',
          'gamcare',
          'curacao',
          'esic'],
      footerItems: InformationPages.routes,
      homepageLinks: [
        {
          path: '/esports',
          name: 'Esport Homepage'
        },
        {
          path: '/sports',
          name: 'Sport Homepage'
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
