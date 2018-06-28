import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SignUp from '@/views/auth/SignUp.vue'

const wrapper = shallowMount(SignUp, {
  stubs: {
    'simple-layout': '<div><slot></slot></div>'
  }
})

describe('SignUp.vue', () => {
  it('default date format', () => {
    expect(wrapper.vm.$data.fields.date_of_birth)
      .to
      .match(/\d{4}-\d{2}-\d{2}/)
  })
})
