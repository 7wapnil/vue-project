import gql from 'graphql-tag'

class BaseService {
  constructor(vm) {
    this.vm = vm
  }

  get client() {
    return this.vm.$apollo
  }

  buildQuery(query) {
    return gql `${query}`
  }
  
  static gql(query) {
    return gql `${query}`
  }
}

export default BaseService
