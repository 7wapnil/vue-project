// Children of this class are models which are used for
// Apollo GraphQL caching with explicitly defined __typename

export default class Base {
  constructor (attributes = {}) {
    this.__typename = this.constructor.name;

    this.assignAttributes(attributes)
    this.assignAssociations(attributes)
  }

  assignAttributes (attributes) {
    Object.keys(attributes).forEach((key) => {
      this[key] = attributes[key]
    })
  }

  assignAssociations (attributes) {}
}
