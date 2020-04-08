const order = ['demo1', 'demo2', 'demo3']

Page({
  onShareAppMessage() {
    console.log("onShareAppMessage")
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },

  data: {
    toView: 'green'
  },

  upper(e) {
    console.log("upper")
    console.log(e)
  },

  lower(e) {
    console.log("lower")
    console.log(e)
  },

  scroll(e) {
    console.log("scroll")
    console.log(e)
  },

  scrollToTop() {
    console.log("scrollToTop")
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    console.log("tap")
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    console.log("tapMove")
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})
