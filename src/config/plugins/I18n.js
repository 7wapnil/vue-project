import { messages } from '@/translations/'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  messages
})

VueI18n.prototype.getSuffix = (number) => {
  if (!number) return null
  let convertedNumber = Math.floor(number / 60) + 1

  let numberBy10 = convertedNumber % 10; let numberBy100 = convertedNumber % 100;

  if (numberBy10 === 1 && numberBy100 !== 11) {
    return convertedNumber + 'st'
  }
  if (numberBy10 === 2 && numberBy100 !== 12) {
    return convertedNumber + 'nd'
  }
  if (numberBy10 === 3 && numberBy100 !== 13) {
    return convertedNumber + 'rd'
  }

  return convertedNumber + 'th'
}

export default i18n
