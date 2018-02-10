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
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJRUiIsInJlcXVpcmUiLCJkYXRhIiwiaW1hZ2VQYXRoIiwiJHRvYXN0Iiwic2hvdyIsImZvcm1CaW5kc3VibWl0IiwiZSIsImdldEFwcCIsImdsb2JhbERhdGEiLCJnZW5kZXRhaWwiLCJkZXRhaWwiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJzaG93WmFuVG9wVGlwcyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbnRlbnQiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiZHVyYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRUaW1lb3V0Iiwic2V0RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxLQUFLQyxRQUFRLHVCQUFSLENBQVQ7O0FBVUVDLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLGVBQVcsRUFEUDtBQUVKQyxZQUFRO0FBQ05DLFlBQU07QUFEQTtBQUZKLEc7QUFNTkMsa0JBQWdCLHdCQUFTQyxDQUFULEVBQVc7QUFDekJDLGFBQVNDLFVBQVQsQ0FBb0JDLFNBQXBCLEdBQThCSCxFQUFFSSxNQUFGLENBQVNDLEtBQVQsQ0FBZUQsTUFBN0M7QUFDQUUsWUFBUUMsR0FBUixDQUFZTixTQUFTQyxVQUFULENBQW9CQyxTQUFoQztBQUNBLFFBQUlILEVBQUVJLE1BQUYsQ0FBU0MsS0FBVCxDQUFlRCxNQUFmLENBQXNCSSxNQUF0QixJQUFnQyxDQUFwQyxFQUF1QztBQUNyQyxXQUFLQyxjQUFMLENBQW9CLFFBQXBCO0FBQ0QsS0FGRCxNQUVLO0FBQ0hDLFNBQUdDLFVBQUgsQ0FBYztBQUNaQyxhQUFJO0FBRFEsT0FBZDtBQUdEO0FBQ0YsRztBQUNESCxnQiw0QkFBMkM7QUFBQTs7QUFBQSxRQUE1QkksT0FBNEIsdUVBQWxCLEVBQWtCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUN6QyxRQUFJQyxhQUFhLEtBQUtwQixJQUFMLENBQVVvQixVQUFWLElBQXdCLEVBQXpDO0FBQ0EsUUFBSUEsV0FBV0MsS0FBZixFQUFzQjtBQUNwQkMsbUJBQWFGLFdBQVdDLEtBQXhCO0FBQ0FELGlCQUFXQyxLQUFYLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRCxRQUFJLE9BQU9GLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0JBLGdCQUFVO0FBQ1JJLGtCQUFVSjtBQURGLE9BQVY7QUFHRDtBQUNEQSxjQUFVSyxPQUFPQyxNQUFQLENBQWM7QUFDdEJGLGdCQUFVO0FBRFksS0FBZCxFQUVQSixPQUZPLENBQVY7QUFHQSxRQUFJRSxRQUFRSyxXQUFXLFlBQU07QUFDM0IsWUFBS0MsT0FBTCxDQUFhO0FBQ1gsMkJBQW1CLEtBRFI7QUFFWCw0QkFBb0I7QUFGVCxPQUFiO0FBSUQsS0FMVyxFQUtUUixRQUFRSSxRQUxDLENBQVo7QUFNQSxTQUFLSSxPQUFMLENBQWE7QUFDWFAsa0JBQVk7QUFDVmpCLGNBQU0sSUFESTtBQUVWZSx3QkFGVTtBQUdWQyx3QkFIVTtBQUlWRTtBQUpVO0FBREQsS0FBYjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBRUiA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9xcmNvZGUuanNcIik7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGltYWdlUGF0aDogJycsXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gIH0sXG4gIGZvcm1CaW5kc3VibWl0OiBmdW5jdGlvbihlKXtcbiAgICBnZXRBcHAoKS5nbG9iYWxEYXRhLmdlbmRldGFpbD1lLmRldGFpbC52YWx1ZS5kZXRhaWw7XG4gICAgY29uc29sZS5sb2coZ2V0QXBwKCkuZ2xvYmFsRGF0YS5nZW5kZXRhaWwpXG4gICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zaG93WmFuVG9wVGlwcygn5YaF5a655LiN6IO95Li656m6Jyk7XG4gICAgfWVsc2V7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOicuLi8uLi9wYWdlcy9pbWcvaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgc2hvd1phblRvcFRpcHMoY29udGVudCA9ICcnLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgemFuVG9wVGlwcyA9IHRoaXMuZGF0YS56YW5Ub3BUaXBzIHx8IHt9O1xuICAgIGlmICh6YW5Ub3BUaXBzLnRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoemFuVG9wVGlwcy50aW1lcik7XG4gICAgICB6YW5Ub3BUaXBzLnRpbWVyID0gMDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgZHVyYXRpb246IG9wdGlvbnNcbiAgICAgIH07XG4gICAgfVxuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGR1cmF0aW9uOiAzMDAwXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAnemFuVG9wVGlwcy5zaG93JzogZmFsc2UsXG4gICAgICAgICd6YW5Ub3BUaXBzLnRpbWVyJzogMFxuICAgICAgfSk7XG4gICAgfSwgb3B0aW9ucy5kdXJhdGlvbik7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHphblRvcFRpcHM6IHtcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgY29udGVudCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgdGltZXJcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufSJdfQ==