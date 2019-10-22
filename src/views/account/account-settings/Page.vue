<template>
  <div>
    <settings-header/>
    <b-list-group
      v-for="category in categories"
      :key="category.id">
      <b-row no-gutters>
        <b-col class="px-md-0 px-3 py-4 mt-4 mt-md-0">
          <span class="font-weight-bold letter-spacing-2 mb-2">
            {{ category.title }}
          </span>
        </b-col>
      </b-row>
      <b-list-group-item
        v-for="item in category.items"
        :key="item.id"
        class="p-0 bg-arc-clr-soil-light border-0">
        <b-row
          class="py-2 px-md-0 pl-3 pr-4"
          no-gutters>
          <b-col>
            <b-row no-gutters>
              <b-col>
                <label
                  :for="`checkbox-${item.id}`"
                  class="mb-0 pointer">
                  {{ item.title }}
                </label>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col>
                <label
                  :for="`checkbox-${item.id}`"
                  class="font-size-14 letter-spacing-2 text-arc-clr-iron mb-0 pointer">
                  {{ item.description }}
                </label>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="auto d-flex align-items-center">
            <b-form-checkbox
              :id="`checkbox-${item.id}`"
              v-model="checked"
              class="arc-switch"
              switch
              @input="saveLocalStorage"/>
          </b-col>
        </b-row>
        <arc-separator class="mt-4 mb-0"/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import SettingsHeader from '@/views/account/account-settings/SettingsHeader'

export default {
  components: {
    SettingsHeader
  },
  data () {
    return {
      checked: false,
      categories: [{
        title: 'Mobile settings',
        id: 1,
        items: [
          {
            id: 1,
            name: 'livechat_bubble',
            title: 'LiveChat bubble',
            description: 'Switch off visibility of LiveChat bubble'
          }
        ]
      }],
    }
  },
  mounted () {
    this.loadLocalStorage()
  },
  methods: {
    saveLocalStorage () {
      localStorage.setItem('livechat_visible', JSON.stringify(this.checked))
      if (!this.checked && this.isMobile) {
        this.$livechat.hideWidget()
      } else {
        this.$livechat.showWidget()
      }
    },
    loadLocalStorage () {
      if (localStorage.getItem('livechat_visible')) {
        this.checked = JSON.parse(localStorage.getItem('livechat_visible'))
      }
    }
  }
}
</script>
