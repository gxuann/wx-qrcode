'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sliderWidth = 105;
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    tabs: ["使用方法", "ChangeLog"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  clickGxuann: function clickGxuann(e) {
    wx.previewImage({
      current: 'https://images.gxuann.cn/qrcode.jpg',
      urls: ['https://images.gxuann.cn/qrcode.jpg']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsImRhdGEiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0Iiwib25Mb2FkIiwidGhhdCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwid2luZG93V2lkdGgiLCJsZW5ndGgiLCJ0YWJDbGljayIsImUiLCJjdXJyZW50VGFyZ2V0Iiwib2Zmc2V0TGVmdCIsImlkIiwiY2xpY2tHeHVhbm4iLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsY0FBYyxHQUFsQjs7QUFXRUMsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsVUFBTSxDQUFDLE1BQUQsRUFBUyxXQUFULENBREY7QUFFRkMsaUJBQWEsQ0FGWDtBQUdGQyxrQkFBYyxDQUhaO0FBSUZDLGdCQUFZO0FBSlYsRztBQU1OQyxVQUFRLGtCQUFZO0FBQ2xCLFFBQUlDLE9BQU8sSUFBWDtBQUNBQyxPQUFHQyxhQUFILENBQWlCO0FBQ2JDLGVBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkosYUFBS0ssT0FBTCxDQUFhO0FBQ1RQLHNCQUFZLENBQUNNLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ2QsV0FBM0MsSUFBMEQsQ0FEN0Q7QUFFVEksd0JBQWNPLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ1AsS0FBS04sSUFBTCxDQUFVRTtBQUZ6RCxTQUFiO0FBSUg7QUFOWSxLQUFqQjtBQVFELEc7QUFDRFksWUFBVSxrQkFBVUMsQ0FBVixFQUFhO0FBQ25CLFNBQUtKLE9BQUwsQ0FBYTtBQUNUUixvQkFBY1ksRUFBRUMsYUFBRixDQUFnQkMsVUFEckI7QUFFVGYsbUJBQWFhLEVBQUVDLGFBQUYsQ0FBZ0JFO0FBRnBCLEtBQWI7QUFJSCxHO0FBQ0RDLGVBQWEscUJBQVNKLENBQVQsRUFBVztBQUN0QlIsT0FBR2EsWUFBSCxDQUFnQjtBQUNkQyxlQUFTLHFDQURLO0FBRWRDLFlBQU0sQ0FBQyxxQ0FBRDtBQUZRLEtBQWhCO0FBSUQsRztBQUNEQyxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMQyxhQUFPLE9BREY7QUFFTEMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyV2lkdGggPSAxMDU7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhbPkuo4m6K+05piOJyxcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAnd3hjLWZsZXgnOiAnQG1pbnVpL3d4Yy1mbGV4JyxcclxuICAgICAgJ3d4Yy1sYWJlbCc6ICdAbWludWkvd3hjLWxhYmVsJyxcclxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXHJcbiAgICAgICd3eGMtbG9hZG1vcmUnOiAnQG1pbnVpL3d4Yy1sb2FkbW9yZSdcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIHRhYnM6IFtcIuS9v+eUqOaWueazlVwiLCBcIkNoYW5nZUxvZ1wiXSxcclxuICAgICAgYWN0aXZlSW5kZXg6IDAsXHJcbiAgICAgIHNsaWRlck9mZnNldDogMCxcclxuICAgICAgc2xpZGVyTGVmdDogMCxcclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXJMZWZ0OiAocmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoIC0gc2xpZGVyV2lkdGgpIC8gMixcclxuICAgICAgICAgICAgICAgIHNsaWRlck9mZnNldDogcmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoICogdGhhdC5kYXRhLmFjdGl2ZUluZGV4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgdGFiQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICBzbGlkZXJPZmZzZXQ6IGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0LFxyXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIGNsaWNrR3h1YW5uOiBmdW5jdGlvbihlKXtcclxuICAgIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgIGN1cnJlbnQ6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlLmpwZycsXHJcbiAgICAgIHVybHM6IFsnaHR0cHM6Ly9pbWFnZXMuZ3h1YW5uLmNuL3FyY29kZS5qcGcnXVxyXG4gICAgfSlcclxuICB9LFxyXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcclxuICAgICAgcGF0aDogJy9wYWdlcy9ob21lL2luZGV4JyxcclxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlL3NoYXJlLnBuZydcclxuICAgIH1cclxuICB9XHJcbn0iXX0=