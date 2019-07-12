import { expect } from 'chai'
import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import SignUp from '@/views/auth/SignUp.vue'
import SignupFirstStep from '@/views/auth/SignupFirstStep.vue'
import SignupSecondStep from '@/views/auth/SignupSecondStep.vue'
import contentful from '@/libs/contentful/contentful-client'
import VueI18n from 'vue-i18n'
import { messages } from '@/translations/'
import { Form } from '@/helpers'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)
localVue.use(contentful, {
  space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
})

describe('SignUp', () => {
  let wrapper
  let firstStepWrapper
  let i18n
  let form = new Form({
    firstStep: {
      userName: ''
    }
  })

  const countries = ['Estonia']

  before(() => {
    i18n = new VueI18n({
      locale: 'en',
      messages
    })

    wrapper = shallowMount(SignUp,
      {
        data () {
          return {
            form: form,
          }
        },
        i18n,
        localVue
      })
  })

  describe('Sign Up Form Component', () => {
    describe('Basics', () => {
      it('renders first step component', () => {
        expect(wrapper.contains(SignupFirstStep)).to.equal(true)
      })

      it('doesn\'t render second step component', () => {
        expect(wrapper.contains(SignupSecondStep)).to.equal(false)
      })

      it('renders step switcher', () => {
        expect(wrapper.contains('.sign-form-tabs')).to.equal(true)
      })

      it('first step is active by default', () => {
        expect(wrapper.find('a.nav-link[aria-posinset="1"]').classes().includes('active')).to.equal(true)
      })

      it('second step is not active by default', () => {
        expect(wrapper.find('a.nav-link[aria-posinset="2"]').classes().includes('active')).to.equal(false)
      })

      it('first step text is correct', () => {
        expect(wrapper.find('a.nav-link.active').text()).to.equal('Personal information')
      })

      it('second step text is correct', () => {
        expect(wrapper.find('a.nav-link[aria-posinset="2"]').text()).to.equal('Contact information')
      })
    })
  })

  describe('First Step', () => {
    describe('Inputs', () => {
      before(() => {
        const dobProxy = {
          day: '',
          month: '',
          year: ''
        }

        firstStepWrapper = mount(SignupFirstStep,
          {
            propsData: {
              form, dobProxy, countries
            },
            data () {
              return {
                currencies: []
              }
            },
            i18n,
            localVue
          })
      })

      describe('username input', () => {
        it('contains username input', () => {
          expect(firstStepWrapper.contains('#signup-username')).to.equal(true)
        })

        it('has type text ', () => {
          expect(firstStepWrapper.contains('#signup-username')).to.equal(true)
        })

        it('has correct placeholder ', () => {
          expect(firstStepWrapper.find('#signup-username').attributes()['placeholder']).to.equal('Username')
        })

        it('has username autocomplete attribute', () => {
          expect(firstStepWrapper.find('#signup-username').attributes()['autocomplete']).to.equal('username')
        })
      })

      describe('email input', () => {
        it('contains email input', () => {
          expect(firstStepWrapper.contains('#signup-email')).to.equal(true)
        })

        it('has type text', () => {
          expect(firstStepWrapper.find('#signup-email').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder ', () => {
          expect(firstStepWrapper.find('#signup-email').attributes()['placeholder']).to.equal('Email')
        })

        it('has email autocomplete attribute', () => {
          expect(firstStepWrapper.find('#signup-email').attributes()['autocomplete']).to.equal('email')
        })
      })

      describe('Date of birth input', () => {
        it('contains day input', () => {
          expect(firstStepWrapper.contains('#signup-day')).to.equal(true)
        })

        it('contains month input', () => {
          expect(firstStepWrapper.contains('#signup-month')).to.equal(true)
        })

        it('contains year input', () => {
          expect(firstStepWrapper.contains('#signup-year')).to.equal(true)
        })
      })

      describe('password input', () => {
        it('contains password input', () => {
          expect(firstStepWrapper.contains('#signup-password')).to.equal(true)
        })

        it('has type password', () => {
          expect(firstStepWrapper.find('#signup-password').attributes()['type']).to.equal('password')
        })

        it('has correct placeholder ', () => {
          expect(firstStepWrapper.find('#signup-password').attributes()['placeholder']).to.equal('Password')
        })
      })

      describe('password confirm input', () => {
        it('contains password confirm input', () => {
          expect(firstStepWrapper.contains('#signup-password-confirmation')).to.equal(true)
        })

        it('has type password', () => {
          expect(firstStepWrapper.find('#signup-password-confirmation').attributes()['type']).to.equal('password')
        })

        it('has correct placeholder ', () => {
          expect(firstStepWrapper.find('#signup-password-confirmation').attributes()['placeholder']).to.equal('Repeat password')
        })
      })
    })
  })
})
