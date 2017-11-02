// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  detail:'',
  email:''
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
  
  },
  formBindsubmit:function(e){
    if(e.detail.value.detail.length == 0 ){
      wx.showModal({
        content: '反馈内容不能为空！',
        showCancel:false,
      })
    }else{
    let tableID = 2991
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()
    product.set('email', e.detail.value.email)
    product.set('detail', e.detail.value.detail)
    product.save().then((res) => { 
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      }),
      this.setData({
        email:'',
        detail:''
      })
    }, (err) => {
      wx.showModal({
        content: '提交失败，请检查网络设置！',
        showCancel: false,
      })
      })
    }
  },
  listenerbackto: function (e) {
    wx.reLaunch({
      url: '/pages/main/index'
    })
  },
})