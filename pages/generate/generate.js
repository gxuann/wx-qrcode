// pages/generate/generate.js
import Notify from '../../vantui/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formBindsubmit: function formBindsubmit(e) {
    getApp().globalData.inputData = e.detail.value.detail;
    if (getApp().globalData.inputData == 0) {
      Notify('内容不能为空！');;
    } else {
      wx.navigateTo({
        url: '../img/img'
      });
      wx.vibrateShort();
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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