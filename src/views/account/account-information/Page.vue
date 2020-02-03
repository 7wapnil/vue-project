<template>
  <div v-if="user">
    <user-information-section :user="user"/>
    <div role="tablist">
      <b-card
        v-for="(item, index) in items"
        :class="`account-item bg-arc-clr-soil-light px-0 border-0 ${isMobile ? 'mobile' : ''}`"
        :key="index"
        no-body>
        <b-card-header
          v-b-toggle="item.id"
          header-tag="header"
          class="bg-transparent py-4"
          role="tab">
          <item-header :item="item"/>
        </b-card-header>
        <b-collapse
          :id="item.id"
          :visible="item.id === '1'"
          accordion="user-information"
          role="tabpanel">
          <b-card-body class="p-4">
            <component
              :is="item.component"
              :user="user"/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { USER_QUERY } from '@/graphql/index'
import ItemHeader from '@/views/account/account-information/ItemHeader'
import UserInformationSection from '@/views/account/account-information/UserInformation'
import PrivateDataSection from '@/views/account/account-information/PrivateData'
import PasswordChangeSection from '@/views/account/account-information/ChangePassword'
import AddressSection from '@/views/account/account-information/Address'

export default {
  components: {
    ItemHeader,
    UserInformationSection,
    PasswordChangeSection,
    PrivateDataSection,
    AddressSection
  },
  data () {
    return {
      user: null,
      items: [
        {
          id: '1',
          name: 'account.accountInfo.privateData',
          component: 'private-data-section'
        },
        {
          id: '2',
          name: 'account.accountInfo.addressAndPhone',
          component: 'address-section'
        },
        {
          id: '3',
          name: 'account.accountInfo.changePassword',
          component: 'password-change-section'
        }
      ]
    }
  },
  apollo: {
    user () {
      return {
        query: USER_QUERY,
      }
    }
  }
}
</script>
