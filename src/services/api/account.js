import BaseService from './base-service'

class AccountService extends BaseService {

  constructor(vm) {
    super(vm)

    this.authFields = `
      user {
        id
        email
        username
      }
      token
    `
  }

  signIn(input) {
    return this.client.mutate({
      mutation: this.buildQuery(`
        mutation($input: AuthInput!) {
          signIn(input: $input) {
            ${this.authFields}
          }
        }
      `),
      variables: { input }
    })
  }

  signUp(input) {
    return this.client.mutate({
      mutation: this.buildQuery(`
        mutation($input: RegisterInput!) {
          signUp(input: $input) {
            ${this.authFields}
          }
        }
      `),
      variables: { input }
    })
  }
}

export default AccountService
