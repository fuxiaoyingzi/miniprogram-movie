//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
  },
  onLoad: function() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },


  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  audioPlay: function() {
    console.log("audioPlay");
    this.audioCtx.play()
  },
  audioPause: function() {
    console.log("audioPause");
    this.audioCtx.pause()
  },
  audio14: function() {
    console.log("audio14");
    this.audioCtx.seek(14)
  },
  audioStart: function() {
    console.log("audioStart");
    this.audioCtx.seek(0)
  },
  takePhoto: function() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  /**
   * 跳转电影列表
   */
  showMovie(event){
    wx.navigateTo({
      url: '../movies/movie',
    })
  }

})