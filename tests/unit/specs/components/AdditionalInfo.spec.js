import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AdditionalInfo from '@/views/account/account-additional-info/AdditionalInfo.vue'
import VueI18n from 'vue-i18n'
import { Form } from '@/helpers'
import { messages } from '@/translations/'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueI18n)

describe('DepositPage', () => {
  let formWrapper
  let user

  let form = new Form({
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    state: ''
  })

  let i18n = new VueI18n({
    locale: 'en',
    messages
  })

  user = {
    needMoreInfo: true,
    addressCountry: 'Albania',
  }

  // getters = {
  //   getUser: () => ({
  //     needMoreInfo: true,
  //     addressCountry: 'Albania'
  //   }),
  // }

  // store = new Vuex.Store({
  //   modules: {
  //     user: {
  //       state,
  //       getters,
  //     }
  //   }
  // })

  describe('DepositNeedMoreInfo Form Component', () => {
    describe('Inputs', () => {
      before(() => {
        formWrapper = mount(AdditionalInfo,
          {
            data () {
              return {
                form,
                submitting: false,
              }
            },
            propsData: {
              user
            },
            localVue,
            i18n
          })
      })

      describe('first name input', () => {
        it('contains first name input', () => {
          expect(formWrapper.contains('#needMoreInfo-firstName')).to.equal(true)
        })

        it('has type text', () => {
          expect(formWrapper.find('#needMoreInfo-firstName').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder ', () => {
          expect(formWrapper.find('#needMoreInfo-firstName').attributes()['placeholder']).to.equal('First Name')
        })
      })

      describe('last name input', () => {
        it('contains last name input', () => {
          expect(formWrapper.contains('#needMoreInfo-lastName')).to.equal(true)
        })

        it('has type text', () => {
          expect(formWrapper.find('#needMoreInfo-lastName').attributes()['type']).to.equal('text')
        })

        it('has correct placeholder', () => {
          expect(formWrapper.find('#needMoreInfo-lastName').attributes()['placeholder']).to.equal('Last Name')
        })
      })

      describe('phone number input', () => {
        it('contains number input', () => {
          expect(formWrapper.contains('#needMoreInfo-phone')).to.equal(true)
        })

        it('has type tel', () => {
          expect(formWrapper.find('#needMoreInfo-phone').attributes()['type']).to.equal('tel')
        })
      })

      describe('address input', () => {
        it('contains address input', () => {
          expect(formWrapper.contains('#needMoreInfo-streetAddress')).to.equal(true)
        })

        it('has type text', () => {
          expect(formWrapper.find('#needMoreInfo-streetAddress').attributes()['type']).to.equal('text')
        })
      })

      describe('city input', () => {
        it('contains city input', () => {
          expect(formWrapper.contains('#needMoreInfo-city')).to.equal(true)
        })

        it('has type text', () => {
          expect(formWrapper.find('#needMoreInfo-city').attributes()['type']).to.equal('text')
        })
      })

      describe('submit button', () => {
        it('contains submit button', () => {
          expect(formWrapper.contains('#needMoreInfo-submit')).to.equal(true)
        })

        it('has correct text', () => {
          expect(formWrapper.find('#needMoreInfo-submit').text()).to.equal('Next step')
        })

        it('has correct type', () => {
          expect(formWrapper.find('#needMoreInfo-submit').attributes()['type']).to.equal('submit')
        })
      })
    })
  })
})
