<template>
  <div>
    <verification-status :user="user"/>
    <disclaimer-section/>

    <b-row
      v-for="(item, index) in items"
      :key="index"
      class="h-100 py-4 verification-card"
      no-gutters>
      <b-col
        cols="10"
        class="d-inline-flex align-items-center">
        <label
          :for="item.name"
          class="m-0 font-weight-light font-size-21 letter-spacing-2 text-arc-clr-white w-100">
          {{ item.label }}
        </label>
        <b-form-invalid-feedback
          class="m-0"
          force-show>
          {{ item.error }}
        </b-form-invalid-feedback>
      </b-col>

      <b-col
        cols="2"
        class="d-flex align-items-center justify-content-end">
        <label
          class="btn-arc-secondary m-0 py-2 px-4 text-arc-clr-iron-light letter-spacing-2">
          Choose file
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

      <b-col class="pt-3 pb-4">
        <b-card
          v-if="!!item.file"
          no-body
          class="bg-arc-clr-soil-dark p-0">
          <b-row
            class="p-4"
            no-gutters>
            <b-col class="text-truncate pr-4">
              <span class="font-weight-bold text-arc-clr-white font-size-14 letter-spacing-2">
                {{ item.file.name }}
              </span>
              <span
                v-if="!item.id && !item.error"
                class="font-size-14 text-arc-clr-iron letter-spacing-2 d-flex align-items-center mt-1">
                <arc-circle
                  :bg-color="'arc-clr-iron'"
                  :size="18"
                  class="mr-2"/>
                Waiting for upload
              </span>
              <span
                v-else
                class="d-flex align-items-center mt-1">
                <arc-circle
                  v-if="!item.error"
                  :bg-color="statusColors[item.status]"
                  :size="18"
                  class="mr-2"/>
                <span class="font-size-14 text-arc-clr-iron letter-spacing-2 text-capitalize d-flex align-items-center mt-1">
                  {{ item.status }}
                </span>
              </span>
            </b-col>
            <b-col
              cols="auto"
              class="d-flex align-items-center">
              <b-link
                v-if="item.status !== 'confirmed'"
                class="text-arc-clr-iron-light font-size-14 letter-spacing-1"
                @click="removeItem(item)">
                Remove
              </b-link>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row
      class="pt-4"
      no-gutters>
      <b-col
        v-if="!isSubmitEnabled"
        class="mt-2 letter-spacing-2 text-arc-clr-iron">
        You don’t have any files choosen.<br> Please choose files to upload
      </b-col>
      <b-col class="text-right mt-2">
        <b-button
          :disabled="!isSubmitEnabled"
          variant="user-profile-button"
          @click="submitFiles">
          Upload Files
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { DOCUMENTS_QUERY, DELETE_FILE, USER_VERIFICATION_QUERY } from '@/graphql/index'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import VerificationStatus from './VerificationStatus'
import DisclaimerSection from './DisclaimerSection'

export default {
  components: {
    VerificationStatus,
    DisclaimerSection
  },
  data () {
    return {
      items: [{
        id: null,
        name: 'personal_id',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Passport or Identity card',
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'utility_bill',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Utility Bill',
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'bank_statement',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Bank statement',
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'credit_card',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Credit/Debit card',
        file: null,
        error: ''
      },
      {
        id: null,
        name: 'other_document',
        accept: 'image/jpeg, image/png, image/gif, application/pdf',
        label: 'Other',
        file: null,
        error: ''
      }],
      maxTypeSizes: {
        'image/jpeg': 2000 * 1000
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
    },
    statusColors () {
      return {
        confirmed: 'arc-clr-sport-glow',
        rejected: 'wp-clr-notif-red',
        pending: 'arc-clr-iron'
      }
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
        this.refetch()
      } else {
        this.$noty.error(data.message)
      }
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
