// pages/rank/info/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    info:{},
    total:0,
    rankid:null, //列表id
    page:1,
    size:400
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({ rankid: options.rankid })

    wx.request({
      url: app.globalData.domain +'/rank/info/',
      data:{
        rankid: _this.data.rankid,
        page: _this.data.page,
        json:true
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData({ 
            list: res.data.songs.list, 
            total: res.data.songs.total ,
            info:res.data.info
            })
            // 设置title
          app.setTitle(res.data.info.rankname)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})