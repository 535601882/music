// pages/song/index.js
//获取应用实例
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    fileName:'',
    songUrl:'',
    songName:'',
    singerName:'',
    imgUrl:'',
    album_img:'',
    size:400,
    error:"",
    status:false,// 播放状态 true播放中，false 暂停
    // ====================================================

    animationImg: false,    // 歌曲图片旋转 false不转，true转
    conditionAudio: true,   // 歌曲歌词隐藏/显示  true隐藏，false显示
    condition: false,   // 歌曲图片隐藏/显示  true隐藏，false显示
    audioTime: 0,   //进度条 0-100
    audioSeek: 0,   //歌曲时长 00:00.00
    showTimeMax: '00:00',   //歌曲总时长
    showTimeMin: '00:00',    //记录歌曲播放位置时长
    durationIntval: '',    //定时器
    posters: [],    // 存放后台返回的数据
    poster: [],     //存放歌曲(歌名/歌词/歌名id/歌曲图片)
    songLyric: [],  //存放用正则解析后的歌词
    songLyricDate: [],  //存放用正则解析后的歌词时间
    marginTop: 0,   //文稿滚动距离
    currentIndex: 0   //歌词行数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({ id: options.singerid })

    wx.request({
      // url: app.globalData.pc_domain + '/yy/index.php?r=play/getdata&hash=' + _this.data.id,
      url: app.globalData.domain + '/app/i/getSongInfo.php?cmd=playInfo&hash=' + _this.data.id,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.status == 1) {
          _this.setData({
            fileName: res.data.fileName,// 文件名
            songUrl: res.data.url,// 歌曲URL
            songName: res.data.songName,// 歌曲名
            singerName: res.data.singerName,// 歌手名
            imgUrl: res.data.imgUrl, // 歌手封面
            album_img: res.data.album_img,// 专辑封面
            error:''
          })
          app.setTitle(res.data.fileName)
        }else{
          _this.setData({
            error: res.data.error
          })
        }
      }
    })

    // 小程序在手机上常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
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

  },
  initSong(){
    this.setData({
      status: false
    })
    innerAudioContext.src = this.data.songUrl
  },
  // 播放
  audioPlay: function () {
    this.setData({
      status:true
    })
    this.initialization()
    innerAudioContext.play()
  },
  // 暂停
  audioPause: function () {
    this.setData({
      status: false
    })
    innerAudioContext.pause()
  },
  // 回到开头
  audioStart: function (num) {
    this.audioCtx.seek(num ? num:0)
  },
  initialization: function (songId) {
    let _this = this
    innerAudioContext.src = _this.data.songUrl
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onPause(() => {
      console.log('暂停播放')
    })
    // 监听音频播放进度更新事件
    innerAudioContext.onTimeUpdate(() => {
      console.log('监听音频播放进度更新事件')
    });
    // 在歌曲进入可以播放状态时 innerAudioContext.duration 获取歌曲的时长
    // 但获取歌曲时长得在 setTimeout() 里才能获取得到
    innerAudioContext.onCanplay(() => {
      console.log("onCanplay")
      debugger

      innerAudioContext.duration
      setTimeout(() => {
        let duration = innerAudioContext.duration
        let min = parseInt(duration / 60)
        let sev = parseInt(duration % 60)
        if (sev.toString().length == 1) {
          sev = `0${sev}`
        }
        _this.setData({
          showTimeMax: `0${min}:${sev}`
        })
      }, 1000)
    }),
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
  },
})