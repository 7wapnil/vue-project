export default {
  sockets: {
    connect() {
      console.log('Socket connected')
      this.socketConnected = true
    },
    disconnect() {
      console.log('Socket disconnected')
      this.socketConnected = false
    }
  },
  data() {
    return {
      socketConnected: false
    }
  }
}
