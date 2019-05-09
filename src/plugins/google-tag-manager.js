const GTMPlugin = {
  install (Vue, options) {
    if (!this.hasScript()) {
      this.loadScript(options.id)
      this.loadNoScript(options.id)
    }
    Vue.prototype.$gtm = window.dataLayer
    Vue.$gtm = window.dataLayer
  },
  loadScript (id) {
    const win = window
    const doc = document
    const script = doc.createElement('script')
    const dl = 'dataLayer'

    win[dl] = win[dl] || []

    win[dl].push({
      event: 'gtm.js',
      'gtm.start': new Date().getTime()
    })

    if (!id) {
      return
    }

    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`

    doc.head.appendChild(script)
  },
  loadNoScript (id) {
    const doc = document
    const noscript = doc.createElement('noscript')
    const iframe = doc.createElement('iframe')

    if (!id) {
      return
    }

    iframe.src = `https://www.googletagmanager.com/ns.html?id=${id}`
    iframe.style = 'display: none;visibility:hidden'
    iframe.width = 0
    iframe.height = 0

    noscript.appendChild(iframe)
    doc.body.appendChild(noscript)
  },
  hasScript () {
    const checkArray = document.getElementsByTagName('script')
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i].src.includes('googletagmanager')) return true
    }
    return false
  }
}

export default GTMPlugin
