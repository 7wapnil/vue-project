<template>
  <div class="py-5">
    <b-list-group>
      <b-list-group-item
        v-b-toggle="'bonus-' + index"
        v-for="(bonusItem, index) in bonusItems"
        :key="index"
        class="bonus-item bg-arc-clr-soil-light px-0 py-4 border-0">
        <b-row no-gutters>
          <b-col
            cols="auto"
            class="mr-2 d-flex align-items-center">
            <span class="bonus-expand-circle">
              <icon
                name="bonus-chevron-down"
                size="8px"
                color="arc-clr-iron"/>
            </span>
          </b-col>
          <b-col>
            <span class="bonus-item-name text-arc-clr-gold font-weight-bold letter-spacing-2">
              {{ bonusItem.name }}
            </span><br>
            <span
              style="line-height: 18px"
              class="font-size-14 text-arc-clr-iron letter-spacing-2">
              {{ bonusItem.status }}
            </span>
          </b-col>
          <b-col class="text-right d-flex justify-content-end align-items-center">
            <b-button
              variant="arc-secondary"
              class="font-weight-bold text-arc-clr-iron font-size-14 letter-spacing-2">
              {{ bonusItem.overallStatus }}
            </b-button>
          </b-col>
        </b-row>
        <b-collapse
          :id="`${'bonus-' + index}`"
          accordion="bonus-accordion">
          <p class="px-5 py-4 mb-0 mt-2 text-arc-clr-iron letter-spacing-2">
            What do motivational thoughts do? They help you take action.
            This isn’t about positive thinking or motivating quotes.
            Those have their place in shaping your attitude and thinking.
            However, what motivates each of us is unique, so you need to have your own thoughts
            – those which are most effective at getting you going.
          </p>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: {
    bonusItems: {
      type: Array,
      required: true
    }
  }
}
</script>
