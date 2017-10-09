// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
  data:{
    maskHidden:true,
    imagePath:'',
    placeholder:'',//默认二维码生成文本
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
    

  },

  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //适配不同屏幕大小的canvas

  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log("********"+tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  formSubmit: function (e) {
    var that = this;
    var url = e.detail.value.url;
    that.setData({
      maskHidden: false,
    });

    wx.navigateTo({
      url: '/pages/img/index'
    });
    wx.showLoading({
      title: '生成中……',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    var st = setTimeout(function () {
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url, "mycanvas", size.w, size.h);
      that.setData({
        maskHidden: true
      });
      clearTimeout(st);
    }, 2000)

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'QR二维码',
      path: '/pages/main/index',
      imageUrl: '/images/logo.png'
    }
  },

listenerChooseImage: function (e) {
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log(data);
            wx.showModal({
              title: '提示',
              content: '保存成功',
              showCancel:false,
              confirmText:'确认',
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });

  },

previewImg: function (e) {
  wx.canvasToTempFilePath({
    canvasId: 'mycanvas',
    success: function (res) {
      var tempFilePath = res.tempFilePath;
      wx.previewImage({
        current: tempFilePath, // 当前显示图片的http链接
        urls: [tempFilePath] // 需要预览的图片http链接列表
      })
    },
    fail: function (res) {
      console.log(res);
    }
  });

},
listenerback:function(e){
  wx.reLaunch({
    url: '/pages/main/index'
  })
},
})

