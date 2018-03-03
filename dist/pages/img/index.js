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
        getApp().globalData.getUrl = res.data;
        that.setData({
          getUrl: getApp().globalData.getUrl,
          canvasHidden: true
        });
        console.log(getUrl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaW1nIiwiJGxvYWRpbmciLCJpc1Nob3ciLCIkdG9hc3QiLCJzaG93IiwiZ2V0VXJsIiwiZ2VuIiwic2V0RGF0YSIsImlzRGlzYWJsZWQxIiwic2V0VGltZW91dCIsImlzRGlzYWJsZWQiLCJjYW52YXNIaWRkZW4iLCJ0aGF0IiwiZ2VuZGV0YWlsIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImRldGFpbCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib25Mb2FkIiwiZSIsInByZXZpZXdJbWciLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsInNhdmUiLCJkb3dubG9hZEZpbGUiLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJlcnIiLCJvblNoYXJlQXBwTWVzc2FnZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFNBQUksRUFEQTtBQUVKQyxjQUFVO0FBQ05DLGNBQVE7QUFERixLQUZOO0FBS0pDLFlBQVE7QUFDTkMsWUFBTTtBQURBLEtBTEo7QUFRSkMsWUFBTztBQVJILEc7QUFVTkMsSyxpQkFBTTtBQUFBOztBQUNKLFNBQUtDLE9BQUwsQ0FBYTtBQUNYTixnQkFBVTtBQUNSQyxnQkFBUTtBQURBLE9BREM7QUFJWE0sbUJBQVk7QUFKRCxLQUFiO0FBTUFDLGVBQVcsWUFBTTtBQUNmLFlBQUtGLE9BQUwsQ0FBYTtBQUNYTixrQkFBVTtBQUNSQyxrQkFBUTtBQURBLFNBREM7QUFJWFEsb0JBQVcsS0FKQTtBQUtYQyxzQkFBYTtBQUxGLE9BQWI7QUFPRCxLQVJELEVBUUcsSUFSSDtBQVNBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLFlBQVlDLFNBQVNDLFVBQVQsQ0FBb0JGLFNBQXBDO0FBQ0EsUUFBSVIsU0FBU1MsU0FBU0MsVUFBVCxDQUFvQlYsTUFBakM7QUFDQVcsT0FBR0MsT0FBSCxDQUFXO0FBQ1RDLFdBQUssa0NBREk7QUFFVG5CLFlBQUs7QUFBQTtBQUFBO0FBQUE7O0FBQ0hvQixnQkFBT047QUFESixPQUZJO0FBS1RPLGNBQVEsS0FMQztBQU1UQyxjQUFRLEVBQUUsZ0JBQWdCLG1DQUFsQixFQU5DO0FBT1RDLGVBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QlQsaUJBQVNDLFVBQVQsQ0FBb0JWLE1BQXBCLEdBQTZCa0IsSUFBSXhCLElBQWpDO0FBQ0FhLGFBQUtMLE9BQUwsQ0FBYTtBQUNYRixrQkFBUVMsU0FBU0MsVUFBVCxDQUFvQlYsTUFEakI7QUFFWE0sd0JBQWE7QUFGRixTQUFiO0FBSUFhLGdCQUFRQyxHQUFSLENBQVlwQixNQUFaO0FBQ0Q7QUFkUSxLQUFYO0FBZ0JELEc7O0FBQ0RxQixVQUFRLGdCQUFTQyxDQUFULEVBQVc7QUFDakIsUUFBSWYsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsWUFBWUMsU0FBU0MsVUFBVCxDQUFvQkYsU0FBcEM7QUFDQVcsWUFBUUMsR0FBUixDQUFZWixTQUFaO0FBQ0EsU0FBS04sT0FBTCxDQUFhO0FBQ1hNLGlCQUFXQSxTQURBO0FBRVhILGtCQUFZLElBRkQ7QUFHWEYsbUJBQVk7QUFIRCxLQUFiO0FBS0QsRztBQUNEb0IsY0FBVyxvQkFBU0QsQ0FBVCxFQUFXO0FBQ3BCLFFBQUkzQixNQUFNYyxTQUFTQyxVQUFULENBQW9CVixNQUE5QjtBQUNBbUIsWUFBUUMsR0FBUixDQUFZekIsR0FBWjtBQUNBZ0IsT0FBR2EsWUFBSCxDQUFnQjtBQUNkQyxlQUFTLEtBREs7QUFFZEMsWUFBTSxDQUFDL0IsR0FBRDtBQUZRLEtBQWhCO0FBSUQsRztBQUNEZ0MsUUFBTSxjQUFTTCxDQUFULEVBQVc7QUFDZixRQUFJZixPQUFPLElBQVg7QUFDQUksT0FBR2lCLFlBQUgsQ0FBZ0I7QUFDZGYsV0FBS0osU0FBU0MsVUFBVCxDQUFvQlYsTUFEWDtBQUVkaUIsZUFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCLFlBQUlXLFdBQVdYLElBQUlZLFlBQW5CO0FBQ0FuQixXQUFHb0Isc0JBQUgsQ0FBMEI7QUFDeEJGLG9CQUFVWCxJQUFJWSxZQURVO0FBRXhCYixtQkFBUyxpQkFBVXZCLElBQVYsRUFBZ0I7QUFDdkJ5QixvQkFBUUMsR0FBUixDQUFZMUIsSUFBWjtBQUNBaUIsZUFBR3FCLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxNQURJO0FBRVhDLG9CQUFNLFNBRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0QsV0FUdUI7QUFVeEJDLGdCQUFNLGNBQVVDLEdBQVYsRUFBZTtBQUNuQmxCLG9CQUFRQyxHQUFSLENBQVlpQixHQUFaO0FBQ0ExQixlQUFHcUIsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLG9CQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0Q7QUFqQnVCLFNBQTFCO0FBbUJEO0FBdkJhLEtBQWhCO0FBMEJELEc7QUFDREcscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEwsYUFBTyxPQURGO0FBRUxNLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbmZpZzoge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAnd3hjLWxvYWRpbmcnOiAnQG1pbnVpL3d4Yy1sb2FkaW5nJyxcclxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgaW1nOlwiXCIsXHJcbiAgICAkbG9hZGluZzoge1xyXG4gICAgICAgIGlzU2hvdzogZmFsc2VcclxuICAgIH0sXHJcbiAgICAkdG9hc3Q6IHtcclxuICAgICAgc2hvdzogZmFsc2VcclxuICAgIH0sXHJcbiAgICBnZXRVcmw6JydcclxuICB9LFxyXG4gIGdlbigpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICRsb2FkaW5nOiB7XHJcbiAgICAgICAgaXNTaG93OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGlzRGlzYWJsZWQxOnRydWUsXHJcbiAgICB9KVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgJGxvYWRpbmc6IHtcclxuICAgICAgICAgIGlzU2hvdzogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlzYWJsZWQ6ZmFsc2UsXHJcbiAgICAgICAgY2FudmFzSGlkZGVuOmZhbHNlLFxyXG4gICAgICB9KVxyXG4gICAgfSwgMjAwMClcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHZhciBnZW5kZXRhaWwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbDtcclxuICAgIHZhciBnZXRVcmwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdldFVybDtcclxuICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICB1cmw6ICdodHRwczovL3FyY29kZS5neHVhbm4uY24vdXJsLnBocCcsXHJcbiAgICAgIGRhdGE6e1xyXG4gICAgICAgIGRldGFpbDpnZW5kZXRhaWxcclxuICAgICAgfSxcclxuICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgaGVhZGVyOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9LFxyXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwgPSByZXMuZGF0YVxyXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICBnZXRVcmw6IGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsLFxyXG4gICAgICAgICAgY2FudmFzSGlkZGVuOnRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhnZXRVcmwpXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH0sXHJcbiAgb25Mb2FkOiBmdW5jdGlvbihlKXtcclxuICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgdmFyIGdlbmRldGFpbCA9IGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsXHJcbiAgICBjb25zb2xlLmxvZyhnZW5kZXRhaWwpO1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgZ2VuZGV0YWlsOiBnZW5kZXRhaWwsXHJcbiAgICAgIGlzRGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgIGlzRGlzYWJsZWQxOmZhbHNlLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBwcmV2aWV3SW1nOmZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIGltZyA9IGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsO1xyXG4gICAgY29uc29sZS5sb2coaW1nKTtcclxuICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgIGN1cnJlbnQ6ICdpbWcnLFxyXG4gICAgICB1cmxzOiBbaW1nXVxyXG4gICAgfSlcclxuICB9LFxyXG4gIHNhdmU6IGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgdXJsOiBnZXRBcHAoKS5nbG9iYWxEYXRhLmdldFVybCxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICB2YXIgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcbiAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XHJcbiAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLFxyXG4gICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5aSx6LSl77yM6K+35Yig6Zmk5bCP56iL5bqP5ZCO6YeN5paw6I635b6X5p2D6ZmQJyxcclxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcclxuICAgICAgcGF0aDogJy9wYWdlcy9ob21lL2luZGV4JyxcclxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlL3NoYXJlLnBuZydcclxuICAgIH1cclxuICB9XHJcbn0iXX0=