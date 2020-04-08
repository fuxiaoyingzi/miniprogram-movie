var initData = "hello shadow \n hello world";
var extraLine = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: initData
  },

  /**
   * 添加一行书
   */
  add: function(options) {
    extraLine.push("hello new line")
    this.setData({
      text: initData + "\n" + extraLine.join("\n")
    })

  },

  /**
   * 删除一行数据
   */
  remove: function() {
    if (extraLine.length > 0) {
      extraLine.pop();
    }
    this.setData({
      text: initData + "\n" + extraLine.join("\n")
    })
  },

  /**
   * 跳转新界面
   */
  toDetail: function() {
    wx.setStorage({
      key: 'hi',
      data: 'hello shadow!',
    })
    // wx.navigateTo({
    //   url: '/pages/welcome/welcome?name=shadow&age=18',
    // })
    wx.navigateTo({
      url: '/pages/new/newPage',
    })
  }
})