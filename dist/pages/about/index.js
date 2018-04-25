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
      path: '/pages/menu/index',
      imageUrl: 'https://images.gxuann.cn/qrcode/share.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsImRhdGEiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0Iiwib25Mb2FkIiwidGhhdCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwid2luZG93V2lkdGgiLCJsZW5ndGgiLCJ0YWJDbGljayIsImUiLCJjdXJyZW50VGFyZ2V0Iiwib2Zmc2V0TGVmdCIsImlkIiwiY2xpY2tHeHVhbm4iLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsY0FBYyxHQUFsQjs7QUFXRUMsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsVUFBTSxDQUFDLE1BQUQsRUFBUyxXQUFULENBREY7QUFFRkMsaUJBQWEsQ0FGWDtBQUdGQyxrQkFBYyxDQUhaO0FBSUZDLGdCQUFZO0FBSlYsRztBQU1OQyxVQUFRLGtCQUFZO0FBQ2xCLFFBQUlDLE9BQU8sSUFBWDtBQUNBQyxPQUFHQyxhQUFILENBQWlCO0FBQ2JDLGVBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkosYUFBS0ssT0FBTCxDQUFhO0FBQ1RQLHNCQUFZLENBQUNNLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ2QsV0FBM0MsSUFBMEQsQ0FEN0Q7QUFFVEksd0JBQWNPLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ1AsS0FBS04sSUFBTCxDQUFVRTtBQUZ6RCxTQUFiO0FBSUg7QUFOWSxLQUFqQjtBQVFELEc7QUFDRFksWUFBVSxrQkFBVUMsQ0FBVixFQUFhO0FBQ25CLFNBQUtKLE9BQUwsQ0FBYTtBQUNUUixvQkFBY1ksRUFBRUMsYUFBRixDQUFnQkMsVUFEckI7QUFFVGYsbUJBQWFhLEVBQUVDLGFBQUYsQ0FBZ0JFO0FBRnBCLEtBQWI7QUFJSCxHO0FBQ0RDLGVBQWEscUJBQVNKLENBQVQsRUFBVztBQUN0QlIsT0FBR2EsWUFBSCxDQUFnQjtBQUNkQyxlQUFTLHFDQURLO0FBRWRDLFlBQU0sQ0FBQyxxQ0FBRDtBQUZRLEtBQWhCO0FBSUQsRztBQUNEQyxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMQyxhQUFPLE9BREY7QUFFTEMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyV2lkdGggPSAxMDU7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhbPkuo4m6K+05piOJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy1sYWJlbCc6ICdAbWludWkvd3hjLWxhYmVsJyxcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1sb2FkbW9yZSc6ICdAbWludWkvd3hjLWxvYWRtb3JlJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIHRhYnM6IFtcIuS9v+eUqOaWueazlVwiLCBcIkNoYW5nZUxvZ1wiXSxcbiAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgc2xpZGVyT2Zmc2V0OiAwLFxuICAgICAgc2xpZGVyTGVmdDogMCxcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2xpZGVyTGVmdDogKHJlcy53aW5kb3dXaWR0aCAvIHRoYXQuZGF0YS50YWJzLmxlbmd0aCAtIHNsaWRlcldpZHRoKSAvIDIsXG4gICAgICAgICAgICAgICAgc2xpZGVyT2Zmc2V0OiByZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggKiB0aGF0LmRhdGEuYWN0aXZlSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHRhYkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBzbGlkZXJPZmZzZXQ6IGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0LFxuICAgICAgICAgIGFjdGl2ZUluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIH0pO1xuICB9LFxuICBjbGlja0d4dWFubjogZnVuY3Rpb24oZSl7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlLmpwZycsXG4gICAgICB1cmxzOiBbJ2h0dHBzOi8vaW1hZ2VzLmd4dWFubi5jbi9xcmNvZGUuanBnJ11cbiAgICB9KVxuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvbWVudS9pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHBzOi8vaW1hZ2VzLmd4dWFubi5jbi9xcmNvZGUvc2hhcmUucG5nJ1xuICAgIH1cbiAgfVxufSJdfQ==