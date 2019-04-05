const LiveChatPlugin = {
  install (Vue, options) {
    if (!window.LC_API) {
      window.__lc = window.__lc || {};
      window.__lc.license = options.license
      window.__lc.group = options.group
      window.__lc.chat_between_groups = options.chatBetweenGroups
      Vue.prototype.$livechat = this
    }
  },
  setUser (user) {
    let customVariables = [
      { name: 'username', value: user.username },
      { name: 'name', value: user.first_name + ' ' + user.last_name },
      { name: 'email', value: user.email }
    ]

    if (!window.LC_API) {
      window.__lc.params = customVariables
      window.__lc.visitor = { name: user.first_name + ' ' + user.last_name, email: user.email }
    } else {
      window.LC_API.set_custom_variables(customVariables)
      window.LC_API.set_visitor_name(user.first_name + ' ' + user.last_name)
      window.LC_API.set_visitor_email(user.email)
    }
  },
  initWidget () {
    const lc = document.createElement('script')
    lc.type = 'text/javascript'
    lc.async = true
    lc.src = (document.location.protocol === 'https:' ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(lc, s)
  }
}

export default LiveChatPlugin
