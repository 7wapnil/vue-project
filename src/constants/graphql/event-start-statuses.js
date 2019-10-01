import {
  UPCOMING_FOR_TIME,
  UPCOMING,
  LIVE
} from './event-context'

export { LIVE }
export { UPCOMING }

export const CONTEXT_TO_START_STATUS_MAP = {
  [UPCOMING_FOR_TIME]: UPCOMING,
  [UPCOMING]: UPCOMING,
  [LIVE]: LIVE
}
