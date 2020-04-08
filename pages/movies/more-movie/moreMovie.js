// pages/movies/more-movie/moreMovie.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: "",
    movies: [],
    requestUrl: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var categoryTitle = options.categoryTitle;
    this.data.categoryTitle = categoryTitle;
    var requestUrl;
    switch (categoryTitle) {
      case "正在热映":
        requestUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters" + "?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "即将上映":
        requestUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon" + "?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "豆瓣Top250":
        requestUrl = app.globalData.doubanBase +
          "/v2/movie/top250" + "?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
    }
    this.data.requestUrl = requestUrl;
    util.http(requestUrl, this.processDoubanData);
  },

  /**
   * 解析数据
   */
  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars, "../../../images/icon/star.png", "../../../images/icon/none-star.png"),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.setData({
      movies: this.data.movies.concat(movies)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 动态修改标题
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.categoryTitle
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    this.data.movies = [];
    var refreshUrl = this.data.requestUrl + "&start=" + this.data.movies.length + "&count=20";
    util.http(refreshUrl, this.processDoubanData);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showNavigationBarLoading();
    var nextUrl = this.data.requestUrl + "&start=" + this.data.movies.length + "&count=20";
    util.http(nextUrl, this.processDoubanData);
  },

  /**
   * 跳转电影详情
   */
  toDetail(event) {
    var movieId = event.currentTarget.dataset.movieid
    var path = "../detail/movieDetail?movieId=" + movieId;
    wx.navigateTo({
      url: path,
    })
  }

})