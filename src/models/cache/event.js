import Base from './base'
import EventState from './event_state'

export default class Event extends Base {
  assignAssociations (attributes) {
    if (attributes['state']) {
      this['state'] = new EventState(attributes['state'])
    }
  }
}
