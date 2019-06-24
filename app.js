//app.js
var mta = require('/lib/mta_analysis.js') 
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 统计
    mta.App.init({
      "appID": this.globalData.appID,
        "eventID": this.globalData.eventID, // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
      "lauchOpts": options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
      "statPullDownFresh": true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statShareApp": true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "statReachBottom": true, // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
      "autoReport": true, //开启自动上报
      "statParam": true, //每个页面均加入参数上报
      "ignoreParams": ["id", "time"] //statParam为true时，如果不想上报的参数可配置忽略
    });

  },
  globalData: {
    userInfo: null,
    domain: 'http://m.kugou.com',//M 接口域名
    pc_domain:'http://www.kugou.com',//PC接口域名
    appID:'500687720',
    eventID:'500687721'
  },
  // 设置title
  setTitle(title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }
})