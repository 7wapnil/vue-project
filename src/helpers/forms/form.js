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

  reset () {
    Object.keys(this.defaults).forEach((field) => {
      this[field] = this.defaults[field]
    })
  }

  handleGraphQLErrors ({ graphQLErrors }) {
    (graphQLErrors || []).forEach((error) => {
      this.errors.add(error.path[0], error.message)
    })
  }

  getErrors () {
    return this.errors.all()
  }
}
