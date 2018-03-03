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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidG9HZW5lcmF0ZSIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0ZlZWRiYWNrIiwidG9TY2FuIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxHO0FBQ05DLGNBQVksb0JBQVNDLENBQVQsRUFBVztBQUNyQkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUs7QUFETyxLQUFkO0FBR0QsRztBQUNEQyxjQUFZLG9CQUFTSixDQUFULEVBQVc7QUFDckJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdELEc7QUFDREUsVUFBUSxnQkFBU0wsQ0FBVCxFQUFXO0FBQ2pCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RHLHFCQUFtQiw2QkFBWTtBQUM3QixXQUFPO0FBQ0xDLGFBQU8sT0FERjtBQUVMQyxZQUFNLG1CQUZEO0FBR0xDLGdCQUFVO0FBSEwsS0FBUDtBQUtEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1mbGV4JzogJ0BtaW51aS93eGMtZmxleCcsXHJcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7fSxcclxuICB0b0dlbmVyYXRlOiBmdW5jdGlvbihlKXtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi8uLi9wYWdlcy9nZW5lcmF0ZS9pbmRleCdcclxuICAgIH0pXHJcbiAgfSxcclxuICB0b0ZlZWRiYWNrOiBmdW5jdGlvbihlKXtcclxuICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICB1cmw6ICcuLi8uLi9wYWdlcy9mZWVkYmFjay9pbmRleCdcclxuICAgIH0pXHJcbiAgfSxcclxuICB0b1NjYW46IGZ1bmN0aW9uKGUpe1xyXG4gICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL3NjYW5ycy9pbmRleCdcclxuICAgIH0pXHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXHJcbiAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9pbmRleCcsXHJcbiAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9pbWFnZXMuZ3h1YW5uLmNuL3FyY29kZS9zaGFyZS5wbmcnXHJcbiAgICB9XHJcbiAgfVxyXG59Il19