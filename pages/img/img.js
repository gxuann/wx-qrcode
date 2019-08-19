// pages/img/img.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resData: '',
    imgUrl: '',
    token: '',
    btnText: '保存',
    btnSta: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var inputData = getApp().globalData.inputData;
    var resData = this.data.resData;
    resData = inputData;
    this.setData({ 
      resData: resData
    });
    console.log("resData****"+ resData)
    this.getToken();
    this.checkData();
    wx.vibrateShort();
  },
  getToken() {
    wx.request({
      url: 'https://qrcode.gxuann.cn/getToken.php',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('token', res.data);
      }
    })
  },
  checkData() {
    var resData = this.data.resData;
    var token = wx.getStorageSync('token');
    var btnSta = this.data.btnSta;
    var btnText = this.data.btnText;
    var that = this;
    wx.request({
      url: 'https://qrcode.gxuann.cn/check.php',
      data: {
        resData: resData,
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res) {
        console.log(res)
        if (res.data == 1) {
          that.setData({
            imgUrl: '../../images/err.png',
            btnSta: true
            })
        }else {
          that.setData({
            imgUrl: res.data,
            btnSta: false
          })
        }
      }
    })
  },

  save: function save(e) {
    var that = this;
    var btnSta = this.data.btnSta;
    var btnText = this.data.btnText;
    var imgUrl = this.data.imgUrl;
    wx.downloadFile({
      url: imgUrl,
      success: function success(res) {
        var filePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function success(data) {
            console.log(data);
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
            that.setData({
              btnSta: true,
              btnText: '已保存'
            })
          },
          fail: function fail(err) {
            console.log(err);
            wx.showToast({
              title: '保存失败，请重新获得权限',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    });
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