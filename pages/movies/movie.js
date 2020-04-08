// pages/movies/movie.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3&apikey=0df993c66c0c636e29ecbb5344252a4a";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3&apikey=0df993c66c0c636e29ecbb5344252a4a";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3&apikey=0df993c66c0c636e29ecbb5344252a4a";


    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  /**
   * 请求数据
   */
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
        //console.log(res)
      },
      fail: function(error) {
        // fail
        console.log(error)
      }
    })
  },

  /**
   * 解析数据
   */
  processDoubanData: function(moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars, "../../images/icon/star.png", "../../images/icon/none-star.png"),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }

    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },

  /**
   * 跳转 更多界面
   */
  showMoreMoview(event) {
    var categoryTitle = event.currentTarget.dataset.type
    var path = "more-movie/moreMovie?categoryTitle=" + categoryTitle;
    wx.navigateTo({
      url: path,
    })
  },
  /**
   * 搜索电影
   */
  searchMovie(event){
    wx.navigateTo({
      url: 'search/searchMovie',
    })
  },
  /**
   * 跳转电影详情
   */
  toDetail(event){
    var movieId = event.currentTarget.dataset.movieid
    var path = "detail/movieDetail?movieId=" + movieId;
    wx.navigateTo({
      url: path,
    })
  }

})