import AirbrakeClient from 'airbrake-js'

let client = null

const AirbrakePlugin = {
  install (Vue, options) {
    client = new AirbrakeClient({
      projectId: options.projectId,
      host: options.host,
      projectKey: options.projectKey,
      environment: options.environment
    })
    Vue.$airbrake = client
    Vue.prototype.$airbrake = client
  }
}

export default AirbrakePlugin