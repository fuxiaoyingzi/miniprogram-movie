// pages/new/newPage.js
//调用脚本文件
var postData = require("../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ["demo-text-1", "demo-text-2", "demo-text-3"],
    post_content: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      post_content: postData.postList
    })
  },

  /**
   * 跳转详情
   */
  toNewsDetail: function(event) {
    // console.log(event);
    var newsId = event.currentTarget.dataset.newsid;
    // console.log(newsId);
    wx.navigateTo({
      url: '/pages/new/news-detail/newsDetail?id=' + newsId,
    })

  }


})