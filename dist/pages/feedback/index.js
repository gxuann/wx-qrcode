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

    var strEmail = e.detail.value.email;
    var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var strEmail = pattern.test(strEmail);
    if (strEmail) {
      if (e.detail.value.detail.length == 0) {
        this.showZanTopTips('请完善反馈信息');
      } else {
        var tableID = 4014;
        var Product = new wx.BaaS.TableObject(tableID);
        var product = Product.create();
        product.set('email', e.detail.value.email);
        product.set('detail', e.detail.value.detail);
        product.save().then(function (res) {
          _this.setData({
            $toast: {
              show: true
            }
          });
          setTimeout(function () {
            _this.setData({
              $toast: {
                show: false
              }
            });
          }, 1500), setTimeout(function () {
            _this.setData({
              email: '',
              detail: ''
            });
          }, 2000);
        }, function (err) {
          _this.setData({
            $toast2: {
              show: true
            }
          });
          setTimeout(function () {
            _this.setData({
              $toast2: {
                show: false
              }
            });
          }, 2000);
        });
      }
    } else {
      this.showZanTopTips('请正确填写邮箱');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZW1haWwiLCJkZXRhaWwiLCIkdG9hc3QiLCJzaG93IiwiJHRvYXN0MiIsImZvcm1CaW5kc3VibWl0IiwiZSIsInN0ckVtYWlsIiwidmFsdWUiLCJwYXR0ZXJuIiwidGVzdCIsImxlbmd0aCIsInNob3daYW5Ub3BUaXBzIiwidGFibGVJRCIsIlByb2R1Y3QiLCJ3eCIsIkJhYVMiLCJUYWJsZU9iamVjdCIsInByb2R1Y3QiLCJjcmVhdGUiLCJzZXQiLCJzYXZlIiwidGhlbiIsInJlcyIsInNldERhdGEiLCJzZXRUaW1lb3V0IiwiZXJyIiwiY29udGVudCIsIm9wdGlvbnMiLCJ6YW5Ub3BUaXBzIiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJkdXJhdGlvbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBU0VBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxZQUFRLEVBRko7QUFHSkMsWUFBUTtBQUNOQyxZQUFNO0FBREEsS0FISjtBQU1KQyxhQUFTO0FBQ1BELFlBQU07QUFEQztBQU5MLEc7QUFVTkUsa0JBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFBQTs7QUFDM0IsUUFBSUMsV0FBV0QsRUFBRUwsTUFBRixDQUFTTyxLQUFULENBQWVSLEtBQTlCO0FBQ0EsUUFBSVMsVUFBUyw4RkFBYjtBQUNBLFFBQUlGLFdBQVNFLFFBQVFDLElBQVIsQ0FBYUgsUUFBYixDQUFiO0FBQ0EsUUFBR0EsUUFBSCxFQUFZO0FBQ1YsVUFBSUQsRUFBRUwsTUFBRixDQUFTTyxLQUFULENBQWVQLE1BQWYsQ0FBc0JVLE1BQXRCLElBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLGFBQUtDLGNBQUwsQ0FBb0IsU0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxVQUFVLElBQWQ7QUFDQSxZQUFJQyxVQUFVLElBQUlDLEdBQUdDLElBQUgsQ0FBUUMsV0FBWixDQUF3QkosT0FBeEIsQ0FBZDtBQUNBLFlBQUlLLFVBQVVKLFFBQVFLLE1BQVIsRUFBZDtBQUNBRCxnQkFBUUUsR0FBUixDQUFZLE9BQVosRUFBcUJkLEVBQUVMLE1BQUYsQ0FBU08sS0FBVCxDQUFlUixLQUFwQztBQUNBa0IsZ0JBQVFFLEdBQVIsQ0FBWSxRQUFaLEVBQXNCZCxFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVAsTUFBckM7QUFDQWlCLGdCQUFRRyxJQUFSLEdBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsR0FBRCxFQUFTO0FBQzNCLGdCQUFLQyxPQUFMLENBQWE7QUFDWHRCLG9CQUFRO0FBQ05DLG9CQUFNO0FBREE7QUFERyxXQUFiO0FBS0FzQixxQkFBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYdEIsc0JBQVE7QUFDTkMsc0JBQU07QUFEQTtBQURHLGFBQWI7QUFLRCxXQU5ELEVBTUcsSUFOSCxHQU9Bc0IsV0FBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYeEIscUJBQU8sRUFESTtBQUVYQyxzQkFBUTtBQUZHLGFBQWI7QUFJRCxXQUxELEVBS0csSUFMSCxDQVBBO0FBYUQsU0FuQkQsRUFtQkcsVUFBQ3lCLEdBQUQsRUFBUztBQUNWLGdCQUFLRixPQUFMLENBQWE7QUFDWHBCLHFCQUFTO0FBQ1BELG9CQUFNO0FBREM7QUFERSxXQUFiO0FBS0FzQixxQkFBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYcEIsdUJBQVM7QUFDUEQsc0JBQU07QUFEQztBQURFLGFBQWI7QUFLRCxXQU5ELEVBTUcsSUFOSDtBQU9ELFNBaENEO0FBaUNEO0FBQ0YsS0EzQ0QsTUEyQ007QUFDSixXQUFLUyxjQUFMLENBQW9CLFNBQXBCO0FBQ0Q7QUFDRixHO0FBQ0RBLGdCLDRCQUEyQztBQUFBOztBQUFBLFFBQTVCZSxPQUE0Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQ3pDLFFBQUlDLGFBQWEsS0FBSzlCLElBQUwsQ0FBVThCLFVBQVYsSUFBd0IsRUFBekM7QUFDQSxRQUFJQSxXQUFXQyxLQUFmLEVBQXNCO0FBQ3BCQyxtQkFBYUYsV0FBV0MsS0FBeEI7QUFDQUQsaUJBQVdDLEtBQVgsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELFFBQUksT0FBT0YsT0FBUCxLQUFtQixRQUF2QixFQUFpQztBQUMvQkEsZ0JBQVU7QUFDUkksa0JBQVVKO0FBREYsT0FBVjtBQUdEO0FBQ0RBLGNBQVVLLE9BQU9DLE1BQVAsQ0FBYztBQUN0QkYsZ0JBQVU7QUFEWSxLQUFkLEVBRVBKLE9BRk8sQ0FBVjtBQUdBLFFBQUlFLFFBQVFMLFdBQVcsWUFBTTtBQUMzQixhQUFLRCxPQUFMLENBQWE7QUFDWCwyQkFBbUIsS0FEUjtBQUVYLDRCQUFvQjtBQUZULE9BQWI7QUFJRCxLQUxXLEVBS1RJLFFBQVFJLFFBTEMsQ0FBWjtBQU1BLFNBQUtSLE9BQUwsQ0FBYTtBQUNYSyxrQkFBWTtBQUNWMUIsY0FBTSxJQURJO0FBRVZ3Qix3QkFGVTtBQUdWQyx3QkFIVTtBQUlWRTtBQUpVO0FBREQsS0FBYjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXHJcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxyXG4gICAgICAnd3hjLXRvYXN0JzogJ0BtaW51aS93eGMtdG9hc3QnXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICBlbWFpbDogJycsXHJcbiAgICBkZXRhaWw6ICcnLFxyXG4gICAgJHRvYXN0OiB7XHJcbiAgICAgIHNob3c6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgJHRvYXN0Mjoge1xyXG4gICAgICBzaG93OiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybUJpbmRzdWJtaXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIgc3RyRW1haWwgPSBlLmRldGFpbC52YWx1ZS5lbWFpbDtcclxuICAgIHZhciBwYXR0ZXJuPSAvXihbYS16QS1aMC05XStbX3xcXF98XFwuXT8pKlthLXpBLVowLTldK0AoW2EtekEtWjAtOV0rW198XFxffFxcLl0/KSpbYS16QS1aMC05XStcXC5bYS16QS1aXXsyLDN9JC87XHJcbiAgICB2YXIgc3RyRW1haWw9cGF0dGVybi50ZXN0KHN0ckVtYWlsKTtcclxuICAgIGlmKHN0ckVtYWlsKXtcclxuICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1phblRvcFRpcHMoJ+ivt+WujOWWhOWPjemmiOS/oeaBrycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB0YWJsZUlEID0gNDAxNFxyXG4gICAgICAgIGxldCBQcm9kdWN0ID0gbmV3IHd4LkJhYVMuVGFibGVPYmplY3QodGFibGVJRClcclxuICAgICAgICBsZXQgcHJvZHVjdCA9IFByb2R1Y3QuY3JlYXRlKClcclxuICAgICAgICBwcm9kdWN0LnNldCgnZW1haWwnLCBlLmRldGFpbC52YWx1ZS5lbWFpbClcclxuICAgICAgICBwcm9kdWN0LnNldCgnZGV0YWlsJywgZS5kZXRhaWwudmFsdWUuZGV0YWlsKVxyXG4gICAgICAgIHByb2R1Y3Quc2F2ZSgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgJHRvYXN0OiB7XHJcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgJHRvYXN0OiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sIDE1MDApLFxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgZW1haWw6ICcnLFxyXG4gICAgICAgICAgICAgIGRldGFpbDogJydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sIDIwMDApXHJcbiAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgJHRvYXN0Mjoge1xyXG4gICAgICAgICAgICAgIHNob3c6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICR0b2FzdDI6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSwgMjAwMClcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd1phblRvcFRpcHMoJ+ivt+ato+ehruWhq+WGmemCrueusScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hvd1phblRvcFRpcHMoY29udGVudCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgIGxldCB6YW5Ub3BUaXBzID0gdGhpcy5kYXRhLnphblRvcFRpcHMgfHwge307XHJcbiAgICBpZiAoemFuVG9wVGlwcy50aW1lcikge1xyXG4gICAgICBjbGVhclRpbWVvdXQoemFuVG9wVGlwcy50aW1lcik7XHJcbiAgICAgIHphblRvcFRpcHMudGltZXIgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJykge1xyXG4gICAgICBvcHRpb25zID0ge1xyXG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgIGR1cmF0aW9uOiAzMDAwXHJcbiAgICB9LCBvcHRpb25zKTtcclxuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICd6YW5Ub3BUaXBzLnNob3cnOiBmYWxzZSxcclxuICAgICAgICAnemFuVG9wVGlwcy50aW1lcic6IDBcclxuICAgICAgfSk7XHJcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIHphblRvcFRpcHM6IHtcclxuICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgIGNvbnRlbnQsXHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICB0aW1lclxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=