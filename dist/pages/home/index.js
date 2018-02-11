'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    }
  },
  toGenerate: function toGenerate(e) {
    wx.navigateTo({
      url: '../../pages/generate/index'
    });
  },
  toFeedback: function toFeedback(e) {
    wx.navigateTo({
      url: '../../pages/feedback/index'
    });
  },
  toScan: function toScan(e) {
    wx.navigateTo({
      url: '../../pages/scanrs/index'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidG9HZW5lcmF0ZSIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0ZlZWRiYWNrIiwidG9TY2FuIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxHO0FBQ05DLGNBQVksb0JBQVNDLENBQVQsRUFBVztBQUNyQkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUs7QUFETyxLQUFkO0FBR0QsRztBQUNEQyxjQUFZLG9CQUFTSixDQUFULEVBQVc7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdELEc7QUFDREUsVUFBUSxnQkFBU0wsQ0FBVCxFQUFXO0FBQ2pCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RHLHFCQUFtQiw2QkFBWTtBQUM3QixXQUFPO0FBQ0xDLGFBQU8sT0FERjtBQUVMQyxZQUFNLG1CQUZEO0FBR0xDLGdCQUFVO0FBSEwsS0FBUDtBQUtEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbidcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHt9LFxuICB0b0dlbmVyYXRlOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL2dlbmVyYXRlL2luZGV4J1xuICAgIH0pXG4gIH0sXG4gIHRvRmVlZGJhY2s6IGZ1bmN0aW9uKGUpe1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvZmVlZGJhY2svaW5kZXgnXG4gICAgfSlcbiAgfSxcbiAgdG9TY2FuOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL3NjYW5ycy9pbmRleCdcbiAgICB9KVxuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHBzOi8vaW1hZ2VzLmd4dWFubi5jbi9xcmNvZGUvc2hhcmUucG5nJ1xuICAgIH1cbiAgfVxufSJdfQ==