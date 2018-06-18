'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaW1hZ2VQYXRoIiwiJHRvYXN0Iiwic2hvdyIsImZvcm1CaW5kc3VibWl0IiwiZSIsImdldEFwcCIsImdsb2JhbERhdGEiLCJnZW5kZXRhaWwiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzaG93WmFuVG9wVGlwcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbnRlbnQiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiZHVyYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRUaW1lb3V0Iiwic2V0RGF0YSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVNFQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxlQUFXLEVBRFA7QUFFSkMsWUFBUTtBQUNOQyxZQUFNO0FBREE7QUFGSixHO0FBTU5DLGtCQUFnQix3QkFBU0MsQ0FBVCxFQUFXO0FBQ3pCQyxhQUFTQyxVQUFULENBQW9CQyxTQUFwQixHQUE4QkgsRUFBRUksTUFBRixDQUFTQyxLQUFULENBQWVELE1BQTdDO0FBQ0FFLFlBQVFDLEdBQVIsQ0FBWU4sU0FBU0MsVUFBVCxDQUFvQkMsU0FBaEM7QUFDQSxRQUFJSCxFQUFFSSxNQUFGLENBQVNDLEtBQVQsQ0FBZUQsTUFBZixDQUFzQkksTUFBdEIsSUFBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsV0FBS0MsY0FBTCxDQUFvQixRQUFwQjtBQUNELEtBRkQsTUFFSztBQUNIQyxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSTtBQURRLE9BQWQ7QUFHRDtBQUNGLEc7QUFDREgsZ0IsNEJBQTJDO0FBQUE7O0FBQUEsUUFBNUJJLE9BQTRCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRDLE9BQWMsdUVBQUosRUFBSTs7QUFDekMsUUFBSUMsYUFBYSxLQUFLcEIsSUFBTCxDQUFVb0IsVUFBVixJQUF3QixFQUF6QztBQUNBLFFBQUlBLFdBQVdDLEtBQWYsRUFBc0I7QUFDcEJDLG1CQUFhRixXQUFXQyxLQUF4QjtBQUNBRCxpQkFBV0MsS0FBWCxHQUFtQixDQUFuQjtBQUNEO0FBQ0QsUUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxnQkFBVTtBQUNSSSxrQkFBVUo7QUFERixPQUFWO0FBR0Q7QUFDREEsY0FBVUssT0FBT0MsTUFBUCxDQUFjO0FBQ3RCRixnQkFBVTtBQURZLEtBQWQsRUFFUEosT0FGTyxDQUFWO0FBR0EsUUFBSUUsUUFBUUssV0FBVyxZQUFNO0FBQzNCLFlBQUtDLE9BQUwsQ0FBYTtBQUNYLDJCQUFtQixLQURSO0FBRVgsNEJBQW9CO0FBRlQsT0FBYjtBQUlELEtBTFcsRUFLVFIsUUFBUUksUUFMQyxDQUFaO0FBTUEsU0FBS0ksT0FBTCxDQUFhO0FBQ1hQLGtCQUFZO0FBQ1ZqQixjQUFNLElBREk7QUFFVmUsd0JBRlU7QUFHVkMsd0JBSFU7QUFJVkU7QUFKVTtBQURELEtBQWI7QUFRRCxHOztBQUNETyxxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMQyxhQUFPLE9BREY7QUFFTEMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGltYWdlUGF0aDogJycsXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gIH0sXG4gIGZvcm1CaW5kc3VibWl0OiBmdW5jdGlvbihlKXtcbiAgICBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbD1lLmRldGFpbC52YWx1ZS5kZXRhaWw7XG4gICAgY29uc29sZS5sb2coZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZW5kZXRhaWwpXG4gICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zaG93WmFuVG9wVGlwcygn5YaF5a655LiN6IO95Li656m6Jyk7XG4gICAgfWVsc2V7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOicuLi8uLi9wYWdlcy9pbWcvaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgc2hvd1phblRvcFRpcHMoY29udGVudCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgemFuVG9wVGlwcyA9IHRoaXMuZGF0YS56YW5Ub3BUaXBzIHx8IHt9O1xuICAgIGlmICh6YW5Ub3BUaXBzLnRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoemFuVG9wVGlwcy50aW1lcik7XG4gICAgICB6YW5Ub3BUaXBzLnRpbWVyID0gMDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnNcbiAgICAgIH07XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAnemFuVG9wVGlwcy5zaG93JzogZmFsc2UsXG4gICAgICAgICd6YW5Ub3BUaXBzLnRpbWVyJzogMFxuICAgICAgfSk7XG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbik7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHphblRvcFRpcHM6IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgdGltZXJcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL21lbnUvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6ICcuLi8uLi9pbWFnZXMvc2hhcmUucG5nJ1xuICAgIH1cbiAgfVxufSJdfQ==