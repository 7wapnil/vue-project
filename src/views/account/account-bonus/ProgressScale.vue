<template>
  <div class="px-4 px-md-0 my-md-4 mt-0 mb-4">
    <span
      :style="`${'left:' + value + '%' }`"
      class="arc-bonus-progress-bar-tooltip">
      {{ value + '%' }}
    </span>
    <b-row no-gutters>
      <b-col
        cols="auto"
        class="font-size-12 progress-scale-percent text-arc-clr-soil-darker font-weight-bold my-1 d-inline-flex align-items-center mr-1">
        0
      </b-col>
      <b-col
        v-for="(point, index) in points"
        :key="index"
        class="text-right mb-1 progress-scale-percent">
        <small class="text-arc-clr-soil-darker font-weight-bold">
          {{ point + '%' }}
        </small>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        v-for="index in points.length"
        :key="index"
        class="progress-scale"/>
    </b-row>
    <b-progress
      :value="value"
      class="arc-bonus-progress-bar"
      height="16px"/>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      points: [20, 40, 60, 80, 100]
    }
  }
}
</script>
