'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var QR = require("../../utils/qrcode.js");
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    imagePath: '',
    $toast: {
      show: false
    }
  },
  formBindsubmit: function formBindsubmit(e) {
    getApp().globalData.gendetail = e.detail.value.detail;
    console.log(getApp().globalData.gendetail);
    if (e.detail.value.detail.length == 0) {
      this.showZanTopTips('内容不能为空');
    } else {
      wx.navigateTo({
        url: '../../pages/img/index'
      });
    }
  },
  showZanTopTips: function showZanTopTips() {
    var _this = this;

    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var zanTopTips = this.data.zanTopTips || {};
    if (zanTopTips.timer) {
      clearTimeout(zanTopTips.timer);
      zanTopTips.timer = 0;
    }
    if (typeof options === 'number') {
      options = {
        duration: options
      };
    }
    options = Object.assign({
      duration: 3000
    }, options);
    var timer = setTimeout(function () {
      _this.setData({
        'zanTopTips.show': false,
        'zanTopTips.timer': 0
      });
    }, options.duration);
    this.setData({
      zanTopTips: {
        show: true,
        content: content,
        options: options,
        timer: timer
      }
    });
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'QR二维码',
      path: '/pages/menu/index',
      imageUrl: '../../images/share.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJRUiIsInJlcXVpcmUiLCJkYXRhIiwiaW1hZ2VQYXRoIiwiJHRvYXN0Iiwic2hvdyIsImZvcm1CaW5kc3VibWl0IiwiZSIsImdldEFwcCIsImdsb2JhbERhdGEiLCJnZW5kZXRhaWwiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzaG93WmFuVG9wVGlwcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbnRlbnQiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiZHVyYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRUaW1lb3V0Iiwic2V0RGF0YSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsS0FBS0MsUUFBUSx1QkFBUixDQUFUOztBQVVFQyxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXLEVBRFA7QUFFSkMsWUFBUTtBQUNOQyxZQUFNO0FBREE7QUFGSixHO0FBTU5DLGtCQUFnQix3QkFBU0MsQ0FBVCxFQUFXO0FBQ3pCQyxhQUFTQyxVQUFULENBQW9CQyxTQUFwQixHQUE4QkgsRUFBRUksTUFBRixDQUFTQyxLQUFULENBQWVELE1BQTdDO0FBQ0FFLFlBQVFDLEdBQVIsQ0FBWU4sU0FBU0MsVUFBVCxDQUFvQkMsU0FBaEM7QUFDQSxRQUFJSCxFQUFFSSxNQUFGLENBQVNDLEtBQVQsQ0FBZUQsTUFBZixDQUFzQkksTUFBdEIsSUFBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsV0FBS0MsY0FBTCxDQUFvQixRQUFwQjtBQUNELEtBRkQsTUFFSztBQUNIQyxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSTtBQURRLE9BQWQ7QUFHRDtBQUNGLEc7QUFDREgsZ0IsNEJBQTJDO0FBQUE7O0FBQUEsUUFBNUJJLE9BQTRCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDekMsUUFBSUMsYUFBYSxLQUFLcEIsSUFBTCxDQUFVb0IsVUFBVixJQUF3QixFQUF6QztBQUNBLFFBQUlBLFdBQVdDLEtBQWYsRUFBc0I7QUFDcEJDLG1CQUFhRixXQUFXQyxLQUF4QjtBQUNBRCxpQkFBV0MsS0FBWCxHQUFtQixDQUFuQjtBQUNEO0FBQ0QsUUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxnQkFBVTtBQUNSSSxrQkFBVUo7QUFERixPQUFWO0FBR0Q7QUFDREEsY0FBVUssT0FBT0MsTUFBUCxDQUFjO0FBQ3RCRixnQkFBVTtBQURZLEtBQWQsRUFFUEosT0FGTyxDQUFWO0FBR0EsUUFBSUUsUUFBUUssV0FBVyxZQUFNO0FBQzNCLFlBQUtDLE9BQUwsQ0FBYTtBQUNYLDJCQUFtQixLQURSO0FBRVgsNEJBQW9CO0FBRlQsT0FBYjtBQUlELEtBTFcsRUFLVFIsUUFBUUksUUFMQyxDQUFaO0FBTUEsU0FBS0ksT0FBTCxDQUFhO0FBQ1hQLGtCQUFZO0FBQ1ZqQixjQUFNLElBREk7QUFFVmUsd0JBRlU7QUFHVkMsd0JBSFU7QUFJVkU7QUFKVTtBQURELEtBQWI7QUFRRCxHOztBQUNETyxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMQyxhQUFPLE9BREY7QUFFTEMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUVIgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvcXJjb2RlLmpzXCIpO1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXG4gICAgICAnd3hjLWZsZXgnOiAnQG1pbnVpL3d4Yy1mbGV4JyxcbiAgICAgICd3eGMtdG9hc3QnOiAnQG1pbnVpL3d4Yy10b2FzdCdcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpbWFnZVBhdGg6ICcnLFxuICAgICR0b2FzdDoge1xuICAgICAgc2hvdzogZmFsc2VcbiAgICB9LFxuICB9LFxuICBmb3JtQmluZHN1Ym1pdDogZnVuY3Rpb24oZSl7XG4gICAgZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZW5kZXRhaWw9ZS5kZXRhaWwudmFsdWUuZGV0YWlsO1xuICAgIGNvbnNvbGUubG9nKGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsKVxuICAgIGlmIChlLmRldGFpbC52YWx1ZS5kZXRhaWwubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc2hvd1phblRvcFRpcHMoJ+WGheWuueS4jeiDveS4uuepuicpO1xuICAgIH1lbHNle1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDonLi4vLi4vcGFnZXMvaW1nL2luZGV4J1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIHNob3daYW5Ub3BUaXBzKGNvbnRlbnQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHphblRvcFRpcHMgPSB0aGlzLmRhdGEuemFuVG9wVGlwcyB8fCB7fTtcbiAgICBpZiAoemFuVG9wVGlwcy50aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHphblRvcFRpcHMudGltZXIpO1xuICAgICAgemFuVG9wVGlwcy50aW1lciA9IDA7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zXG4gICAgICB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ3phblRvcFRpcHMuc2hvdyc6IGZhbHNlLFxuICAgICAgICAnemFuVG9wVGlwcy50aW1lcic6IDBcbiAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB6YW5Ub3BUaXBzOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHRpbWVyXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnUVLkuoznu7TnoIEnLFxuICAgICAgcGF0aDogJy9wYWdlcy9tZW51L2luZGV4JyxcbiAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL3NoYXJlLnBuZydcbiAgICB9XG4gIH1cbn0iXX0=