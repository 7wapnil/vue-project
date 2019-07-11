import { expect } from 'chai'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import SignUp from '@/views/auth/SignUp.vue'
import SignupFirstStep from '@/views/auth/SignupFirstStep.vue'
import SignupSecondStep from '@/views/auth/SignupSecondStep.vue'
import contentful from '@/libs/contentful/contentful-client'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)
localVue.use(contentful, {
  space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
})

describe('SignUp', () => {
  let wrapper
  let i18n

  before(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })

    wrapper = mount(SignUp,
      {
        data () {
          return {}
        },
        i18n,
        localVue
      })

    // const submit = sinon.stub()
    // wrapper.setMethods({ submit: submit })
  })

  describe('Sign Up Form Component', () => {
    describe('Basics', () => {
      it('renders child components', () => {
        console.log(wrapper)
        console.log(wrapper.find(SignupFirstStep).props())
        // expect(wrapper.find(SignupFirstStep)).to.equal(true)
        // expect(promotion.contains('img[alt="arcanebet-promocode"]')).to.equal(false)
      })
    })
  })
})
