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
  onLoad: function onLoad() {},
  toScan: function toScan(e) {
    wx.navigateTo({
      url: '../../pages/scanrs/index'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidG9HZW5lcmF0ZSIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvbkxvYWQiLCJ0b1NjYW4iLCJvblNoYXJlQXBwTWVzc2FnZSIsInRpdGxlIiwicGF0aCIsImltYWdlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7QUFDTkMsY0FBWSxvQkFBU0MsQ0FBVCxFQUFXO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RDLFVBQU8sa0JBQVUsQ0FBRSxDO0FBQ25CQyxVQUFRLGdCQUFTTCxDQUFULEVBQVc7QUFDakJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdELEc7QUFDREcscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEMsYUFBTyxPQURGO0FBRUxDLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1mbGV4JzogJ0BtaW51aS93eGMtZmxleCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge30sXG4gIHRvR2VuZXJhdGU6IGZ1bmN0aW9uKGUpe1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvZ2VuZXJhdGUvaW5kZXgnXG4gICAgfSlcbiAgfSxcbiAgb25Mb2FkOmZ1bmN0aW9uKCl7fSxcbiAgdG9TY2FuOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL3NjYW5ycy9pbmRleCdcbiAgICB9KVxuICB9LFxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ1FS5LqM57u056CBJyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvbWVudS9pbmRleCcsXG4gICAgICBpbWFnZVVybDogJ2h0dHBzOi8vaW1hZ2VzLmd4dWFubi5jbi9xcmNvZGUvc2hhcmUucG5nJ1xuICAgIH1cbiAgfVxufSJdfQ==