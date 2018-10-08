<template>
  <b-container>
    <b-row
      v-if="user"
      class="mb-4">
      <b-col>
        <h1>Account status</h1>
      </b-col>
      <b-col class="d-flex align-items-center justify-content-end">
        <span
          :class="[ user.verified ? 'badge-success' : '', 'badge-secondary']"
          class="badge">
          <h5 class="p-1 mb-0">
            {{ user.verified ? 'Verified' : 'Not Verified' }}
          </h5>
        </span>
      </b-col>
    </b-row>
    <b-row
      v-for="item in items"
      :key="item.name">
      <b-col
        cols="8"
        class="mb-3">
        <label :for="item.name">
          {{ item.label }}
        </label>
        <b-form-invalid-feedback force-show>
          {{ item.error }}
        </b-form-invalid-feedback>
      </b-col>
      <b-col
        cols="4"
        class="text-right">
        <label
          v-if="!item.file"
          class="btn btn-outline-secondary">
          CHOOSE FILE
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
      <b-col>
        <b-collapse
          id="collapse"
          :visible="Boolean(item.file)"
          class="mb-4">
          <b-card :class="{'bg-danger': item.error}">
            <b-row
              v-if="item.file"
              align-v="center">
              <b-col cols="8">
                {{ item.file.name }}
                <p v-if="!item.id && !item.error">
                  <b-badge variant="secondary">
                    Waiting for upload
                  </b-badge>
                </p>
                <p v-else>
                  <b-badge
                    v-if="!item.error"
                    variant="primary">
                    {{ item.status }}
                  </b-badge>
                </p>
              </b-col>
              <b-col
                cols="4"
                class="text-right">
                <b-link
                  v-if="item.status !== 'confirmed'"
                  @click="removeItem(item)">
                  Remove
                </b-link>
              </b-col>
            </b-row>
          </b-card>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col text-right">
        <b-button
          :disabled="!isSubmitEnabled"
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
import { DOCUMENTS_QUERY, DELETE_FILE, USER_VERIFICATION_QUERY } from '@/graphql/index'

export default {
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
    }
  },
  apollo: {
    documents () {
      return {
        query: DOCUMENTS_QUERY,
        result: this.mergeWithItems,
        fetchPolicy: 'network-only'
      }
    },
    user () {
      return {
        query: USER_VERIFICATION_QUERY,
        fetchPolicy: 'network-only',
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
    },
    handleResult ({ data }) {
      if (data.success) {
        this.$noty.success('Your files has been submitted successfully')
        this.refetch()
          .then(() => {
            this.fileSendActive = false
          })
      } else {
        this.$noty.error(data.message)
        this.fileSendActive = false
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
