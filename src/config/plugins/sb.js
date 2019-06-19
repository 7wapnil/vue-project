import sbjs from 'sourcebuster'
import { getCookie } from '@/helpers/cookies'

const SourceBusterPlugin = {
  install (Vue) {
    Vue.prototype.$sbjs = this
  },
  initAndSetData () {
    sbjs.init({
      lifetime: 6,
      session_length: 30,
      traffic_type_last: sbjs.get.current.typ,
      utm_source_last: sbjs.get.current.src,
      utm_medium_last: sbjs.get.current.mdm,
      utm_campaign_last: sbjs.get.current.cmp,
      utm_content_last: sbjs.get.current.cnt,
      utm_term_last: sbjs.get.current.trm,
      visitcount_last: sbjs.get.udata.vst,
      ip_last: sbjs.get.udata.uip,
      browser_last: sbjs.get.udata.uag,
      timestamp_visit_last: sbjs.get.current_add.fd,
      entrance_page_last: sbjs.get.current_add.ep,
      referrer_last: sbjs.get.current_add.rf,
      current_btag: getCookie('btag') || null,
      traffic_type_first: sbjs.get.first.typ,
      utm_source_first: sbjs.get.first.src,
      utm_medium_first: sbjs.get.first.mdm,
      utm_campaign_first: sbjs.get.first.cmp,
      utm_term_first: sbjs.get.first.trm,
      timestamp_visit_first: sbjs.get.first_add.fd,
      entrance_page_first: sbjs.get.first_add.ep,
      referrer_first: sbjs.get.first_add.rf,
      gaClientID: getCookie('_ga').substring('GA1.1.'.length) || null
    })
  }
}

export default SourceBusterPlugin
