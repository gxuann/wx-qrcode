// app.js
App({
  onLaunch: function () {
    require('./sdk-v1.1.1')

    let clientId = '3340784c73954a8d1c2b' // 从 baas 后台获取

    // initialize
    wx.BaaS.init(clientId)

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success () {
              console.log('成功')
            },
            fail () {
              console.log('失败')
            }
          })
        }
      }
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb === 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {

    userInfo: null
  }
})
