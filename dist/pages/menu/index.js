'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    extraData: {
      id: '31640'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZXh0cmFEYXRhIiwiaWQiLCJ0b0dlbmVyYXRlIiwiZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIm9uTG9hZCIsInRvU2NhbiIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFFQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXO0FBQ1RDLFVBQUk7QUFESztBQURQLEc7QUFLTkMsY0FBWSxvQkFBU0MsQ0FBVCxFQUFXO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RDLFVBQU8sa0JBQVUsQ0FFaEIsQztBQUNEQyxVQUFRLGdCQUFTTCxDQUFULEVBQVc7QUFDakJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDtBQUdELEc7QUFDREcscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTEMsYUFBTyxPQURGO0FBRUxDLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1mbGV4JzogJ0BtaW51aS93eGMtZmxleCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGV4dHJhRGF0YToge1xuICAgICAgaWQ6ICczMTY0MCcsXG4gICAgfVxuICB9LFxuICB0b0dlbmVyYXRlOiBmdW5jdGlvbihlKXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uLy4uL3BhZ2VzL2dlbmVyYXRlL2luZGV4J1xuICAgIH0pXG4gIH0sXG4gIG9uTG9hZDpmdW5jdGlvbigpe1xuICAgIFxuICB9LFxuICB0b1NjYW46IGZ1bmN0aW9uKGUpe1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvc2NhbnJzL2luZGV4J1xuICAgIH0pXG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnUVLkuoznu7TnoIEnLFxuICAgICAgcGF0aDogJy9wYWdlcy9tZW51L2luZGV4JyxcbiAgICAgIGltYWdlVXJsOiAnaHR0cHM6Ly9pbWFnZXMuZ3h1YW5uLmNuL3FyY29kZS9zaGFyZS5wbmcnXG4gICAgfVxuICB9XG59Il19