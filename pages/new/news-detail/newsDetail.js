// pages/new/news-detail/newsDetail.js
var newsList = require("../../../data/posts-data.js");
var collectKey = "news-collection"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentNewId: '',
    isPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var newsId = options.id;
    var newsDetail = newsList.postList[newsId];
    console.log(newsDetail);
    //当没有异步操作的时候，可以通过this.data.变量名进行赋值。
    //如果有异步操作，必须通过this.setData(object,回调)进行赋值
    //this.data.newsDetail = newsDetail;
    this.setData({
      newsDetail: newsDetail,
      currentNewId: newsId
    })

    //利用本地缓存 保存收藏状态（收藏状态用对象形式保存）
    /**
     * {
     *  1:true,
     *  2:false
     * }
     */
    var collectionObj = wx.getStorageSync(collectKey);
    if (collectionObj) { //判断对象是否存在
      var newsCollect = collectionObj[newsId]; //根据newsId获取属性值
      this.setData({ //更新渲染层
        collect: newsCollect,
      })
    } else { //创建新的对象
      var collObj = {};
      collObj[newsId] = false; //设置对象字段
      wx.setStorageSync(collectKey, collObj) //保存对象到本地缓存
    }
  },

  /**
   * 按钮点击事件处理
   */
  onCollectionTap: function(event) {
    console.log("hello shadow");
    var collectObj = wx.getStorageSync(collectKey);
    var collect = collectObj[this.data.currentNewId];
    collect = !collect;
    collectObj[this.data.currentNewId] = collect;
    wx.setStorageSync(collectKey, collectObj);
    this.setData({
      collect: collect,
    })
    wx.showToast({
      title: collect ? '收藏成功' : '取消成功',
    })
  },

  /**
   * 分享按钮点击事件处理
   */
  onShareTap: function(event) {
    console.log("啥玩意 点击没反应");
    var itemList = ["分享到微信", "分享到微信朋友圈", "分享到QQ", "分享到QQ空间"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#ff00ff",
      success: function(res) {
        wx.showModal({
          title: itemList[res.tapIndex],
          content: '在意这座城市的距离',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#cccccc',
          confirmText: '确定',
          confirmColor: '#00ff00',
          success: function(res) {
            if (res.confirm) {
              console.log("用户点击了确定按钮");
            } else if (res.cancel) {
              console.log("用户点击了取消按钮");
            }
          },

        })
      }
    })

  },

  /**
   * 点击播放音乐
   */
  onPlayImgTap:function(){
    console.log("点击没反应");
    this.setData({
      isPlay:!this.data.isPlay
    });
    
    var music = newsList.postList[this.data.currentNewId].music;
    if(this.data.isPlay){
      wx.stopBackgroundAudio()
    }else{
     wx.playBackgroundAudio({
       dataUrl: music.url,
       title: music.title,
       coverImgUrl: music.coverImg,
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
 
    }
  }
})