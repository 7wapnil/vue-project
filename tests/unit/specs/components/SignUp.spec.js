import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import SignUp from '@/views/auth/SignUp.vue'
import SignupForm from '@/views/auth/SignupForm.vue'
import VueI18n from 'vue-i18n'
import { Form } from '@/helpers'
import { messages } from '@/translations/'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)

describe('SignUp', () => {
  let wrapper
  let formWrapper

  let form = new Form({
    registration: {
      userName: ''
    }
  })

  const countries = ['Estonia']

  let i18n = new VueI18n({
    locale: 'en',
    messages
  })

  before(() => {
    wrapper = mount(SignUp,
      {
        data () {
          return {
            form: form,
          }
        },
        localVue,
        i18n
      })

    const submit = sinon.stub()
    wrapper.setMethods({ submit: submit })
  })

  describe('Sign Up Form Component', () => {
    describe('Basics', () => {
      it('renders form component', () => {
        expect(wrapper.contains(SignupForm)).to.equal(true)
      })

      it('form contains registration button', () => {
        expect(wrapper.contains('#signup-submit')).to.equal(true)
      })
    })
  })

  describe('Signup form', () => {
    describe('Inputs', () => {
      before(() => {
        const dobProxy = {
          day: '',
          month: '',
          year: ''
        }

        formWrapper = mount(SignupForm,
          {
            propsData: {
              form, dobProxy, countries
            },
            data () {
              return {
                currencies: []
              }
            },
            localVue,
            i18n
          })
      })

      describe('username input', () => {
        it('contains username input', () => {
          expect(formWrapper.contains('#signup-username')).to.equal(true)
        })

        it('has type text ', () => {
          expect(formWrapper.contains('#signup-username')).to.equal(true)
        })

        it('has correct placeholder ', () => {
          expect(formWrapper.find('#signup-username').attributes()['placeholder']).to.equal('Username')
        })

        it('has username autocomplete attribute', () => {
          expect(formWrapper.find('#signup-username').attributes()['autocomplete']).to.equal('username')
        })
      })

      describe('email input', () => {
        it('contains email input', () => {
          expect(formWrapper.contains('#signup-email')).to.equal(true)
        })

        it('has type text', () => {
          expect(formWrapper.find('#signup-email').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder ', () => {
          expect(formWrapper.find('#signup-email').attributes()['placeholder']).to.equal('Email')
        })

        it('has email autocomplete attribute', () => {
          expect(formWrapper.find('#signup-email').attributes()['autocomplete']).to.equal('email')
        })
      })

      describe('Date of birth input', () => {
        it('contains day input', () => {
          expect(formWrapper.contains('#signup-day')).to.equal(true)
        })

        it('contains month input', () => {
          expect(formWrapper.contains('#signup-month')).to.equal(true)
        })

        it('contains year input', () => {
          expect(formWrapper.contains('#signup-year')).to.equal(true)
        })
      })

      describe('password input', () => {
        it('contains password input', () => {
          expect(formWrapper.contains('#signup-password')).to.equal(true)
        })

        it('has type password', () => {
          expect(formWrapper.find('#signup-password').attributes()['type']).to.equal('password')
        })

        it('has correct placeholder ', () => {
          expect(formWrapper.find('#signup-password').attributes()['placeholder']).to.equal('Password')
        })

        it('has show password button ', () => {
          expect(formWrapper.contains('#signup-password-show')).to.equal(true)
        })
      })

      describe('country input', () => {
        it('contains select input', () => {
          expect(formWrapper.contains('#signup-country')).to.equal(true)
        })
      })

      describe('currency input', () => {
        it('contains currency input', () => {
          expect(formWrapper.contains('#signup-currency')).to.equal(true)
        })
      })

      describe('promo content checkbox', () => {
        it('form contains agree checkboxes', () => {
          expect(wrapper.contains('#signup-agreedWithPromotional')).to.equal(true)
        })

        it('form contains agree checkboxes', () => {
          expect(formWrapper.find('label[for=signup-agreedWithPromotional]').text()).to.equal('I agree to receive promotional content')
        })
      })

      describe('age and T&C checkbox', () => {
        it('form contains agree checkboxes', () => {
          expect(wrapper.contains('#signup-agreedWithPrivacy')).to.equal(true)
        })

        it('form contains agree checkboxes', () => {
          expect(formWrapper.find('label[for=signup-agreedWithPrivacy]').text()).to.contain('Confirm I am not underage')
        })
      })

      describe('register button', () => {
        it('has button', () => {
          expect(formWrapper.contains('#signup-submit')).to.equal(true)
        })

        it('has correct text', () => {
          expect(formWrapper.find('#signup-submit').text()).to.equal('Register')
        })

        it('has correct type', () => {
          expect(formWrapper.find('#signup-submit').attributes()['type']).to.equal('submit')
        })
      })
    })
  })
})
