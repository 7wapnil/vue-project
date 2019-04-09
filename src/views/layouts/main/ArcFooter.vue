<template>
  <b-navbar
    class="p-0"
    variant="arc-clr-soil-darker">
    <b-container
      fluid
      style="max-width: 1920px"
      class="p-0 footer-section">
      <b-container
        class="py-3"
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
          class="p-0"
          fluid>
          <b-row no-gutters>
            <b-col>
              <b-row
                no-gutters
                class="p-4 my-5">
                <b-col class="d-flex justify-content-center">
                  <ul
                    class="p-0 footer-list"
                    style="">
                    <li class="list-header my-2 text-capitalize">Sport</li>
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
                    <li class="list-header my-2 text-capitalize">{{ item.title }}</li>
                    <li
                      v-for="(child, index) in item.children"
                      :key="index"
                      class="footer-list">
                      <b-link
                        :to="{ name: `${ child.name }` }"
                        class="text-capitalize">
                        {{ child.name }}
                      </b-link>
                    </li>
                  </ul>
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
          fluid>
          <b-row no-gutters>
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
          <b-row class="pb-5 pt-5">
            <b-col class="text-center">
              <span class="footer-text line-height-24">
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
                :src="require('@/assets/images/footer/' + `${bottomicon}`)"
                class="px-4">
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </b-container>
  </b-navbar>
</template>

<script>
import InformationPages from '@/routes/information_pages'

export default {
  data () {
    return {
      topicons:
        ['visa.svg',
        'master-card.svg',
        'skrill.svg',
        'neteller.svg',
        'paysafe.svg',
        'skinpay.svg',
        'bitcoin.svg'],
      bottomicons:
        ['18years.svg',
        'gamcare.svg',
        'curacao.svg',
        'esic.svg'],
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
      socialicons: ['facebook', 'twitter', 'discord']
    }
  }
}
</script>
