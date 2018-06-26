import BaseService from './base-service'

class AccountService extends BaseService {

  signUp(input) {
    return this.client.mutate({
      mutation: this.buildQuery(`
        mutation($input: RegisterInput!) {
          signUp(input: $input) {
            user {
              id
              email
              username
            }
            token
          }
        }
      `),
      variables: { input }
    })
  }

}

export default AccountService
