import BaseService from './base-service'

export const LIST_QUERY = BaseService.gql(`
  query eventList ($priority: Int) {
      events {
        id
        name
        description
        title_name
        start_at
        end_at
        markets (priority: $priority, limit: 1) {
          id
          name
          priority
          status
          odds {
            id
            name
            value
            status
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
          status
          odds {
            id
            name
            value
            status
          }
        }
      }
    }
`)

class EventsService extends BaseService {
  load (variables = {}, prop = 'events') {
    return new Promise((resolve, reject) => {
      this.client.addSmartQuery(prop, {
        query: LIST_QUERY,
        variables,
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
