import Errors from './errors'

export default class Form {
  constructor (defaults = {}) {
    this.defaults = defaults
    this.reset()
    this.errors = new Errors()
  }

  values () {
    const fields = Object.assign({}, this)
    delete fields.errors
    delete fields.defaults

    return fields
  }

  setErrors (errors) {
    this.errors.fill(errors)
  }

  clearErrors () {
    this.errors.clear()
  }

  reset (fields) {
    const clearedFields = (fields && fields.length) ? fields : Object.keys(this.defaults)

    clearedFields.forEach((field) => {
      this[field] = this.defaults[field]
    })
  }

  handleGraphQLErrors (errors) {
    this.errors.parseGraphQLErrors(errors)
  }

  getErrors () {
    return this.errors.all()
  }
}
