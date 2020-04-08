// pages/movies/search/searchMovie.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    hasContainer: false,
    inputValue: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
   * 搜索按钮点击事件处理
   */
  onSearchConfirm(event) {

  },
  /**
   * 输入框监听
   */
  onBindInput(event) {
    var inputValue = event.detail.value;
    console.log("输入框内容：" + inputValue);
    this.setData({
      hasContainer: inputValue.length > 0,
      inputValue: inputValue
    })
  },
  /**
   * 清空输入框内容
   */
  clearInput() {
    this.setData({
      hasContainer: false,
      inputValue: ""
    })
  },
  /**
   * 点击搜索按钮
   * https://douban.uieee.com/v2/movie/search?q=神秘巨星&start=0&count=10
   */
  searchMovie() {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.inputValue)
    //var requestUrl = "https://douban.uieee.com" + "/v2/movie/search" + "?apikey=0df993c66c0c636e29ecbb5344252a4a&q=" + this.data.inputValue;
    //豆瓣搜索api封了，暂时用 获取即将上映电影 api
    var requestUrl ="http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=50"
    util.http(requestUrl, this.processDoubanData);
  },

  onSearchConfirm(){
   this.searchMovie();
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
    wx.hideLoading();
    this.setData({
      movies: this.data.movies.concat(movies)
    });
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