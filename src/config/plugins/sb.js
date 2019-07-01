import sbjs from 'sourcebuster'
import { getCookie } from '@/helpers/cookies'

const SourceBusterPlugin = {
  install (Vue) {
    Vue.prototype.$sbjs = this
  },
  initAndSetData () {
    sbjs.init({
      lifetime: 6,
      sessionLength: 30,
      trafficTypeLast: sbjs.get.current.typ,
      utmSourceLast: sbjs.get.current.src,
      utmMediumLast: sbjs.get.current.mdm,
      utmCampaignLast: sbjs.get.current.cmp,
      utmContentLast: sbjs.get.current.cnt,
      utmTermLast: sbjs.get.current.trm,
      visitcountLast: sbjs.get.udata.vst,
      ipLast: sbjs.get.udata.uip,
      browserLast: sbjs.get.udata.uag,
      timestampVisitLast: sbjs.get.current_add.fd,
      entrancePageLast: sbjs.get.current_add.ep,
      referrerLast: sbjs.get.current_add.rf,
      currentBtag: getCookie('btag') || null,
      trafficTypeFirst: sbjs.get.first.typ,
      utmSourceFirst: sbjs.get.first.src,
      utmMediumFirst: sbjs.get.first.mdm,
      utmCampaignFirst: sbjs.get.first.cmp,
      utmTermFirst: sbjs.get.first.trm,
      timestampVisitFirst: sbjs.get.first_add.fd,
      entrancePageFirst: sbjs.get.first_add.ep,
      referrerFirst: sbjs.get.first_add.rf,
      gaClientID: getCookie('_ga').substring('GA1.1.'.length) || null
    })
  }
}

export default SourceBusterPlugin
