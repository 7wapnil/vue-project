import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import SignUp from '@/views/auth/SignUp.vue'
import SignupFirstStep from '@/views/auth/SignupFirstStep.vue'
import SignupSecondStep from '@/views/auth/SignupSecondStep.vue'
import contentful from '@/libs/contentful/contentful-client'
import VueI18n from 'vue-i18n'
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
  let secondStepWrapper

  let form = new Form({
    firstStep: {
      userName: ''
    }
  })

  const countries = ['Estonia']

  before(() => {
    wrapper = mount(SignUp,
      {
        data () {
          return {
            form: form,
          }
        },
        localVue
      })
  })

  describe('Sign Up Form Component', () => {
    describe('Basics', () => {
      it('renders first step component', () => {
        expect(wrapper.contains(SignupFirstStep)).to.equal(true)
      })

      it('renders second step component', () => {
        expect(wrapper.contains(SignupSecondStep)).to.equal(true)
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

      describe('country input', () => {
        it('contains select input', () => {
          expect(firstStepWrapper.contains('#signup-country')).to.equal(true)
        })
      })

      describe('currency input', () => {
        it('contains currency input', () => {
          expect(firstStepWrapper.contains('#signup-currency')).to.equal(true)
        })
      })

      describe('next step button', () => {
        it('has button', () => {
          expect(firstStepWrapper.contains('.btn-user-profile-button')).to.equal(true)
        })

        it('has correct text', () => {
          expect(firstStepWrapper.find('.btn-user-profile-button').text()).to.equal('Next step')
        })
      })
    })
  })

  describe('Second Step', () => {
    describe('Inputs', () => {
      before(() => {
        const submitting = false
        secondStepWrapper = mount(SignupSecondStep,
          {
            propsData: {
              form, countries, submitting
            },
            data () {
              return {
                genders: [
                  { value: 'male', text: 'Male' },
                  { value: 'female', text: 'Female' }
                ]
              }
            },
            localVue
          })
      })

      describe('first name input', () => {
        it('contains first name input', () => {
          expect(secondStepWrapper.contains('#signup-firstName')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-firstName').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder ', () => {
          expect(secondStepWrapper.find('#signup-firstName').attributes()['placeholder']).to.equal('First name')
        })
      })

      describe('last name input', () => {
        it('contains last name input', () => {
          expect(secondStepWrapper.contains('#signup-lastName')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-lastName').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder', () => {
          expect(secondStepWrapper.find('#signup-lastName').attributes()['placeholder']).to.equal('Last name')
        })
      })

      describe('gender input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#gender')).to.equal(true)
        })

        it('has correct default value', () => {
          expect(secondStepWrapper.find('#gender').element.value).to.equal('male')
        })
      })

      describe('phone number input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-phone')).to.equal(true)
        })

        it('has type tel', () => {
          expect(secondStepWrapper.find('#signup-phone').attributes()['type']).to.equal('tel')
        })
      })

      describe('address input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-streetAddress')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-streetAddress').attributes()['type']).to.equal('text')
        })
      })

      describe('zipCode input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-zipCode')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-zipCode').attributes()['type']).to.equal('text')
        })
      })

      describe('city input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-city')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-city').attributes()['type']).to.equal('text')
        })
      })

      describe('state input', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-state')).to.equal(true)
        })

        it('has type text', () => {
          expect(secondStepWrapper.find('#signup-state').attributes()['type']).to.equal('text')
        })
      })

      describe('agreedWithPromotional checkbox', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-agreedWithPromotional')).to.equal(true)
        })

        it('has type checkbox', () => {
          expect(secondStepWrapper.find('#signup-agreedWithPromotional').attributes()['type']).to.equal('checkbox')
        })
      })

      describe('agreedWithPrivacy checkbox', () => {
        it('contains gender input', () => {
          expect(secondStepWrapper.contains('#signup-agreedWithPrivacy')).to.equal(true)
        })

        it('has type checkbox', () => {
          expect(secondStepWrapper.find('#signup-agreedWithPrivacy').attributes()['type']).to.equal('checkbox')
        })
      })
    })
  })
})
