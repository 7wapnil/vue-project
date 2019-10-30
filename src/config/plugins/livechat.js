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
      { name: 'name', value: user.firstName + ' ' + user.lastName },
      { name: 'email', value: user.email }
    ]

    if (!window.LC_API) {
      window.__lc.params = customVariables
      window.__lc.visitor = { name: user.firstName + ' ' + user.lastName, email: user.email }
    } else {
      window.LC_API.set_custom_variables(customVariables)
      window.LC_API.set_visitor_name(user.firstName + ' ' + user.lastName)
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
  },
  hideWidget () {
    window.LC_API.hide_chat_window()
  },
  showWidget () {
    window.LC_API.minimize_chat_window()
  },
  maximizeWidget () {
    window.LC_API.open_chat_window()
  },
  hideWidgetOnPageLoad () {
    window.LC_API = window.LC_API || {}
    let livechatChatStarted = false

    window.LC_API.on_before_load = function () {
      if (window.LC_API.visitor_engaged() === false && livechatChatStarted === false) {
        window.LC_API.hide_chat_window()
      }
    }

    window.LC_API.on_chat_started = function () {
      livechatChatStarted = true
    }
  },
  isHidden () {
    return window.LC_API.chat_window_hidden()
  }
}

export default LiveChatPlugin
