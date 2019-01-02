import moment from 'moment'

export default {
  asFormattedDate (date, format = 'HH:mm MMMM DD') {
    return moment(date).format(format)
  },
  asCalendarDate(date, format){
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
  }
}
