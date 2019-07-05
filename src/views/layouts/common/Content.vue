<template>
  <component :is="contentType"/>
</template>

<script>
export default {
  computed: {
    contentType () {
      const name = this.isMobile ? 'mobile' : 'desktop'
      return () => import(`../${name}/Content`)
    }
  }
}
</script>
