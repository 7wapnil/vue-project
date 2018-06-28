export default {
  data() {
    return {
      errors: {}
    }
  },
  methods: {
    clearErrors() {
      this.errors = {}
    },
    getState(field) {
      if (!this.errors[field] || this.errors[field] === null) {
        return null
      }

      return !this.errors[field].length
    },
    handleGraphQLErrors({ graphQLErrors, networkError }) {
      graphQLErrors.forEach((error) => {
        this.$set(this.errors, error.path, error.message)
      })
    }
  }
}
