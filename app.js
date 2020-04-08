//app.js
App({
  // 当小程序初始化完成时 全局只触发一次
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    //向数组的开头添加一个或更多元素，并返回新的长度。
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    doubanBase: "https://api.douban.com",//https://api.douban.com,代理： https://douban.uieee.com
  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function() {

  },
  //当小程序从前台进入后台，会触发 onHid
  onHide: function() {
    //初始化 云数据库
    const db = wx.cloud.database();
    //对数据表进行插入操作
    // db.collection("表名称").add({
    //   data: {
    //     name: "shadow",
    //     age: 18,
    //   },
    //   success: function(res) { //原生函数
    //     console.log(e)
    //   },
    //   onError: err => { //箭头函数
    //     console.log(err)
    //   }
    // })
    //两种回调方式
    db.collection("表名称").add({
      data: {
        name: "付小影子",
        age: 18
      }
    }).then(
      res => {
        console.log(res);
      }
    ).catch(err => {
      console.log(err);
    })
    //更新数据表数据
    db.collection("表名称").doc("唯一的字段值id").update({
      data: {
        age: 19
      }
    }).then(res => { //成功回调

    }).catch(err => { //失败回调

    })

    //查询数据表数据
    db.collection("表名称").where({
      data: {
        name: "付小影子"
      }
    }).then(res => { //成功回调

    }).catch(err => { //失败回调

    })

    //删除数据表数据
    db.collection("表名称").doc("唯一的字段值id").remove()
    .then(res => { //成功回调

    }).catch(err => { //失败回调

    })


  },
  //当小程序发生脚本错误，或者 API 调用失败时，会触发 onError 并带上错误信息
  onError: function() {

  }
})