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
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidG9HZW5lcmF0ZSIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0ZlZWRiYWNrIiwidG9TY2FuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7QUFDTkMsY0FBWSxvQkFBU0MsQ0FBVCxFQUFXO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RDLGNBQVksb0JBQVNKLENBQVQsRUFBVztBQUNyQkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUs7QUFETyxLQUFkO0FBR0QsRztBQUNERSxVQUFRLGdCQUFTTCxDQUFULEVBQVc7QUFDakJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbidcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHt9LFxuICB0b0dlbmVyYXRlOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL2dlbmVyYXRlL2luZGV4J1xuICAgIH0pXG4gIH0sXG4gIHRvRmVlZGJhY2s6IGZ1bmN0aW9uKGUpe1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvZmVlZGJhY2svaW5kZXgnXG4gICAgfSlcbiAgfSxcbiAgdG9TY2FuOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL3NjYW5ycy9pbmRleCdcbiAgICB9KVxuICB9XG59Il19