'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    img: "",
    $loading: {
      isShow: false
    },
    $toast: {
      show: false
    },
    getUrl: ''
  },
  gen: function gen() {
    var _this = this;

    this.setData({
      $loading: {
        isShow: true
      },
      isDisabled1: true
    });
    setTimeout(function () {
      _this.setData({
        $loading: {
          isShow: false
        },
        isDisabled: false,
        canvasHidden: false
      });
    }, 2000);
    var that = this;
    var gendetail = getApp().globalData.gendetail;
    var getUrl = getApp().globalData.getUrl;
    wx.request({
      url: 'https://qrcode.gxuann.cn/url.php',
      data: {
        '__code__': {
          readme: ''
        },

        detail: gendetail
      },
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function success(res) {
        console.log(getUrl);
        getApp().globalData.getUrl = res.data;
        that.setData({
          getUrl: getApp().globalData.getUrl,
          canvasHidden: true
        });
        wx.vibrateShort();
      },
      fail: function fail(res) {
        that.setData({
          $toast2: {
            show: true
          },
          isDisabled: true
        });
        setTimeout(function () {
          that.setData({
            $toast2: {
              show: false
            }
          });
        }, 20000);
      }
    });
  },

  onLoad: function onLoad(e) {
    var that = this;
    var gendetail = getApp().globalData.gendetail;
    console.log(gendetail);
    this.setData({
      gendetail: gendetail,
      isDisabled: true,
      isDisabled1: false
    });
  },
  previewImg: function previewImg(e) {
    var img = getApp().globalData.getUrl;
    console.log(img);
    wx.previewImage({
      current: 'img',
      urls: [img]
    });
  },
  save: function save(e) {
    var that = this;
    wx.downloadFile({
      url: getApp().globalData.getUrl,
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
          },
          fail: function fail(err) {
            console.log(err);
            wx.showToast({
              title: '保存失败，请删除小程序后重新获得权限',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    });
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'QR二维码',
      path: '/pages/home/index',
      imageUrl: 'https://images.gxuann.cn/qrcode/share.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaW1nIiwiJGxvYWRpbmciLCJpc1Nob3ciLCIkdG9hc3QiLCJzaG93IiwiZ2V0VXJsIiwiZ2VuIiwic2V0RGF0YSIsImlzRGlzYWJsZWQxIiwic2V0VGltZW91dCIsImlzRGlzYWJsZWQiLCJjYW52YXNIaWRkZW4iLCJ0aGF0IiwiZ2VuZGV0YWlsIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImRldGFpbCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidmlicmF0ZVNob3J0IiwiZmFpbCIsIiR0b2FzdDIiLCJvbkxvYWQiLCJlIiwicHJldmlld0ltZyIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwic2F2ZSIsImRvd25sb2FkRmlsZSIsImZpbGVQYXRoIiwidGVtcEZpbGVQYXRoIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZXJyIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFFQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxTQUFJLEVBREE7QUFFSkMsY0FBVTtBQUNOQyxjQUFRO0FBREYsS0FGTjtBQUtKQyxZQUFRO0FBQ05DLFlBQU07QUFEQSxLQUxKO0FBUUpDLFlBQU87QUFSSCxHO0FBVU5DLEssaUJBQU07QUFBQTs7QUFDSixTQUFLQyxPQUFMLENBQWE7QUFDWE4sZ0JBQVU7QUFDUkMsZ0JBQVE7QUFEQSxPQURDO0FBSVhNLG1CQUFZO0FBSkQsS0FBYjtBQU1BQyxlQUFXLFlBQU07QUFDZixZQUFLRixPQUFMLENBQWE7QUFDWE4sa0JBQVU7QUFDUkMsa0JBQVE7QUFEQSxTQURDO0FBSVhRLG9CQUFXLEtBSkE7QUFLWEMsc0JBQWE7QUFMRixPQUFiO0FBT0QsS0FS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ZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbG9hZGluZyc6ICdAbWludWkvd3hjLWxvYWRpbmcnLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGltZzpcIlwiLFxuICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogZmFsc2VcbiAgICB9LFxuICAgICR0b2FzdDoge1xuICAgICAgc2hvdzogZmFsc2VcbiAgICB9LFxuICAgIGdldFVybDonJ1xuICB9LFxuICBnZW4oKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgIGlzU2hvdzogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGlzRGlzYWJsZWQxOnRydWUsXG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBpc0Rpc2FibGVkOmZhbHNlLFxuICAgICAgICBjYW52YXNIaWRkZW46ZmFsc2UsXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBnZW5kZXRhaWwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbDtcbiAgICB2YXIgZ2V0VXJsID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmw7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL3FyY29kZS5neHVhbm4uY24vdXJsLnBocCcsXG4gICAgICBkYXRhOntcbiAgICAgICAgZGV0YWlsOmdlbmRldGFpbFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXI6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGdldFVybClcbiAgICAgICAgZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwgPSByZXMuZGF0YVxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGdldFVybDogZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwsXG4gICAgICAgICAgY2FudmFzSGlkZGVuOnRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIHd4LnZpYnJhdGVTaG9ydCgpXG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAkdG9hc3QyOiB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc0Rpc2FibGVkOnRydWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgJHRvYXN0Mjoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICB9LCAyMDAwMClcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uKGUpe1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBnZW5kZXRhaWwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbFxuICAgIGNvbnNvbGUubG9nKGdlbmRldGFpbCk7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGdlbmRldGFpbDogZ2VuZGV0YWlsLFxuICAgICAgaXNEaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGlzRGlzYWJsZWQxOmZhbHNlLFxuICAgIH0pO1xuICB9LFxuICBwcmV2aWV3SW1nOmZ1bmN0aW9uKGUpe1xuICAgIHZhciBpbWcgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdldFVybDtcbiAgICBjb25zb2xlLmxvZyhpbWcpO1xuICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICBjdXJyZW50OiAnaW1nJyxcbiAgICAgIHVybHM6IFtpbWddXG4gICAgfSlcbiAgfSxcbiAgc2F2ZTogZnVuY3Rpb24oZSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6IGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxuICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5aSx6LSl77yM6K+35Yig6Zmk5bCP56iL5bqP5ZCO6YeN5paw6I635b6X5p2D6ZmQJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHBzOi8vaW1hZ2VzLmd4dWFubi5jbi9xcmNvZGUvc2hhcmUucG5nJ1xuICAgIH1cbiAgfVxufSJdfQ==