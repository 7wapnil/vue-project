<template>
  <div>
    <h3>Event cards</h3>

    <b-row
      no-gutters
      class="py-4 pl-4 pr-0">
      <b-col class="text-left d-inline-flex align-items-center">
        <icon
          class="pl-2 pr-3"
          name="event-list-demo"
          size="24px"/>
        <h4 class="m-0 font-weight-light">
          Football
        </h4>
      </b-col>
      <b-col class="text-right">
        <small class="mr-2">
          1 event starts in 20min
        </small>

        <b-button
          variant="arc-secondary"
          class="ml-4 d-inline-flex align-items-center">
          Football
          <icon
            class="pl-4"
            name="arrow-right"
            size="12px"/>
        </b-button>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <h6 class="text-arc-clr-gold pl-4">
          Europe Premier League
        </h6>
      </b-col>
    </b-row>
  </div>
</template>
