const VueScrollConfig = {
  ops: {
    vuescroll: {
      sizeStrategy: 'number',
      detectResize: true
    },
    bar: {
      size: '6px',
      opacity: 0.6,
      background: '#5e5e5e',
      onlyShowBarOnScroll: false,
      keepShow: true,
      minSize: 0.2
    },
    rail: {
      gutterOfSide: '4px',
      gutterOfEnds: '3px'
    },
    scrollPanel: {
      easing: 'easeInCubic'
    }
  }
}

export default VueScrollConfig
