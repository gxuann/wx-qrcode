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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZW1haWwiLCJkZXRhaWwiLCIkdG9hc3QiLCJzaG93IiwiJHRvYXN0MiIsImZvcm1CaW5kc3VibWl0IiwiZSIsInN0ckVtYWlsIiwidmFsdWUiLCJwYXR0ZXJuIiwidGVzdCIsImxlbmd0aCIsInNob3daYW5Ub3BUaXBzIiwidGFibGVJRCIsIlByb2R1Y3QiLCJ3eCIsIkJhYVMiLCJUYWJsZU9iamVjdCIsInByb2R1Y3QiLCJjcmVhdGUiLCJzZXQiLCJzYXZlIiwidGhlbiIsInJlcyIsInNldERhdGEiLCJzZXRUaW1lb3V0IiwiZXJyIiwiY29udGVudCIsIm9wdGlvbnMiLCJ6YW5Ub3BUaXBzIiwidGltZXIiLCJjbGVhclRpbWVvdXQiLCJkdXJhdGlvbiIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBU0VBLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLFdBQU8sRUFESDtBQUVKQyxZQUFRLEVBRko7QUFHSkMsWUFBUTtBQUNOQyxZQUFNO0FBREEsS0FISjtBQU1KQyxhQUFTO0FBQ1BELFlBQU07QUFEQztBQU5MLEc7QUFVTkUsa0JBQWdCLHdCQUFVQyxDQUFWLEVBQWE7QUFBQTs7QUFDM0IsUUFBSUMsV0FBV0QsRUFBRUwsTUFBRixDQUFTTyxLQUFULENBQWVSLEtBQTlCO0FBQ0EsUUFBSVMsVUFBUyw4RkFBYjtBQUNBLFFBQUlGLFdBQVNFLFFBQVFDLElBQVIsQ0FBYUgsUUFBYixDQUFiO0FBQ0EsUUFBR0EsUUFBSCxFQUFZO0FBQ1YsVUFBSUQsRUFBRUwsTUFBRixDQUFTTyxLQUFULENBQWVQLE1BQWYsQ0FBc0JVLE1BQXRCLElBQWdDLENBQXBDLEVBQXVDO0FBQ3JDLGFBQUtDLGNBQUwsQ0FBb0IsU0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJQyxVQUFVLElBQWQ7QUFDQSxZQUFJQyxVQUFVLElBQUlDLEdBQUdDLElBQUgsQ0FBUUMsV0FBWixDQUF3QkosT0FBeEIsQ0FBZDtBQUNBLFlBQUlLLFVBQVVKLFFBQVFLLE1BQVIsRUFBZDtBQUNBRCxnQkFBUUUsR0FBUixDQUFZLE9BQVosRUFBcUJkLEVBQUVMLE1BQUYsQ0FBU08sS0FBVCxDQUFlUixLQUFwQztBQUNBa0IsZ0JBQVFFLEdBQVIsQ0FBWSxRQUFaLEVBQXNCZCxFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVAsTUFBckM7QUFDQWlCLGdCQUFRRyxJQUFSLEdBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsR0FBRCxFQUFTO0FBQzNCLGdCQUFLQyxPQUFMLENBQWE7QUFDWHRCLG9CQUFRO0FBQ05DLG9CQUFNO0FBREE7QUFERyxXQUFiO0FBS0FzQixxQkFBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYdEIsc0JBQVE7QUFDTkMsc0JBQU07QUFEQTtBQURHLGFBQWI7QUFLRCxXQU5ELEVBTUcsSUFOSCxHQU9Bc0IsV0FBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYeEIscUJBQU8sRUFESTtBQUVYQyxzQkFBUTtBQUZHLGFBQWI7QUFJRCxXQUxELEVBS0csSUFMSCxDQVBBO0FBYUQsU0FuQkQsRUFtQkcsVUFBQ3lCLEdBQUQsRUFBUztBQUNWLGdCQUFLRixPQUFMLENBQWE7QUFDWHBCLHFCQUFTO0FBQ1BELG9CQUFNO0FBREM7QUFERSxXQUFiO0FBS0FzQixxQkFBVyxZQUFNO0FBQ2Ysa0JBQUtELE9BQUwsQ0FBYTtBQUNYcEIsdUJBQVM7QUFDUEQsc0JBQU07QUFEQztBQURFLGFBQWI7QUFLRCxXQU5ELEVBTUcsSUFOSDtBQU9ELFNBaENEO0FBaUNEO0FBQ0YsS0EzQ0QsTUEyQ007QUFDSixXQUFLUyxjQUFMLENBQW9CLFNBQXBCO0FBQ0Q7QUFDRixHO0FBQ0RBLGdCLDRCQUEyQztBQUFBOztBQUFBLFFBQTVCZSxPQUE0Qix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkQyxPQUFjLHVFQUFKLEVBQUk7O0FBQ3pDLFFBQUlDLGFBQWEsS0FBSzlCLElBQUwsQ0FBVThCLFVBQVYsSUFBd0IsRUFBekM7QUFDQSxRQUFJQSxXQUFXQyxLQUFmLEVBQXNCO0FBQ3BCQyxtQkFBYUYsV0FBV0MsS0FBeEI7QUFDQUQsaUJBQVdDLEtBQVgsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELFFBQUksT0FBT0YsT0FBUCxLQUFtQixRQUF2QixFQUFpQztBQUMvQkEsZ0JBQVU7QUFDUkksa0JBQVVKO0FBREYsT0FBVjtBQUdEO0FBQ0RBLGNBQVVLLE9BQU9DLE1BQVAsQ0FBYztBQUN0QkYsZ0JBQVU7QUFEWSxLQUFkLEVBRVBKLE9BRk8sQ0FBVjtBQUdBLFFBQUlFLFFBQVFMLFdBQVcsWUFBTTtBQUMzQixhQUFLRCxPQUFMLENBQWE7QUFDWCwyQkFBbUIsS0FEUjtBQUVYLDRCQUFvQjtBQUZULE9BQWI7QUFJRCxLQUxXLEVBS1RJLFFBQVFJLFFBTEMsQ0FBWjtBQU1BLFNBQUtSLE9BQUwsQ0FBYTtBQUNYSyxrQkFBWTtBQUNWMUIsY0FBTSxJQURJO0FBRVZ3Qix3QkFGVTtBQUdWQyx3QkFIVTtBQUlWRTtBQUpVO0FBREQsS0FBYjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1mbGV4JzogJ0BtaW51aS93eGMtZmxleCcsXG4gICAgICAnd3hjLXRvYXN0JzogJ0BtaW51aS93eGMtdG9hc3QnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgZW1haWw6ICcnLFxuICAgIGRldGFpbDogJycsXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gICAgJHRvYXN0Mjoge1xuICAgICAgc2hvdzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGZvcm1CaW5kc3VibWl0OiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzdHJFbWFpbCA9IGUuZGV0YWlsLnZhbHVlLmVtYWlsO1xuICAgIHZhciBwYXR0ZXJuPSAvXihbYS16QS1aMC05XStbX3xcXF98XFwuXT8pKlthLXpBLVowLTldK0AoW2EtekEtWjAtOV0rW198XFxffFxcLl0/KSpbYS16QS1aMC05XStcXC5bYS16QS1aXXsyLDN9JC87XG4gICAgdmFyIHN0ckVtYWlsPXBhdHRlcm4udGVzdChzdHJFbWFpbCk7XG4gICAgaWYoc3RyRW1haWwpe1xuICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlLmRldGFpbC5sZW5ndGggPT0gMCkge1xuICAgICAgICB0aGlzLnNob3daYW5Ub3BUaXBzKCfor7flrozlloTlj43ppojkv6Hmga8nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0YWJsZUlEID0gNDAxNFxuICAgICAgICBsZXQgUHJvZHVjdCA9IG5ldyB3eC5CYWFTLlRhYmxlT2JqZWN0KHRhYmxlSUQpXG4gICAgICAgIGxldCBwcm9kdWN0ID0gUHJvZHVjdC5jcmVhdGUoKVxuICAgICAgICBwcm9kdWN0LnNldCgnZW1haWwnLCBlLmRldGFpbC52YWx1ZS5lbWFpbClcbiAgICAgICAgcHJvZHVjdC5zZXQoJ2RldGFpbCcsIGUuZGV0YWlsLnZhbHVlLmRldGFpbClcbiAgICAgICAgcHJvZHVjdC5zYXZlKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMTUwMCksXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICAgIGRldGFpbDogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAkdG9hc3QyOiB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgJHRvYXN0Mjoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9ZWxzZSB7XG4gICAgICB0aGlzLnNob3daYW5Ub3BUaXBzKCfor7fmraPnoa7loavlhpnpgq7nrrEnKTtcbiAgICB9XG4gIH0sXG4gIHNob3daYW5Ub3BUaXBzKGNvbnRlbnQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHphblRvcFRpcHMgPSB0aGlzLmRhdGEuemFuVG9wVGlwcyB8fCB7fTtcbiAgICBpZiAoemFuVG9wVGlwcy50aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHphblRvcFRpcHMudGltZXIpO1xuICAgICAgemFuVG9wVGlwcy50aW1lciA9IDA7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zXG4gICAgICB9O1xuICAgIH1cbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBkdXJhdGlvbjogMzAwMFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ3phblRvcFRpcHMuc2hvdyc6IGZhbHNlLFxuICAgICAgICAnemFuVG9wVGlwcy50aW1lcic6IDBcbiAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMuZHVyYXRpb24pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB6YW5Ub3BUaXBzOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHRpbWVyXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0iXX0=