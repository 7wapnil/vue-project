export default class Errors {
  constructor () {
    this.errors = {}
  }

  get first () {
    if (this.any()) {
      return this.errors[ Object.keys(this.errors)[0] ]
    }

    return null
  }

  fill (errors) {
    this.errors = errors
  }

  clear () {
    this.errors = {}
  }

  any () {
    return Object.keys(this.errors).length > 0
  }

  add (field, error) {
    this.errors[field] = error
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  get (field) {
    if (this.has(field)) {
      return this.errors[field]
    }
    return null
  }

  state (field) {
    return this.has(field) ? false : null
  }
}
