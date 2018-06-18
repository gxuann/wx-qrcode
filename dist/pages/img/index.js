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
        }, 5000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaW1nIiwiJGxvYWRpbmciLCJpc1Nob3ciLCIkdG9hc3QiLCJzaG93IiwiZ2V0VXJsIiwiZ2VuIiwic2V0RGF0YSIsImlzRGlzYWJsZWQxIiwic2V0VGltZW91dCIsImlzRGlzYWJsZWQiLCJjYW52YXNIaWRkZW4iLCJ0aGF0IiwiZ2VuZGV0YWlsIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsInd4IiwicmVxdWVzdCIsInVybCIsImRldGFpbCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZmFpbCIsIiR0b2FzdDIiLCJvbkxvYWQiLCJlIiwicHJldmlld0ltZyIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIiwic2F2ZSIsImRvd25sb2FkRmlsZSIsImZpbGVQYXRoIiwidGVtcEZpbGVQYXRoIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZXJyIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFFQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxTQUFJLEVBREE7QUFFSkMsY0FBVTtBQUNOQyxjQUFRO0FBREYsS0FGTjtBQUtKQyxZQUFRO0FBQ05DLFlBQU07QUFEQSxLQUxKO0FBUUpDLFlBQU87QUFSSCxHO0FBVU5DLEssaUJBQU07QUFBQTs7QUFDSixTQUFLQyxPQUFMLENBQWE7QUFDWE4sZ0JBQVU7QUFDUkMsZ0JBQVE7QUFEQSxPQURDO0FBSVhNLG1CQUFZO0FBSkQsS0FBYjtBQU1BQyxlQUFXLFlBQU07QUFDZixZQUFLRixPQUFMLENBQWE7QUFDWE4sa0JBQVU7QUFDUkMsa0JBQVE7QUFEQSxTQURDO0FBSVhRLG9CQUFXLEtBSkE7QUFLWEMsc0JBQWE7QUFMRixPQUFiO0FBT0QsS0FSRCxFQVFHLElBUkg7QUFTQSxRQUFJQyxPQUFPLElBQVg7QUFDQSxRQUFJQyxZQUFZQyxTQUFTQyxVQUFULENBQW9CRixTQUFwQztBQUNBLFFBQUlSLFNBQVNTLFNBQVNDLFVBQVQsQ0FBb0JWLE1BQWpDO0FBQ0FXLE9BQUdDLE9BQUgsQ0FBVztBQUNUQyxXQUFLLGtDQURJO0FBRVRuQixZQUFLO0FBQUE7QUFBQTtBQUFBOztBQUNIb0IsZ0JBQU9OO0FBREosT0FGSTtBQUtUTyxjQUFRLEtBTEM7QUFNVEMsY0FBUSxFQUFFLGdCQUFnQixtQ0FBbEIsRUFOQztBQU9UQyxlQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEJULGlCQUFTQyxVQUFULENBQW9CVixNQUFwQixHQUE2QmtCLElBQUl4QixJQUFqQztBQUNBYSxhQUFLTCxPQUFMLENBQWE7QUFDWEYsa0JBQVFTLFNBQVNDLFVBQVQsQ0FBb0JWLE1BRGpCO0FBRVhNLHdCQUFhO0FBRkYsU0FBYjtBQUlBYSxnQkFBUUMsR0FBUixDQUFZcEIsTUFBWjtBQUNELE9BZFE7QUFlVHFCLFlBQU0sY0FBU0gsR0FBVCxFQUFhO0FBQ2JYLGFBQUtMLE9BQUwsQ0FBYTtBQUNib0IsbUJBQVM7QUFDUHZCLGtCQUFNO0FBREMsV0FESTtBQUliTSxzQkFBVztBQUpFLFNBQWI7QUFNSEQsbUJBQVcsWUFBTTtBQUNkRyxlQUFLTCxPQUFMLENBQWE7QUFDWG9CLHFCQUFTO0FBQ1B2QixvQkFBTTtBQURDO0FBREUsV0FBYjtBQUtGLFNBTkQsRUFNRyxJQU5IO0FBT0Y7QUE3QlEsS0FBWDtBQStCRCxHOztBQUNEd0IsVUFBUSxnQkFBU0MsQ0FBVCxFQUFXO0FBQ2pCLFFBQUlqQixPQUFPLElBQVg7QUFDQSxRQUFJQyxZQUFZQyxTQUFTQyxVQUFULENBQW9CRixTQUFwQztBQUNBVyxZQUFRQyxHQUFSLENBQVlaLFNBQVo7QUFDQSxTQUFLTixPQUFMLENBQWE7QUFDWE0saUJBQVdBLFNBREE7QUFFWEgsa0JBQVksSUFGRDtBQUdYRixtQkFBWTtBQUhELEtBQWI7QUFLRCxHO0FBQ0RzQixjQUFXLG9CQUFTRCxDQUFULEVBQVc7QUFDcEIsUUFBSTdCLE1BQU1jLFNBQVNDLFVBQVQsQ0FBb0JWLE1BQTlCO0FBQ0FtQixZQUFRQyxHQUFSLENBQVl6QixHQUFaO0FBQ0FnQixPQUFHZSxZQUFILENBQWdCO0FBQ2RDLGVBQVMsS0FESztBQUVkQyxZQUFNLENBQUNqQyxHQUFEO0FBRlEsS0FBaEI7QUFJRCxHO0FBQ0RrQyxRQUFNLGNBQVNMLENBQVQsRUFBVztBQUNmLFFBQUlqQixPQUFPLElBQVg7QUFDQUksT0FBR21CLFlBQUgsQ0FBZ0I7QUFDZGpCLFdBQUtKLFNBQVNDLFVBQVQsQ0FBb0JWLE1BRFg7QUFFZGlCLGVBQVMsaUJBQVNDLEdBQVQsRUFBYTtBQUNwQixZQUFJYSxXQUFXYixJQUFJYyxZQUFuQjtBQUNBckIsV0FBR3NCLHNCQUFILENBQTBCO0FBQ3hCRixvQkFBVWIsSUFBSWMsWUFEVTtBQUV4QmYsbUJBQVMsaUJBQVV2QixJQUFWLEVBQWdCO0FBQ3ZCeUIsb0JBQVFDLEdBQVIsQ0FBWTFCLElBQVo7QUFDQWlCLGVBQUd1QixTQUFILENBQWE7QUFDWEMscUJBQU8sTUFESTtBQUVYQyxvQkFBTSxTQUZLO0FBR1hDLHdCQUFVO0FBSEMsYUFBYjtBQUtELFdBVHVCO0FBVXhCaEIsZ0JBQU0sY0FBVWlCLEdBQVYsRUFBZTtBQUNuQm5CLG9CQUFRQyxHQUFSLENBQVlrQixHQUFaO0FBQ0EzQixlQUFHdUIsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLG9CQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0Q7QUFqQnVCLFNBQTFCO0FBbUJEO0FBdkJhLEtBQWhCO0FBMEJELEc7QUFDREUscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEosYUFBTyxPQURGO0FBRUxLLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1sb2FkaW5nJzogJ0BtaW51aS93eGMtbG9hZGluZycsXG4gICAgICAnd3hjLXRvYXN0JzogJ0BtaW51aS93eGMtdG9hc3QnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgaW1nOlwiXCIsXG4gICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiBmYWxzZVxuICAgIH0sXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gICAgZ2V0VXJsOicnXG4gIH0sXG4gIGdlbigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgaXNTaG93OiB0cnVlXG4gICAgICB9LFxuICAgICAgaXNEaXNhYmxlZDE6dHJ1ZSxcbiAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJGxvYWRpbmc6IHtcbiAgICAgICAgICBpc1Nob3c6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGlzRGlzYWJsZWQ6ZmFsc2UsXG4gICAgICAgIGNhbnZhc0hpZGRlbjpmYWxzZSxcbiAgICAgIH0pXG4gICAgfSwgMjAwMClcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGdlbmRldGFpbCA9IGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsO1xuICAgIHZhciBnZXRVcmwgPSBnZXRBcHAoKS5nbG9iYWxEYXRhLmdldFVybDtcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vcXJjb2RlLmd4dWFubi5jbi91cmwucGhwJyxcbiAgICAgIGRhdGE6e1xuICAgICAgICBkZXRhaWw6Z2VuZGV0YWlsXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcjogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwgPSByZXMuZGF0YVxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGdldFVybDogZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmwsXG4gICAgICAgICAgY2FudmFzSGlkZGVuOnRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKGdldFVybClcbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICR0b2FzdDI6IHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzRGlzYWJsZWQ6dHJ1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAkdG9hc3QyOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgIH0sIDUwMDApXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbihlKXtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgZ2VuZGV0YWlsID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZW5kZXRhaWxcbiAgICBjb25zb2xlLmxvZyhnZW5kZXRhaWwpO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBnZW5kZXRhaWw6IGdlbmRldGFpbCxcbiAgICAgIGlzRGlzYWJsZWQ6IHRydWUsXG4gICAgICBpc0Rpc2FibGVkMTpmYWxzZSxcbiAgICB9KTtcbiAgfSxcbiAgcHJldmlld0ltZzpmdW5jdGlvbihlKXtcbiAgICB2YXIgaW1nID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZXRVcmw7XG4gICAgY29uc29sZS5sb2coaW1nKTtcbiAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgY3VycmVudDogJ2ltZycsXG4gICAgICB1cmxzOiBbaW1nXVxuICAgIH0pXG4gIH0sXG4gIHNhdmU6IGZ1bmN0aW9uKGUpe1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgdXJsOiBnZXRBcHAoKS5nbG9iYWxEYXRhLmdldFVybCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgIHZhciBmaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXG4gICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+S/neWtmOWksei0pe+8jOivt+WIoOmZpOWwj+eoi+W6j+WQjumHjeaWsOiOt+W+l+adg+mZkCcsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL2hvbWUvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlL3NoYXJlLnBuZydcbiAgICB9XG4gIH1cbn0iXX0=