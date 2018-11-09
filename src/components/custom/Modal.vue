<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'

export default {
  extends: bModal,
  props: {
    'hide-footer': {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    'header-bg-variant': {
      type: String,
      default: 'arc-clr-soil-light'
    },
    'header-border-variant': {
      type: String,
      default: 'arc-clr-soil-light'
    },
    'body-bg-variant': {
      type: String,
      default: 'arc-clr-soil-light'
    }
  }
}
</script>
