'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    email: '',
    detail: '',
    $toast: {
      show: false
    },
    $toast2: {
      show: false
    }
  },
  formBindsubmit: function formBindsubmit(e) {
    var _this = this;

    if (e.detail.value.detail.length == 0 | e.detail.value.email.length == 0) {
      this.showZanTopTips('请完善反馈信息');
    } else {
      var tableID = 4014;
      var Product = new wx.BaaS.TableObject(tableID);
      var product = Product.create();
      product.set('email', e.detail.value.email);
      product.set('detail', e.detail.value.detail);
      product.save().then(function (res) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        }), _this.setData({
          email: '',
          detail: ''
        });
      }, function (err) {
        wx.showModal({
          content: '提交失败，请检查网络设置！',
          showCancel: false
        });
      });
    }
  },
  showZanTopTips: function showZanTopTips() {
    var _this2 = this;

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
      _this2.setData({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZW1haWwiLCJkZXRhaWwiLCIkdG9hc3QiLCJzaG93IiwiJHRvYXN0MiIsImZvcm1CaW5kc3VibWl0IiwiZSIsInZhbHVlIiwibGVuZ3RoIiwic2hvd1phblRvcFRpcHMiLCJ0YWJsZUlEIiwiUHJvZHVjdCIsInd4IiwiQmFhUyIsIlRhYmxlT2JqZWN0IiwicHJvZHVjdCIsImNyZWF0ZSIsInNldCIsInNhdmUiLCJ0aGVuIiwicmVzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXREYXRhIiwiZXJyIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiT2JqZWN0IiwiYXNzaWduIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBU0VBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxZQUFRLEVBRko7QUFHSkMsWUFBUTtBQUNOQyxZQUFNO0FBREEsS0FISjtBQU1KQyxhQUFTO0FBQ1BELFlBQU07QUFEQztBQU5MLEc7QUFVTkUsa0JBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFBQTs7QUFDM0IsUUFBSUEsRUFBRUwsTUFBRixDQUFTTSxLQUFULENBQWVOLE1BQWYsQ0FBc0JPLE1BQXRCLElBQWdDLENBQWhDLEdBQW9DRixFQUFFTCxNQUFGLENBQVNNLEtBQVQsQ0FBZVAsS0FBZixDQUFxQlEsTUFBckIsSUFBK0IsQ0FBdkUsRUFBMEU7QUFDeEUsV0FBS0MsY0FBTCxDQUFvQixTQUFwQjtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUlDLFVBQVUsSUFBZDtBQUNBLFVBQUlDLFVBQVUsSUFBSUMsR0FBR0MsSUFBSCxDQUFRQyxXQUFaLENBQXdCSixPQUF4QixDQUFkO0FBQ0EsVUFBSUssVUFBVUosUUFBUUssTUFBUixFQUFkO0FBQ0FELGNBQVFFLEdBQVIsQ0FBWSxPQUFaLEVBQXFCWCxFQUFFTCxNQUFGLENBQVNNLEtBQVQsQ0FBZVAsS0FBcEM7QUFDQWUsY0FBUUUsR0FBUixDQUFZLFFBQVosRUFBc0JYLEVBQUVMLE1BQUYsQ0FBU00sS0FBVCxDQUFlTixNQUFyQztBQUNBYyxjQUFRRyxJQUFSLEdBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsR0FBRCxFQUFTO0FBQzNCUixXQUFHUyxTQUFILENBQWE7QUFDWEMsaUJBQU8sTUFESTtBQUVYQyxnQkFBTSxTQUZLO0FBR1hDLG9CQUFVO0FBSEMsU0FBYixHQUtBLE1BQUtDLE9BQUwsQ0FBYTtBQUNYekIsaUJBQU8sRUFESTtBQUVYQyxrQkFBUTtBQUZHLFNBQWIsQ0FMQTtBQVNELE9BVkQsRUFVRyxVQUFDeUIsR0FBRCxFQUFTO0FBQ1ZkLFdBQUdlLFNBQUgsQ0FBYTtBQUNYQyxtQkFBUyxlQURFO0FBRVhDLHNCQUFZO0FBRkQsU0FBYjtBQUlELE9BZkQ7QUFnQkQ7QUFDRixHO0FBQ0RwQixnQiw0QkFBMkM7QUFBQTs7QUFBQSxRQUE1Qm1CLE9BQTRCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRFLE9BQWMsdUVBQUosRUFBSTs7QUFDekMsUUFBSUMsYUFBYSxLQUFLaEMsSUFBTCxDQUFVZ0MsVUFBVixJQUF3QixFQUF6QztBQUNBLFFBQUlBLFdBQVdDLEtBQWYsRUFBc0I7QUFDcEJDLG1CQUFhRixXQUFXQyxLQUF4QjtBQUNBRCxpQkFBV0MsS0FBWCxHQUFtQixDQUFuQjtBQUNEO0FBQ0QsUUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CQSxnQkFBVTtBQUNSTixrQkFBVU07QUFERixPQUFWO0FBR0Q7QUFDREEsY0FBVUksT0FBT0MsTUFBUCxDQUFjO0FBQ3RCWCxnQkFBVTtBQURZLEtBQWQsRUFFUE0sT0FGTyxDQUFWO0FBR0EsUUFBSUUsUUFBUUksV0FBVyxZQUFNO0FBQzNCLGFBQUtYLE9BQUwsQ0FBYTtBQUNYLDJCQUFtQixLQURSO0FBRVgsNEJBQW9CO0FBRlQsT0FBYjtBQUlELEtBTFcsRUFLVEssUUFBUU4sUUFMQyxDQUFaO0FBTUEsU0FBS0MsT0FBTCxDQUFhO0FBQ1hNLGtCQUFZO0FBQ1Y1QixjQUFNLElBREk7QUFFVnlCLHdCQUZVO0FBR1ZFLHdCQUhVO0FBSVZFO0FBSlU7QUFERCxLQUFiO0FBUUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXG4gICAgICAnd3hjLWZsZXgnOiAnQG1pbnVpL3d4Yy1mbGV4JyxcbiAgICAgICd3eGMtdG9hc3QnOiAnQG1pbnVpL3d4Yy10b2FzdCdcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBlbWFpbDogJycsXG4gICAgZGV0YWlsOiAnJyxcbiAgICAkdG9hc3Q6IHtcbiAgICAgIHNob3c6IGZhbHNlXG4gICAgfSxcbiAgICAkdG9hc3QyOiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZm9ybUJpbmRzdWJtaXQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCB8IGUuZGV0YWlsLnZhbHVlLmVtYWlsLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnNob3daYW5Ub3BUaXBzKCfor7flrozlloTlj43ppojkv6Hmga8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhYmxlSUQgPSA0MDE0XG4gICAgICBsZXQgUHJvZHVjdCA9IG5ldyB3eC5CYWFTLlRhYmxlT2JqZWN0KHRhYmxlSUQpXG4gICAgICBsZXQgcHJvZHVjdCA9IFByb2R1Y3QuY3JlYXRlKClcbiAgICAgIHByb2R1Y3Quc2V0KCdlbWFpbCcsIGUuZGV0YWlsLnZhbHVlLmVtYWlsKVxuICAgICAgcHJvZHVjdC5zZXQoJ2RldGFpbCcsIGUuZGV0YWlsLnZhbHVlLmRldGFpbClcbiAgICAgIHByb2R1Y3Quc2F2ZSgpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q5Lqk5oiQ5YqfJyxcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgIGRldGFpbDogJydcbiAgICAgICAgfSlcbiAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICBjb250ZW50OiAn5o+Q5Lqk5aSx6LSl77yM6K+35qOA5p+l572R57uc6K6+572u77yBJyxcbiAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIHNob3daYW5Ub3BUaXBzKGNvbnRlbnQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHphblRvcFRpcHMgPSB0aGlzLmRhdGEuemFuVG9wVGlwcyB8fCB7fTtcbiAgICBpZiAoemFuVG9wVGlwcy50aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHphblRvcFRpcHMudGltZXIpO1xuICAgICAgemFuVG9wVGlwcy50aW1lciA9IDA7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zXG4gICAgICB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ3phblRvcFRpcHMuc2hvdyc6IGZhbHNlLFxuICAgICAgICAnemFuVG9wVGlwcy50aW1lcic6IDBcbiAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB6YW5Ub3BUaXBzOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHRpbWVyXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0iXX0=