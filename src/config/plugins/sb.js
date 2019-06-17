import sbjs from 'sourcebuster'

const sourceBusterPlugin = {
  install (Vue) {
    Vue.$sbjs = sbjs
    Vue.prototype.$sbjs = sbjs
  }
}

export default sourceBusterPlugin
