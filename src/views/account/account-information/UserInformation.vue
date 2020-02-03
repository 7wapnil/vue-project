<template>
  <b-row
    no-gutters>
    <b-col
      class="px-4 pt-5 p-md-4 pb-0 mb-md-4 d-flex align-items-center justify-content-center"
      md="auto"
      cols="12">
      <arc-circle
        :size="100"
        class="pt-2">
        <b-img
          :src="require(`@/assets/images/account/user-shadow.svg`)"
          rounded="circle"
          width="85"/>
      </arc-circle>
    </b-col>
    <b-col
      cols="12"
      md="8"
      class="p-4">
      <b-row
        class="mb-2 mb-md-0"
        no-gutters>
        <b-col class="text-center text-md-left">
          <h3 class="font-weight-light">
            {{ user.firstName }} {{ user.lastName }}
          </h3>
        </b-col>
      </b-row>

      <b-row
        no-gutters>
        <b-col
          cols="3"
          md="auto"
          class="text-right text-md-left">
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            {{ $t('account.accountInfo.email') }}:
          </span>
        </b-col>
        <b-col class="pl-4 pl-md-2 text-truncate">
          <strong class="mb-0 text-arc-clr-iron-light font-size-14 letter-spacing-2">
            {{ user.email }}
          </strong>
        </b-col>
      </b-row>

      <b-row no-gutters>
        <b-col
          cols="3"
          md="auto"
          class="text-right text-md-left">
          <span class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
            {{ $t('account.accountInfo.username') }}:
          </span>
        </b-col>
        <b-col class="pl-4 pl-md-2 text-truncate">
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
