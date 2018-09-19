<template>
  <div class="row align-items-end">
    <div class="col">
      <div class="row">
        <div class="col">
          <p class="card-text font-weight-bold">{{ event.title_name }}</p>
        </div>
        <div class="col">
          <p class="card-text">{{ fromNow }}</p>
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
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    fromNow () {
      return moment(this.event.start_at).fromNow()
    }
  }
}
</script>
