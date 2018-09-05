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
          :state="item.state"
          :id="item.id"
          :name="item.name"
          :accept="item.accept"
          :placeholder="placeholder"
          class="mb-3"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col">
        <b-button @click="submitFiles">
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
        file: null
      },
      {
        id: 'utility-bill',
        name: 'utility_bill',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Utility Bill',
        file: null
      },
      {
        id: 'bank-statement',
        name: 'bank_statement',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Bank statement',
        file: null
      },
      {
        id: 'credit-card',
        name: 'credit_card',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Credit/Debit card',
        file: null
      },
      {
        id: 'other-document',
        name: 'other_document',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Other',
        file: null
      }],
      placeholder: 'Choose a file...'
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

      const url = `${process.env.VUE_APP_SERVER_URL}/customer_attachment_upload`
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': this.getToken
      }

      axios.post(url, formData, { headers })
        .then(this.handleSuccess)
        .catch(this.handleError)
    },
    handleSuccess () {
      this.$noty.success('Your files has been submitted successfully')
      this.items.forEach((item) => {
        item.file = null
      })
    },
    handleError () {
      this.$noty.error('Something went wrong')
    }
  }
}
</script>
