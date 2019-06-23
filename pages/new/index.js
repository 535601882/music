// new/inex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //新歌榜
    total:0,   //歌曲条数
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: 'http://m.kugou.com/?json=true', 
      method:'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200){
          _this.setData(
            { 
              list: res.data.data, //新歌榜
              total: res.data.data.length,//新歌榜长度
              banner: res.data.banner//新歌榜bannner
            }
          )
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