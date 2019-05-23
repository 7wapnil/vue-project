<template>
  <b-form
    @submit.prevent="submit">
    <b-form-group>
      <b-form-input
        id="reset-new-password"
        v-model="form.password"
        type="password"
        placeholder="Password"/>
    </b-form-group>
    <b-form-group>
      <b-form-input
        id="reset-password-confirmation"
        v-model="form.confirmation"
        type="password"
        placeholder="Repeat password"/>
    </b-form-group>
    <b-button
      :disabled="false"
      class="mb-3"
      type="submit"
      variant="user-profile-button"
      block>
      Reset
    </b-button>
  </b-form>
</template>

<script>
import { Form } from '@/helpers'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      feedback: '',
      form: new Form({
        password: '',
        confirmation: ''
      }),
      submitting: false
    }
  },
  computed: {
    token () {
      return this.$route.query.token || null
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    submit () {
      this.form.clearErrors()
      this.submitting = true
      console.log(this.form.values())
      this.resetPassword(...this.form.values())
        .then(({ data }) => {
          console.log(data)
        })
    }
  }
}
</script>
