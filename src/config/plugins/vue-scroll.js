const VueScrollConfig = {
  ops: {
    vuescroll: {
      sizeStrategy: 'number'
    },
    bar: {
      size: '6px',
      opacity: 0.6,
      background: '#5e5e5e',
      onlyShowBarOnScroll: false,
      keepShow: true
    },
    rail: {
      gutterOfSide: '4px',
      gutterOfEnds: '6px'
    },
    scrollPanel: {
      easing: 'easeInCubic'
    }
  }
}

export default VueScrollConfig
