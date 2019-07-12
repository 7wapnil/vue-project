<template>
  <div>
    <verification-status :user="user"/>
    <disclaimer-section/>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="py-4 px-4 px-md-0 verification-card">
      <b-row no-gutters>
        <b-col class="d-flex align-items-center">
          <label
            :for="item.name"
            class="m-0 font-weight-light font-size-21 letter-spacing-2 text-arc-clr-white w-100 pointer">
            {{ item.label }}
          </label>
          <b-form-invalid-feedback
            class="m-0"
            force-show>
            {{ item.error }}
          </b-form-invalid-feedback>
        </b-col>

        <b-col
          cols="auto"
          class="d-flex align-items-center justify-content-end">
          <label
            class="btn-arc-secondary m-0 py-2 px-4 text-arc-clr-iron-light letter-spacing-2">
            {{ $t('account.accountVerification.cta.chooseFile') }}
            <b-form-file
              v-model="item.file"
              :state="item.error.length === 0 ? null : false"
              :id="item.name"
              :name="item.name"
              :accept="item.accept"
              hidden
              @input="onFileUpdate(item)"/>
          </label>
        </b-col>
      </b-row>
      <uploaded-item
        :item="item"
        @item-removed="removeItem"/>
    </div>
    <upload-button-section
      :is-submit-enabled="Boolean(isSubmitEnabled)"
      @files-submited="submitFiles"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { DOCUMENTS_QUERY, DELETE_FILE, USER_VERIFICATION_QUERY } from '@/graphql/index'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import VerificationStatus from '@/views/account/account-verification/VerificationStatus'
import DisclaimerSection from '@/views/account/account-verification/DisclaimerSection'
import UploadedItem from '@/views/account/account-verification/UploadedItem'
import UploadButtonSection from '@/views/account/account-verification/UploadButtonSection'

export default {
  components: {
    VerificationStatus,
    DisclaimerSection,
    UploadedItem,
    UploadButtonSection
  },
  data () {
    return {
      items: [{
        id: null,
        name: 'personal_id',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: this.$t('account.accountVerification.kinds.passport'),
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'utility_bill',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: this.$t('account.accountVerification.kinds.bill'),
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'bank_statement',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: this.$t('account.accountVerification.kinds.bank'),
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'credit_card',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: this.$t('account.accountVerification.kinds.card'),
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'other_document',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: this.$t('account.accountVerification.kinds.other'),
        file: null,
        error: ''
      }],
      maxTypeSizes: {
        'image/jpeg': 2097152,
        'application/pdf': 2097152
      },
      documents: [],
      fileSendActive: false,
      user: null,
    }
  },
  computed: {
    ...mapGetters([
      'getToken'
    ]),
    isSubmitEnabled () {
      const haveFilesToUpload = this.items.find(item => item.file && !item.id)
      const haveNoErrors = !this.items.find(item => item.error)
      return haveFilesToUpload && haveNoErrors && !this.fileSendActive
    }
  },
  apollo: {
    documents () {
      return {
        query: DOCUMENTS_QUERY,
        result: this.mergeWithItems,
        fetchPolicy: NETWORK_ONLY
      }
    },
    user () {
      return {
        query: USER_VERIFICATION_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  },
  methods: {
    mergeWithItems () {
      this.documents.forEach((doc) => {
        const item = this.items.find(item => item.name === doc.kind)
        if (item) {
          item.id = doc.id
          item.file = { name: doc.filename }
          item.status = doc.status
        }
      })
    },
    submitFiles () {
      this.fileSendActive = true
      let formData = new FormData()
      this.items.forEach((item) => {
        if (item.file && !item.id) {
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
        .catch(() => {
          this.$noty.error('Something went wrong')
        })
        .finally(() => {
          this.fileSendActive = false
        })
    },
    handleResult ({ data }) {
      if (data.success) {
        this.$noty.success('Your files has been submitted successfully')
      } else {
        if (Array.isArray(data.message)) {
          data.message.forEach((message) => {
            this.$noty.error(message)
          })
        } else {
          this.$noty.error(data.message)
        }
      }
      this.refetch()
    },
    onFileUpdate (item) {
      item.id = null
      const filledItems = this.items.filter(item => Boolean(item.file))
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
    },
    refetch () {
      return this.$apollo.queries.documents.refetch()
    },
    removeItem (item) {
      if (item.id === null) {
        item.file = null
        item.error = ''
        return
      }
      item.file = null
      this.$apollo.mutate({
        mutation: DELETE_FILE,
        variables: {
          id: item.id
        }
      }).then(() => {
        this.refetch()
      }).catch(this.$log.error)
    }
  }
}
</script>
