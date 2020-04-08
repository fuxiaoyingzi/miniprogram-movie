// pages/test/testPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [{
        id: 5,
        unique: "unique_5"
      },
      {
        id: 4,
        unique: "unique_4"
      },
      {
        id: 3,
        unique: "unique_3"
      },
      {
        id: 2,
        unique: "unique_2"
      },
      {
        id: 1,
        unique: "unique_1"
      },
      {
        id: 0,
        unique: "unique_0"
      },

    ],
    numberArray: [1, 2, 3, 4]

  },

  /**
   * 生命周期函数--监听页面加载
   * 通过wx.getStorage/wx.getStorageSync读取本地缓存，
   * 通过wx.setStorage/wx.setStorageSync写数据到缓存，
   * 其中Sync后缀的接口表示是同步接口
   */
  onLoad: function(options) {
    var that = this;
    var list = wx.getStorageSync("list");
    if(list){//如果本地有缓存列表 提前渲染
    that.setData({ //setData（object，callBack）
      list:list
    });
    }
    wx.request({
      url: 'https://test.com.getproductlist',
      success:function(res){
        if(res.statusCode == 200){
          list = res.data.list;
          that.setData({
            list :list,
          })
          wx.setStorageSync("list",list);
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  switch: function(e) {
    console.log("switch")
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })

  },

  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{
      id: length,
      unique: 'unique_' + length
    }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })

  },

  addNumberToFront: function(e) {
    // this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    // this.setData({
    //   numberArray: this.data.numberArray
    // })

    wx.showLoading({
      title: '测试loading 对话框',
    })
  },

  // 模拟 请求网络
  requestNetwork: function() {
    if (hasClick) {
      return;
    }
    hasClick = true;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
        url: 'http://test.com/getinfo',
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {},
        success: function(res) {
          if (res.statusCode === 200) {
            console.log(res.data); //服务器返回的内容
          }
        },
        false: function(res) {
          wx.showToast({
            title: '系统错误',
          })
        },
        complete: function(res) {
          wx.hideLoading();
          hasClick = false;
        },
      }
    )
  }
})
var hasClick = false;