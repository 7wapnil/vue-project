<template>
  <div class="row align-items-end">
    <div class="col">
      <div class="row">
        <div class="col">
          <p class="card-text font-weight-bold">{{ event.title_name }}</p>
        </div>
        <div class="col">
          <p class="card-text">{{ event.start_at | dateFormat }}</p>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    dateFormat (date) {
      return moment(date).format('MMMM DD HH:mm')
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
