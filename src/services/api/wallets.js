import BaseService from './base-service'

class WalletsService extends BaseService {

  constructor(vm) {
    super(vm)
  }

  loadList(fields = '', prop = 'wallets') {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery(prop, {
        query: this.buildQuery(`
          query {
            wallets {
              ${fields}
            }
          }
        `),
        result: resolve,
        error: reject
      })
    })
  }
}

export default WalletsService
