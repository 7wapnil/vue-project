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
          :class="`d-flex justify-content-center ${topicon}-icon`">
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
              v-for="item in homepageLinks"
              :key="item.id"
              class="footer-list">
              <b-link
                :to="{ name: item.name }"
                class="text-capitalize">
                {{ item.title }}
              </b-link>
            </li>
          </ul>
        </b-col>
        <b-col
          v-for="item in footerItems"
          v-if="item.children"
          :key="item.id"
          class="d-flex justify-content-center">
          <ul
            class="p-0 footer-list">
            <li class="font-weight-bold text-arc-clr-gold letter-spacing-2 line-height-18 my-2 text-capitalize">
              {{ item.title }}
            </li>
            <li
              v-for="child in item.children"
              :key="child.id"
              class="footer-list">
              <b-link
                :to="child.route">
                {{ child.title }}
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
          <iframe
            width="147"
            height="48"
            src="https://licensing.gaming-curacao.com/validator/?lh=5c65391c57c056b0380cc6159a4fb20d&template=tseal"
            scrolling="no"
            frameborder="0"/>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>

export default {
  name: 'DesktopFooter',
  data () {
    return {
      topicons:
        ['visa',
          'master-card',
          'skrill',
          'neteller',
          'paysafecard',
          'iDebit',
          'bitcoin'],
      bottomicons:
        ['18years',
          'gamcare',
          'esic'],
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
              title: 'Promotions',
              route: { name: 'promotions' }
            },
            {
              id: 3.2,
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
          id: 1,
          name: 'esports',
          title: 'Esport Homepage'
        },
        {
          id: 2,
          name: 'sports',
          title: 'Sport Homepage'
        },
        {
          id: 3,
          name: 'casino',
          title: 'Casino Homepage'
        },
        {
          id: 4,
          name: 'live-casino',
          title: 'Live casino Homepage'
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
