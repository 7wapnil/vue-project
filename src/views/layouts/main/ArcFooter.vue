<template>
  <b-navbar
    class="p-0"
    variant="arc-clr-soil-darker">
    <b-container
      fluid
      class="p-0 footer-section">
      <b-container
        class="mx-5 py-3"
        style="max-width: 1920px">
        <b-row>
          <b-col
            v-for="(topicon, index) in topicons"
            :key="index"
            class="py-5 d-flex justify-content-center">
            <b-img :src="require('@/assets/images/footer/' + `${topicon}`)"/>
          </b-col>
        </b-row>
      </b-container>
      <b-container
        fluid
        class="p-0 footer-section">
        <b-container
          class="p-0 mx-5"
          style="max-width: 1920px"
          fluid>
          <b-row no-gutters>
            <b-col
              class="py-4"
              style="max-width: 268px">
              <b-row no-gutters>
                <b-col
                  v-for="(lefticon, index) in lefticons"
                  :key="index"
                  cols="12"
                  class="py-4 my-3 d-flex justify-content-center">
                  <img
                    :src="require('@/assets/images/footer/' + `${lefticon}`)"
                    class="d-flex align-items-center">
                </b-col>
              </b-row>
            </b-col>
            <b-col>
              <b-row
                no-gutters
                class="py-4 pl-4 my-5">
                <b-col>
                  <ul
                    class="p-0 footer-list"
                    style="">
                    <li class="list-header my-2">Promotions</li>
                    <li
                      v-for="(promotion, index) in promotions"
                      :key="index">
                      <b-link :to="`${promotion.link}`">
                        {{ promotion.name }}
                      </b-link>
                    </li>
                  </ul>
                  <ul class="p-0 footer-list">
                    <li class="list-header my-2">Responsible gaming</li>
                    <li
                      v-for="(responsible, index) in responsibles"
                      :key="index"
                      class="footer-list">
                      <b-link :to="`${responsible.link}`">
                        {{ responsible.name }}
                      </b-link>
                    </li>
                  </ul>
                </b-col>
                <b-col>
                  <ul class="p-0 footer-list">
                    <li class="list-header my-2">Supports</li>
                    <li
                      v-for="(support, index) in supports"
                      :key="index"
                      class="footer-list">
                      <b-link :to="`${support.link}`">
                        {{ support.name }}
                      </b-link>
                    </li>
                  </ul>
                </b-col>
                <b-col>
                  <ul class="p-0 footer-list">
                    <li class="list-header my-2">About</li>
                    <li
                      v-for="(about, index) in abouts"
                      :key="index"
                      class="footer-list">
                      <b-link :to="`${about.link}`">
                        {{ about.name }}
                      </b-link>
                    </li>
                  </ul>
                </b-col>
              </b-row>
              <b-row
                no-gutters
                class="p-4 policy">
                <b-col class="d-flex align-items-center">
                  <span
                    v-for="(policy, index) in policies"
                    :key="index"
                    class="pr-4">
                    <b-link :to="`${policy.link}`">
                      {{ policy.name }}
                    </b-link>
                  </span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
      <b-container
        fluid
        class="p-0 footer-section">
        <b-container
          style="max-width: 1920px"
          class="mx-5"
          fluid>
          <b-row class="py-5">
            <b-col
              style="max-width: 268px"
              class="d-flex justify-content-center">
              <img src="~@/assets/images/footer/footer-logo.svg">
            </b-col>
            <b-col>
              <p class="text-left pl-3 footer-text">
                TH Gambling N.V. E-Commerce Park Vredenberg, Curacao, Ara Hill Top Building Unit A-2 Pletterijweg Oost 1.<br>
                License and regulation is provided by the Government of Curacao, license #365/JAZ.<br>
                All video streaming is provided by various third parties and we do not carry any responsibility for actual content, stream quality, or streaming rights.<br>
                For customer support related questions, you can reach us through <a href="mailto:contact@arcanebet.com">contact@arcanebet.com</a> or by phone: + 31 6 44 28 36 07<br>
                © Copyrights 2018 All rights reserved. Gambling can be addictive. Please gamble responsibly.
              </p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      topicons: ['visa.svg',
        'master-card.svg',
        'skrill.svg',
        'neteller.svg',
        'paysafe.svg',
        'skinpay.svg',
        'bitcoin.svg'],
      lefticons: ['18years.svg',
        'gamcare.svg',
        'curacao.svg',
        'esic.svg'],
      promotions: [
        {
          link: '/',
          name: 'ArcaneBet Promotions'
        }, {
          link: '/',
          name: 'Sports Bonus Rules'
        }, {
          link: '/',
          name: 'Casino Bonus rules'
        }],
      responsibles: [
        {
          link: '/',
          name: 'Introduction'
        },
        {
          link: '/',
          name: 'Self-assessment test (optional)'
        },
        {
          link: '/',
          name: 'Betting advice'
        },
        {
          link: '/',
          name: 'Set Your limits'
        },
      ],
      supports: [
        {
          link: '/',
          name: 'Live Support'
        },
        {
          link: '/',
          name: 'Getting started'
        },
        {
          link: '/',
          name: 'Contact us'
        },
        {
          link: '/',
          name: 'Payment method'
        },
        {
          link: '/',
          name: 'Betting Help'
        },
        {
          link: '/',
          name: 'Verification process'
        },
        {
          link: '/',
          name: 'FAQ'
        },
        {
          link: '/',
          name: 'Affiliate program'
        },
        {
          link: '/',
          name: 'Mobile'
        }
      ],
      abouts: [
        {
          link: '/',
          name: 'Welcome to ArcaneBet'
        },
        {
          link: '/',
          name: 'Website feautures'
        },
        {
          link: '/',
          name: 'About ArcaneBet (licenses & offices)'
        },
        {
          link: '/',
          name: 'Refer a friend'
        },
        {
          link: '/',
          name: 'Partners'
        },
        {
          link: '/',
          name: 'Blog (when we have one)'
        },
        {
          link: '/',
          name: 'Social Media'
        }
      ],
      policies: [
        {
          link: '/',
          name: 'Terms and Conditions'
        },
        {
          link: '/',
          name: 'Cookie Policy'
        },
        {
          link: '/',
          name: 'Privacy Policy'
        }
      ]
    }
  }
}
</script>
