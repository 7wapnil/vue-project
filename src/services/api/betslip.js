import BaseService from './base-service'

class BetslipService extends BaseService {
  constructor (vm) {
    super(vm)

    this.responseStructure = `
      id
      status
      message
      odd {
        id
      }
    `
  }

  place (bets) {
    return this.client.mutate({
      mutation: this.buildQuery(`
        mutation placeBets($bets: [BetInput]) {
          placeBets(bets: $bets) {
            ${this.responseStructure}
          }
        }
      `),
      variables: { bets }
    })
  }
}

export default BetslipService
