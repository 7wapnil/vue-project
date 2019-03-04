<template>
  <div>
    <b-row no-gutters>
      <b-col class="pt-4 pb-5">
        <span class="text-arc-clr-iron">
          Debit/Credit Card withdrawals come with a 0% withdrawal fee
        </span>
      </b-col>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="amount"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Amount:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="amount"
          class="ml-4 w-50"
          type="number"/>
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
          for="card_number"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Card number:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="card_number"
          class="ml-4"
          type="number"/>
      </b-col>
      <b-col/>
    </b-row>

    <b-row
      class="mb-4"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="card-holder"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Name on card:
        </label>
      </b-col>
      <b-col class="user-profile-form">
        <b-form-input
          id="card-holder"
          class="ml-4"/>
      </b-col>
      <b-col/>
    </b-row>
    <b-row
      class="mb-3"
      no-gutters>
      <b-col class="text-md-right text-sm-left align-self-center">
        <label
          for="card_date"
          class="text-arc-clr-iron font-size-14 letter-spacing-2 mb-0">
          Card expiration date:
        </label>
      </b-col>
      <b-col class="user-profile-form-select">
        <b-row
          class="ml-4 h-100"
          no-gutters>
          <b-col cols="3">
            <b-form-select
              id="card_date"
              :options="[{text: 'MM'}]"
              class="h-100"
              type="date"/>
          </b-col>
          <b-col cols="3">
            <b-form-select
              :options="[{text: 'YYYY'}]"
              class="h-100 ml-2"
              type="date"/>
          </b-col>
          <b-col/>
        </b-row>
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
