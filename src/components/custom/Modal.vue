<script>
  import bModal from 'bootstrap-vue/es/components/modal/modal'

  export default {
    extends: bModal,
    props: {
      'hide-footer': {
        default: true
      },
      lazy: {
        default: true
      },
      'header-bg-variant': {
        default: 'primary'
      },
      'header-border-variant': {
        default: 'primary'
      },
      'body-bg-variant': {
        default: 'primary'
      }
    }
  }
</script>
