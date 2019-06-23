//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 0,//选中tab
    indicatorDots: true,//banner参数
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    json:{
      newList: [],//新歌榜
      rankList: [],//排行榜
      pList: [],//歌单
      singerList: [],//歌手

    },
    banner: [],//新歌banner
    size:400
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 2019年6月21日 23:24:47

    this.loadData()

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 切换Tab
  onChangeTab(event) {
    console.log(event)
    this.setData(
      {
        active: event.detail.index
      }
    )
    this.loadData()
  },
  //动态加载数据
  loadData(){
    switch (this.data.active){
      case 0:
        app.setTitle("新歌榜")
        this.getNew()
        break;
      case 1:
        app.setTitle("排行榜")
        this.getRank()
        break;
      case 2:
        app.setTitle("歌单")
        this.getPlist()
        break;
      case 3:
        app.setTitle("歌手")
        this.getSinger()
        break;
      default:
        app.setTitle("新歌榜")
        this.getNew()
        break;
    }
  },
  // 获取新歌榜
  getNew() {
    let _this = this
    wx.request({
      url: app.globalData.domain+'/?json=true',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData(
            {
              'json.newList': res.data.data, //新歌榜
              banner: res.data.banner//新歌榜bannner
            }
          )
        }
      }
    })
  },
  // 获取排行榜
  getRank(){
    let _this = this
    wx.request({
      url: app.globalData.domain +'/rank/list&json=true',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData({ 'json.rankList': res.data.rank.list})
        }
      }
    })
  },
  // 获取歌单
  getPlist(){
    let _this = this
    wx.request({
      url: app.globalData.domain +'/plist/index&json=true',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData(
            {
              'json.pList': res.data.plist.list.info
            }
          )
        }
      }
    })
  },
  // 获取歌手
  getSinger(){
    let _this = this
    wx.request({
      url: app.globalData.domain +'/singer/class&json=true',
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          _this.setData({ 'json.singerList': res.data.list })
        }
      }
    })
  }
})
