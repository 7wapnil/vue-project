<template>
  <div v-if="mainMethod">
    <b-row no-gutters>
      <b-col class="pt-4 pb-5">
        <span class="text-arc-clr-iron">
          {{ descriptionMap[mainMethod.code] }}
        </span>
      </b-col>
    </b-row>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="password"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Amount
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="amount_main"
          step="0.01"
          class="ml-4 text-left w-50"
          type="number"/>
      </b-col>
      <b-col/>
    </b-row>
    <b-row
      v-for="(field, index) in mainMethod.fields"
      :key="index"
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center" >
        <label
          :for="`${field.name}`"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          {{ field.name }}
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          :id="`${field.name}`"
          :type="typeMap[`${field.type}`]"
          class="ml-4 text-left w-75"
        />
      </b-col>
      <b-col/>
    </b-row>
    <b-row no-gutters>
      <b-col
        class="mr-1"
        cols="3"/>
      <b-col class="user-profile-form ml-4">
        <div class="border-top border-arc-clr-soil-cover mb-4"/>
      </b-col>
    </b-row>
    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="password"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Arcanebet password:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="password"
          class="ml-4 text-left w-50"
          type="password"/>
      </b-col>
      <b-col/>
    </b-row>
    <b-row no-gutters>
      <b-col/>
      <b-col class="mt-2 ml-4 user-profile-form">
        <b-button
          class="ml-2 w-50"
          variant="user-profile-button">
          Withdraw
        </b-button>
      </b-col>
      <b-col/>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    defaultMethod: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      typeMap: {
        'float': 'number',
        'string': 'text'
      },
      descriptionMap: {
        'credit_card': 'Debit/Credit Card withdrawals come with a 0% withdrawal fee'
      }
    }
  },
  computed: {
    mainMethod () {
      return this.defaultMethod ? this.defaultMethod : ''
    }
  }
}
</script>
