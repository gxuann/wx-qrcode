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
      }
    });
    setTimeout(function () {
      _this.setData({
        $loading: {
          isShow: false
        },
        canvasHidden: false,
        isDisabled: false,
        isDisabled1: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaW1nIiwiJGxvYWRpbmciLCJpc1Nob3ciLCIkdG9hc3QiLCJzaG93IiwiZ2V0VXJsIiwiZ2VuIiwic2V0RGF0YSIsInNldFRpbWVvdXQiLCJjYW52YXNIaWRkZW4iLCJpc0Rpc2FibGVkIiwiaXNEaXNhYmxlZDEiLCJ0aGF0IiwiZ2VuZGV0YWlsIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImRldGFpbCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwib25Mb2FkIiwiZSIsInByZXZpZXdJbWciLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsInNhdmUiLCJkb3dubG9hZEZpbGUiLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJlcnIiLCJvblNoYXJlQXBwTWVzc2FnZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFNBQUksRUFEQTtBQUVKQyxjQUFVO0FBQ05DLGNBQVE7QUFERixLQUZOO0FBS0pDLFlBQVE7QUFDTkMsWUFBTTtBQURBLEtBTEo7QUFRSkMsWUFBTztBQVJILEc7QUFVTkMsSyxpQkFBTTtBQUFBOztBQUNKLFNBQUtDLE9BQUwsQ0FBYTtBQUNYTixnQkFBVTtBQUNSQyxnQkFBUTtBQURBO0FBREMsS0FBYjtBQUtBTSxlQUFXLFlBQU07QUFDZixZQUFLRCxPQUFMLENBQWE7QUFDWE4sa0JBQVU7QUFDUkMsa0JBQVE7QUFEQSxTQURDO0FBSVhPLHNCQUFhLEtBSkY7QUFLWEMsb0JBQVcsS0FMQTtBQU1YQyxxQkFBWTtBQU5ELE9BQWI7QUFRRCxLQVRELEVBU0csSUFUSDtBQVVBLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLFlBQVlDLFNBQVNDLFVBQVQsQ0FBb0JGLFNBQXBDO0FBQ0EsUUFBSVIsU0FBU1MsU0FBU0MsVUFBVCxDQUFvQlYsTUFBakM7QUFDQVcsT0FBR0MsT0FBSCxDQUFXO0FBQ1RDLFdBQUssa0NBREk7QUFFVG5CLFlBQUs7QUFBQTtBQUFBO0FBQUE7O0FBQ0hvQixnQkFBT047QUFESixPQUZJO0FBS1RPLGNBQVEsS0FMQztBQU1UQyxjQUFRLEVBQUUsZ0JBQWdCLG1DQUFsQixFQU5DO0FBT1RDLGVBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QlQsaUJBQVNDLFVBQVQsQ0FBb0JWLE1BQXBCLEdBQTZCa0IsSUFBSXhCLElBQWpDO0FBQ0FhLGFBQUtMLE9BQUwsQ0FBYTtBQUNYRixrQkFBUVMsU0FBU0MsVUFBVCxDQUFvQlYsTUFEakI7QUFFWEksd0JBQWE7QUFGRixTQUFiO0FBSUFlLGdCQUFRQyxHQUFSLENBQVlwQixNQUFaO0FBQ0Q7QUFkUSxLQUFYO0FBZ0JELEc7O0FBQ0RxQixVQUFRLGdCQUFTQyxDQUFULEVBQVc7QUFDakIsUUFBSWYsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsWUFBWUMsU0FBU0MsVUFBVCxDQUFvQkYsU0FBcEM7QUFDQVcsWUFBUUMsR0FBUixDQUFZWixTQUFaO0FBQ0EsU0FBS04sT0FBTCxDQUFhO0FBQ1hNLGlCQUFXQSxTQURBO0FBRVhILGtCQUFZLElBRkQ7QUFHWEMsbUJBQVk7QUFIRCxLQUFiO0FBS0QsRztBQUNEaUIsY0FBVyxvQkFBU0QsQ0FBVCxFQUFXO0FBQ3BCLFFBQUkzQixNQUFNYyxTQUFTQyxVQUFULENBQW9CVixNQUE5QjtBQUNBbUIsWUFBUUMsR0FBUixDQUFZekIsR0FBWjtBQUNBZ0IsT0FBR2EsWUFBSCxDQUFnQjtBQUNkQyxlQUFTLEtBREs7QUFFZEMsWUFBTSxDQUFDL0IsR0FBRDtBQUZRLEtBQWhCO0FBSUQsRztBQUNEZ0MsUUFBTSxjQUFTTCxDQUFULEVBQVc7QUFDZixRQUFJZixPQUFPLElBQVg7QUFDQUksT0FBR2lCLFlBQUgsQ0FBZ0I7QUFDZGYsV0FBS0osU0FBU0MsVUFBVCxDQUFvQlYsTUFEWDtBQUVkaUIsZUFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCLFlBQUlXLFdBQVdYLElBQUlZLFlBQW5CO0FBQ0FuQixXQUFHb0Isc0JBQUgsQ0FBMEI7QUFDeEJGLG9CQUFVWCxJQUFJWSxZQURVO0FBRXhCYixtQkFBUyxpQkFBVXZCLElBQVYsRUFBZ0I7QUFDdkJ5QixvQkFBUUMsR0FBUixDQUFZMUIsSUFBWjtBQUNBaUIsZUFBR3FCLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxNQURJO0FBRVhDLG9CQUFNLFNBRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0QsV0FUdUI7QUFVeEJDLGdCQUFNLGNBQVVDLEdBQVYsRUFBZTtBQUNuQmxCLG9CQUFRQyxHQUFSLENBQVlpQixHQUFaO0FBQ0ExQixlQUFHcUIsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLG9CQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0Q7QUFqQnVCLFNBQTFCO0FBbUJEO0FBdkJhLEtBQWhCO0FBMEJELEc7QUFDREcscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEwsYUFBTyxPQURGO0FBRUxNLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1sb2FkaW5nJzogJ0BtaW51aS93eGMtbG9hZGluZycsXG4gICAgICAnd3hjLXRvYXN0JzogJ0BtaW51aS93eGMtdG9hc3QnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgaW1nOlwiXCIsXG4gICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgIH0sXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gICAgZ2V0VXJsOicnXG4gIH0sXG4gIGdlbigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICRsb2FkaW5nOiB7XG4gICAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBjYW52YXNIaWRkZW46ZmFsc2UsXG4gICAgICAgIGlzRGlzYWJsZWQ6ZmFsc2UsXG4gICAgICAgIGlzRGlzYWJsZWQxOnRydWUsXG4gICAgICB9KVxuICAgIH0sIDIwMDApXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBnZW5kZXRhaWwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbDtcbiAgICB2YXIgZ2V0VXJsID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmw7XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6ICdodHRwczovL3FyY29kZS5neHVhbm4uY24vdXJsLnBocCcsXG4gICAgICBkYXRhOntcbiAgICAgICAgZGV0YWlsOmdlbmRldGFpbFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXI6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsID0gcmVzLmRhdGFcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBnZXRVcmw6IGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsLFxuICAgICAgICAgIGNhbnZhc0hpZGRlbjp0cnVlLFxuICAgICAgICB9KVxuICAgICAgICBjb25zb2xlLmxvZyhnZXRVcmwpXG4gICAgICB9LFxuICAgIH0pXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24oZSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGdlbmRldGFpbCA9IGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsXG4gICAgY29uc29sZS5sb2coZ2VuZGV0YWlsKTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZ2VuZGV0YWlsOiBnZW5kZXRhaWwsXG4gICAgICBpc0Rpc2FibGVkOiB0cnVlLFxuICAgICAgaXNEaXNhYmxlZDE6ZmFsc2UsXG4gICAgfSk7XG4gIH0sXG4gIHByZXZpZXdJbWc6ZnVuY3Rpb24oZSl7XG4gICAgdmFyIGltZyA9IGdldEFwcCgpLmdsb2JhbERhdGEuZ2V0VXJsO1xuICAgIGNvbnNvbGUubG9nKGltZyk7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6ICdpbWcnLFxuICAgICAgdXJsczogW2ltZ11cbiAgICB9KVxuICB9LFxuICBzYXZlOiBmdW5jdGlvbihlKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgIHVybDogZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICB2YXIgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXG4gICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgIGZpbGVQYXRoOiByZXMudGVtcEZpbGVQYXRoLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLFxuICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfkv53lrZjlpLHotKXvvIzor7fliKDpmaTlsI/nqIvluo/lkI7ph43mlrDojrflvpfmnYPpmZAnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnUVLkuoznu7TnoIEnLFxuICAgICAgcGF0aDogJy9wYWdlcy9ob21lL2luZGV4JyxcbiAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9pbWFnZXMuZ3h1YW5uLmNuL3FyY29kZS9zaGFyZS5wbmcnXG4gICAgfVxuICB9XG59Il19