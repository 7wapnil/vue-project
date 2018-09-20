<template>
  <b-container>
    <b-row
      v-for="item in items"
      :key="item.id">
      <b-col>
        <label :for="item.id">
          {{ item.label }}
        </label>
        <b-form-file
          v-model="item.file"
          :state="item.error.length === 0 ? null : false"
          :id="item.id"
          :name="item.name"
          :accept="item.accept"
          :placeholder="placeholder"
          class="mb-3"
          @input="onFileUpdate"/>
        <b-form-invalid-feedback force-show>
          {{ item.error }}
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col">
        <b-button
          :disabled="isSubmitDisabled"
          @click="submitFiles">
          Upload Files
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      items: [{
        id: 'personal-id',
        name: 'personal_id',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Passport or Identity card',
        file: null,
        error: ''
      },
      {
        id: 'utility-bill',
        name: 'utility_bill',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Utility Bill',
        file: null,
        error: ''
      },
      {
        id: 'bank-statement',
        name: 'bank_statement',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Bank statement',
        file: null,
        error: ''
      },
      {
        id: 'credit-card',
        name: 'credit_card',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Credit/Debit card',
        file: null,
        error: ''
      },
      {
        id: 'other-document',
        name: 'other_document',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Other',
        file: null,
        error: ''
      }],
      placeholder: 'Choose a file...',
      isSubmitDisabled: true,
      maxTypeSizes: {
        'image/jpeg': 2000 * 1000
      }
    }
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  methods: {
    submitFiles () {
      let formData = new FormData()
      this.items.forEach((item) => {
        if (item.file) {
          formData.append(`attachments[${item.name}]`, item.file)
        }
      })

      const serverDomain = process.env.VUE_APP_SERVER_URL.replace(/\/$/, '')
      const url = `${serverDomain}/customer_attachment_upload`
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': this.getToken
      }

      axios.post(url, formData, { headers })
        .then(this.handleResult)
        .catch(this.handleError)
    },
    handleResult ({ data }) {
      if (data.success) {
        this.handleSuccess()
      } else {
        this.handleError()
      }
    },
    handleSuccess () {
      this.$noty.success('Your files has been submitted successfully')
      this.items.forEach((item) => {
        item.file = null
      })
    },
    handleError () {
      this.$noty.error('Something went wrong')
    },
    onFileUpdate () {
      const filledItems = this.items.filter(item => Boolean(item.file))
      this.isSubmitDisabled = !filledItems.length
      filledItems.forEach((item) => {
        item.error = ''
        const limit = this.maxTypeSizes[item.file.type]
        const size = item.file.size
        if (limit && size > limit) {
          const actual = this.formatFileSize(item.file.size)
          const maximum = this.formatFileSize(limit)
          item.error = `File is too big. Actual size is ${actual}, maximum ${maximum}`
        }
      })
    },
    formatFileSize (size) {
      const metric = Math.floor(Math.log(size) / Math.log(1024))
      return (size / Math.pow(1024, metric)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][metric]
    }
  }
}
</script>
