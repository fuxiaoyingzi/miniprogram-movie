// pages/movies/detail/movieDetail.js
import { Movie } from 'class/Movie.js';
var app = getApp()
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.movieId;
    var requestUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId + "?apikey=0df993c66c0c636e29ecbb5344252a4a"
    var movie = new Movie(requestUrl);
    // var movieData = movie.getMovieData();
    // var that = this;
    // movie.getMovieData(function (movie) {
    //   that.setData({
    //     movie: movie
    //   })
    // })
    //C#、Java、Python lambda
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
 
})