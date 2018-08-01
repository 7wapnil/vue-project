import BaseService from './base-service'

class EventsService extends BaseService {

  constructor(vm) {
    super(vm)

    this.fields = `
      id
      name
      description
      title_name
      start_at
      end_at
      markets {
        id
        name
        priority
        odds {
          id
          name
          value
        }
      }
    `
  }

  load(prop = 'events') {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery(prop, {
        query: this.buildQuery(`
          query {
            events {
              ${this.fields}
            }
          }
        `),
        result: resolve,
        error: reject
      })
    })
  }
}

export default EventsService
