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
      path: '/pages/home/index',
      imageUrl: '../../images/share.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJRUiIsInJlcXVpcmUiLCJkYXRhIiwiaW1hZ2VQYXRoIiwiJHRvYXN0Iiwic2hvdyIsImZvcm1CaW5kc3VibWl0IiwiZSIsImdldEFwcCIsImdsb2JhbERhdGEiLCJnZW5kZXRhaWwiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzaG93WmFuVG9wVGlwcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbnRlbnQiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiZHVyYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRUaW1lb3V0Iiwic2V0RGF0YSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsS0FBS0MsUUFBUSx1QkFBUixDQUFUOztBQVVFQyxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXLEVBRFA7QUFFSkMsWUFBUTtBQUNOQyxZQUFNO0FBREE7QUFGSixHO0FBTU5DLGtCQUFnQix3QkFBU0MsQ0FBVCxFQUFXO0FBQ3pCQyxhQUFTQyxVQUFULENBQW9CQyxTQUFwQixHQUE4QkgsRUFBRUksTUFBRixDQUFTQyxLQUFULENBQWVELE1BQTdDO0FBQ0FFLFlBQVFDLEdBQVIsQ0FBWU4sU0FBU0MsVUFBVCxDQUFvQkMsU0FBaEM7QUFDQSxRQUFJSCxFQUFFSSxNQUFGLENBQVNDLEtBQVQsQ0FBZUQsTUFBZixDQUFzQkksTUFBdEIsSUFBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsV0FBS0MsY0FBTCxDQUFvQixRQUFwQjtBQUNELEtBRkQsTUFFSztBQUNIQyxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSTtBQURRLE9BQWQ7QUFHRDtBQUNGLEc7QUFDREgsZ0IsNEJBQTJDO0FBQUE7O0FBQUEsUUFBNUJJLE9BQTRCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDekMsUUFBSUMsYUFBYSxLQUFLcEIsSUFBTCxDQUFVb0IsVUFBVixJQUF3QixFQUF6QztBQUNBLFFBQUlBLFdBQVdDLEtBQWYsRUFBc0I7QUFDcEJDLG1CQUFhRixXQUFXQyxLQUF4QjtBQUNBRCxpQkFBV0MsS0FBWCxHQUFtQixDQUFuQjtBQUNEO0FBQ0QsUUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxnQkFBVTtBQUNSSSxrQkFBVUo7QUFERixPQUFWO0FBR0Q7QUFDREEsY0FBVUssT0FBT0MsTUFBUCxDQUFjO0FBQ3RCRixnQkFBVTtBQURZLEtBQWQsRUFFUEosT0FGTyxDQUFWO0FBR0EsUUFBSUUsUUFBUUssV0FBVyxZQUFNO0FBQzNCLFlBQUtDLE9BQUwsQ0FBYTtBQUNYLDJCQUFtQixLQURSO0FBRVgsNEJBQW9CO0FBRlQsT0FBYjtBQUlELEtBTFcsRUFLVFIsUUFBUUksUUFMQyxDQUFaO0FBTUEsU0FBS0ksT0FBTCxDQUFhO0FBQ1hQLGtCQUFZO0FBQ1ZqQixjQUFNLElBREk7QUFFVmUsd0JBRlU7QUFHVkMsd0JBSFU7QUFJVkU7QUFKVTtBQURELEtBQWI7QUFRRCxHOztBQUNETyxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMQyxhQUFPLE9BREY7QUFFTEMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUVIgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvcXJjb2RlLmpzXCIpO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29uZmlnOiB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxyXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxyXG4gICAgICAnd3hjLWZsZXgnOiAnQG1pbnVpL3d4Yy1mbGV4JyxcclxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgaW1hZ2VQYXRoOiAnJyxcclxuICAgICR0b2FzdDoge1xyXG4gICAgICBzaG93OiBmYWxzZVxyXG4gICAgfSxcclxuICB9LFxyXG4gIGZvcm1CaW5kc3VibWl0OiBmdW5jdGlvbihlKXtcclxuICAgIGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsPWUuZGV0YWlsLnZhbHVlLmRldGFpbDtcclxuICAgIGNvbnNvbGUubG9nKGdldEFwcCgpLmdsb2JhbERhdGEuZ2VuZGV0YWlsKVxyXG4gICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLnNob3daYW5Ub3BUaXBzKCflhoXlrrnkuI3og73kuLrnqbonKTtcclxuICAgIH1lbHNle1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6Jy4uLy4uL3BhZ2VzL2ltZy9pbmRleCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3daYW5Ub3BUaXBzKGNvbnRlbnQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBsZXQgemFuVG9wVGlwcyA9IHRoaXMuZGF0YS56YW5Ub3BUaXBzIHx8IHt9O1xyXG4gICAgaWYgKHphblRvcFRpcHMudGltZXIpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHphblRvcFRpcHMudGltZXIpO1xyXG4gICAgICB6YW5Ub3BUaXBzLnRpbWVyID0gMDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICBkdXJhdGlvbjogb3B0aW9uc1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xyXG4gICAgICBkdXJhdGlvbjogMzAwMFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcbiAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAnemFuVG9wVGlwcy5zaG93JzogZmFsc2UsXHJcbiAgICAgICAgJ3phblRvcFRpcHMudGltZXInOiAwXHJcbiAgICAgIH0pO1xyXG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbik7XHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICB6YW5Ub3BUaXBzOiB7XHJcbiAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICBjb250ZW50LFxyXG4gICAgICAgIG9wdGlvbnMsXHJcbiAgICAgICAgdGltZXJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXHJcbiAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9pbmRleCcsXHJcbiAgICAgIGltYWdlVXJsOiAnLi4vLi4vaW1hZ2VzL3NoYXJlLnBuZydcclxuICAgIH1cclxuICB9XHJcbn0iXX0=