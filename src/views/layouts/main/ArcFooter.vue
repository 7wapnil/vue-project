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
                <b-col
                  v-for="(item, index) in items"
                  v-if="item.children"
                  :key="index"
                  col="3"
                  class="here">
                  <ul
                    class="p-0 footer-list"
                    style="">

                    <li class="list-header my-2 text-capitalize">{{ item.name }}</li>
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
import InformationPages from '@/routes/information_pages'

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
      items: InformationPages.routes
    }
  }
}
</script>
