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

    if (e.detail.value.detail.length == 0 | e.detail.value.length == 0) {
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
    // 如果已经有一个计时器在了，就清理掉先
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZW1haWwiLCJkZXRhaWwiLCIkdG9hc3QiLCJzaG93IiwiJHRvYXN0MiIsImZvcm1CaW5kc3VibWl0IiwiZSIsInZhbHVlIiwibGVuZ3RoIiwic2hvd1phblRvcFRpcHMiLCJ0YWJsZUlEIiwiUHJvZHVjdCIsInd4IiwiQmFhUyIsIlRhYmxlT2JqZWN0IiwicHJvZHVjdCIsImNyZWF0ZSIsInNldCIsInNhdmUiLCJ0aGVuIiwicmVzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXREYXRhIiwiZXJyIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJvcHRpb25zIiwiemFuVG9wVGlwcyIsInRpbWVyIiwiY2xlYXJUaW1lb3V0IiwiT2JqZWN0IiwiYXNzaWduIiwic2V0VGltZW91dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBU0VBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxZQUFRLEVBRko7QUFHSkMsWUFBUTtBQUNOQyxZQUFNO0FBREEsS0FISjtBQU1KQyxhQUFTO0FBQ1BELFlBQU07QUFEQztBQU5MLEc7QUFVTkUsa0JBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFBQTs7QUFDM0IsUUFBSUEsRUFBRUwsTUFBRixDQUFTTSxLQUFULENBQWVOLE1BQWYsQ0FBc0JPLE1BQXRCLElBQWdDLENBQWhDLEdBQW9DRixFQUFFTCxNQUFGLENBQVNNLEtBQVQsQ0FBZUMsTUFBZixJQUF5QixDQUFqRSxFQUFvRTtBQUNsRSxXQUFLQyxjQUFMLENBQW9CLFNBQXBCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSUMsVUFBVSxJQUFkO0FBQ0EsVUFBSUMsVUFBVSxJQUFJQyxHQUFHQyxJQUFILENBQVFDLFdBQVosQ0FBd0JKLE9BQXhCLENBQWQ7QUFDQSxVQUFJSyxVQUFVSixRQUFRSyxNQUFSLEVBQWQ7QUFDQUQsY0FBUUUsR0FBUixDQUFZLE9BQVosRUFBcUJYLEVBQUVMLE1BQUYsQ0FBU00sS0FBVCxDQUFlUCxLQUFwQztBQUNBZSxjQUFRRSxHQUFSLENBQVksUUFBWixFQUFzQlgsRUFBRUwsTUFBRixDQUFTTSxLQUFULENBQWVOLE1BQXJDO0FBQ0FjLGNBQVFHLElBQVIsR0FBZUMsSUFBZixDQUFvQixVQUFDQyxHQUFELEVBQVM7QUFDM0JSLFdBQUdTLFNBQUgsQ0FBYTtBQUNYQyxpQkFBTyxNQURJO0FBRVhDLGdCQUFNLFNBRks7QUFHWEMsb0JBQVU7QUFIQyxTQUFiLEdBS0UsTUFBS0MsT0FBTCxDQUFhO0FBQ1h6QixpQkFBTyxFQURJO0FBRVhDLGtCQUFRO0FBRkcsU0FBYixDQUxGO0FBU0QsT0FWRCxFQVVHLFVBQUN5QixHQUFELEVBQVM7QUFDVmQsV0FBR2UsU0FBSCxDQUFhO0FBQ1hDLG1CQUFTLGVBREU7QUFFWEMsc0JBQVk7QUFGRCxTQUFiO0FBSUQsT0FmRDtBQWdCRDtBQUNGLEc7QUFDRHBCLGdCLDRCQUEyQztBQUFBOztBQUFBLFFBQTVCbUIsT0FBNEIsdUVBQWxCLEVBQWtCO0FBQUEsUUFBZEUsT0FBYyx1RUFBSixFQUFJOztBQUN6QyxRQUFJQyxhQUFhLEtBQUtoQyxJQUFMLENBQVVnQyxVQUFWLElBQXdCLEVBQXpDO0FBQ0E7QUFDQSxRQUFJQSxXQUFXQyxLQUFmLEVBQXNCO0FBQ3BCQyxtQkFBYUYsV0FBV0MsS0FBeEI7QUFDQUQsaUJBQVdDLEtBQVgsR0FBbUIsQ0FBbkI7QUFDRDs7QUFFRCxRQUFJLE9BQU9GLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0JBLGdCQUFVO0FBQ1JOLGtCQUFVTTtBQURGLE9BQVY7QUFHRDtBQUNEQSxjQUFVSSxPQUFPQyxNQUFQLENBQWM7QUFDdEJYLGdCQUFVO0FBRFksS0FBZCxFQUVQTSxPQUZPLENBQVY7QUFHQSxRQUFJRSxRQUFRSSxXQUFXLFlBQU07QUFDM0IsYUFBS1gsT0FBTCxDQUFhO0FBQ1gsMkJBQW1CLEtBRFI7QUFFWCw0QkFBb0I7QUFGVCxPQUFiO0FBSUQsS0FMVyxFQUtUSyxRQUFRTixRQUxDLENBQVo7QUFNQSxTQUFLQyxPQUFMLENBQWE7QUFDWE0sa0JBQVk7QUFDVjVCLGNBQU0sSUFESTtBQUVWeUIsd0JBRlU7QUFHVkUsd0JBSFU7QUFJVkU7QUFKVTtBQURELEtBQWI7QUFRRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGVtYWlsOiAnJyxcbiAgICBkZXRhaWw6ICcnLFxuICAgICR0b2FzdDoge1xuICAgICAgc2hvdzogZmFsc2VcbiAgICB9LFxuICAgICR0b2FzdDI6IHtcbiAgICAgIHNob3c6IGZhbHNlXG4gICAgfVxuICB9LFxuICBmb3JtQmluZHN1Ym1pdDogZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5kZXRhaWwudmFsdWUuZGV0YWlsLmxlbmd0aCA9PSAwIHwgZS5kZXRhaWwudmFsdWUubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc2hvd1phblRvcFRpcHMoJ+ivt+WujOWWhOWPjemmiOS/oeaBrycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGFibGVJRCA9IDQwMTRcbiAgICAgIGxldCBQcm9kdWN0ID0gbmV3IHd4LkJhYVMuVGFibGVPYmplY3QodGFibGVJRClcbiAgICAgIGxldCBwcm9kdWN0ID0gUHJvZHVjdC5jcmVhdGUoKVxuICAgICAgcHJvZHVjdC5zZXQoJ2VtYWlsJywgZS5kZXRhaWwudmFsdWUuZW1haWwpXG4gICAgICBwcm9kdWN0LnNldCgnZGV0YWlsJywgZS5kZXRhaWwudmFsdWUuZGV0YWlsKVxuICAgICAgcHJvZHVjdC5zYXZlKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DkuqTmiJDlip8nLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KSxcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgZGV0YWlsOiAnJ1xuICAgICAgICAgIH0pXG4gICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgY29udGVudDogJ+aPkOS6pOWksei0pe+8jOivt+ajgOafpee9kee7nOiuvue9ru+8gScsXG4gICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBzaG93WmFuVG9wVGlwcyhjb250ZW50ID0gJycsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB6YW5Ub3BUaXBzID0gdGhpcy5kYXRhLnphblRvcFRpcHMgfHwge307XG4gICAgLy8g5aaC5p6c5bey57uP5pyJ5LiA5Liq6K6h5pe25Zmo5Zyo5LqG77yM5bCx5riF55CG5o6J5YWIXG4gICAgaWYgKHphblRvcFRpcHMudGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh6YW5Ub3BUaXBzLnRpbWVyKTtcbiAgICAgIHphblRvcFRpcHMudGltZXIgPSAwO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zXG4gICAgICB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ3phblRvcFRpcHMuc2hvdyc6IGZhbHNlLFxuICAgICAgICAnemFuVG9wVGlwcy50aW1lcic6IDBcbiAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB6YW5Ub3BUaXBzOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHRpbWVyXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0iXX0=