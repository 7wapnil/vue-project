import Base from './base'
import PeriodScore from './period_score'

export default class EventState extends Base {
  assignAssociations (attributes) {
    this['period_scores'] = attributes['period_scores'].map((periodScore) => {
      return new PeriodScore(periodScore)
    })
  }
}
