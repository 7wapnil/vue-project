<template>
  <b-row
    class="my-4 mt-md-0"
    no-gutters>
    <b-col
      cols="auto"
      class="p-4 d-flex justify-content-center align-items-center">
      <arc-circle
        :size="100"
        class="pt-2">
        <b-img
          :src="require(`@/assets/images/account/user-shadow.svg`)"
          rounded="circle"
          width="85"/>
      </arc-circle>
    </b-col>
    <b-col class="p-4">
      <b-row
        class="mb-4 mb-md-0"
        no-gutters>
        <b-col>
          <h3 class="font-weight-light">
            {{ user.firstName }} {{ user.lastName }}
          </h3>
        </b-col>
      </b-row>

      <b-row
        no-gutters>
        <b-col>
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0 mr-2">
            {{ $t('account.accountInfo.email') }}:
          </span>
          <strong class="mb-0 text-arc-clr-iron-light font-size-14 letter-spacing-2">
            {{ user.email }}
          </strong>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col class="text-truncate">
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0 mr-2">
            {{ $t('account.accountInfo.username') }}:
          </span>
          <strong class="mb-0 text-arc-clr-iron-light font-size-14 letter-spacing-2">
            {{ user.username }}
          </strong>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
