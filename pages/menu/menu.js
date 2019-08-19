// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    elements:[
      {
        icon:'qr',
        title:'生成二维码',
        action: 'gen'
      }, 
      {
        icon: 'scan',
        title: '扫描二维码',
        action: 'scan'
      }
    ],
    extraData: {
      id: '31640'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  gen() {
    wx.navigateTo({
      url: '../../pages/generate/generate'
    });
    wx.vibrateShort();
  },
  scan() {
    wx.navigateTo({
      url: '../../pages/scan/scan',
    });
    wx.vibrateShort();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})