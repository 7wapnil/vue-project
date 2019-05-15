import moment from 'moment'

export default {
  asFormattedDate (date, format = 'HH:mm MMMM DD') {
    return moment(date).format(format)
  },
  asCalendarDate (date, format) {
    return moment(date).calendar(null, format)
  },
  asDate (date) {
    return this.asFormattedDate(date, '')
  },
  dateFormat (date) {
    return moment(date).format('HH:mm MMMM DD')
  },
  round: (value, number = 2) => {
    return value.toFixed(number)
  },
  capitalize (value) {
    if (!value) {
      return ''
    }
    return value.toUpperCase()
  },
  secondsToNthMinuteAndSuffix (number) {
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
}
