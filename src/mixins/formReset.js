export default {
  methods: {
    resetForm () {
      Object.keys(this.fields).forEach((field) => {
        this.fields[field] = ''
      })
    }
  }
}
