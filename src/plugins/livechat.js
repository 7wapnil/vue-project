const LiveChatPlugin = {
  install (Vue, options) {
    if (!window.LC_API) {
      window.__lc = window.__lc || {};
      window.__lc.license = options.license
      window.__lc.group = options.group
      window.__lc.chat_between_groups = options.chatBetweenGroups
      window.__lc.params = options.params
      window.__lc.visitor = options.visitor
      const lc = document.createElement('script')
      lc.type = 'text/javascript'
      lc.async = true
      console.log()
      lc.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(lc, s)
    }
  }
}

export default LiveChatPlugin
