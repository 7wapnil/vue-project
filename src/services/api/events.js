import BaseService from './base-service'

export const LIST_QUERY = BaseService.gql(`
  query eventList {
      events {
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
      }
    }
`)

export const EVENT_QUERY = BaseService.gql(`
  query event($id: ID!) {
      event (id: $id) {
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
      }
    }
`)

class EventsService extends BaseService {
  load (prop = 'events') {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery(prop, {
        query: LIST_QUERY,
        result: resolve,
        error: reject
      })
    })
  }

  loadById (id) {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery('event', {
        query: EVENT_QUERY,
        variables: { id },
        result: resolve,
        error: reject
      })
    })
  }
}

export default EventsService
