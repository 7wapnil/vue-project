<template>
  <div>
    <b-row no-gutters>
      <b-col>
        <icon
          :name="tab.icon"
          color="arc-clr-iron"
          size="24px"/>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <span class="font-size-12 text-arc-clr-iron-light line-height-14">
          {{ tab.label }}
        </span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      default () { return {} }
    }
  },
  mounted () {
    this.$emit('rendered')
  }
}
</script>
