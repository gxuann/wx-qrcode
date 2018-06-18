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
    var strEmail = e.detail.value.email;
    var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var strEmail = pattern.test(strEmail);
    var that = this;
    var fb_detail = e.detail.value.detail;
    var fb_email = e.detail.value.email;
    if (strEmail) {
      if (e.detail.value.detail.length == 0) {
        this.showZanTopTips('请完善反馈信息');
      } else {
        wx.request({
          url: 'https://qrcode.gxuann.cn/feedback.php',
          data: {
            '__code__': {
              readme: ''
            },

            fb_email: fb_email,
            fb_detail: fb_detail
          },
          method: 'GET',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function success(res) {
            console.log(fb_email, fb_detail);
            console.log(res.data);
            that.setData({
              $toast: {
                show: true
              }
            });
            setTimeout(function () {
              that.setData({
                $toast: {
                  show: false
                }
              });
            }, 1500), setTimeout(function () {
              that.setData({
                email: '',
                detail: ''
              });
            }, 2000);
          },
          fail: function fail(res) {
            that.setData({
              $toast2: {
                show: true
              }
            });
            setTimeout(function () {
              that.setData({
                $toast2: {
                  show: false
                }
              });
            }, 5000);
          }
        });
      }
    } else {
      this.showZanTopTips('请正确填写邮箱');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiZW1haWwiLCJkZXRhaWwiLCIkdG9hc3QiLCJzaG93IiwiJHRvYXN0MiIsImZvcm1CaW5kc3VibWl0IiwiZSIsInN0ckVtYWlsIiwidmFsdWUiLCJwYXR0ZXJuIiwidGVzdCIsInRoYXQiLCJmYl9kZXRhaWwiLCJmYl9lbWFpbCIsImxlbmd0aCIsInNob3daYW5Ub3BUaXBzIiwid3giLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwic2V0VGltZW91dCIsImZhaWwiLCJjb250ZW50Iiwib3B0aW9ucyIsInphblRvcFRpcHMiLCJ0aW1lciIsImNsZWFyVGltZW91dCIsImR1cmF0aW9uIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFTRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsV0FBTyxFQURIO0FBRUpDLFlBQVEsRUFGSjtBQUdKQyxZQUFRO0FBQ05DLFlBQU07QUFEQSxLQUhKO0FBTUpDLGFBQVM7QUFDUEQsWUFBTTtBQURDO0FBTkwsRztBQVVORSxrQkFBZ0Isd0JBQVVDLENBQVYsRUFBYTtBQUMzQixRQUFJQyxXQUFXRCxFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVIsS0FBOUI7QUFDQSxRQUFJUyxVQUFTLDhGQUFiO0FBQ0EsUUFBSUYsV0FBU0UsUUFBUUMsSUFBUixDQUFhSCxRQUFiLENBQWI7QUFDQSxRQUFJSSxPQUFPLElBQVg7QUFDQSxRQUFJQyxZQUFZTixFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVAsTUFBL0I7QUFDQSxRQUFJWSxXQUFXUCxFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVIsS0FBOUI7QUFDQSxRQUFHTyxRQUFILEVBQVk7QUFDVixVQUFJRCxFQUFFTCxNQUFGLENBQVNPLEtBQVQsQ0FBZVAsTUFBZixDQUFzQmEsTUFBdEIsSUFBZ0MsQ0FBcEMsRUFBdUM7QUFDckMsYUFBS0MsY0FBTCxDQUFvQixTQUFwQjtBQUNELE9BRkQsTUFFTztBQUNMQyxXQUFHQyxPQUFILENBQVc7QUFDVEMsZUFBSyx1Q0FESTtBQUVUbkIsZ0JBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pjLHNCQUFTQSxRQURMO0FBRUpELHVCQUFVQTtBQUZOLFdBRkc7QUFNVE8sa0JBQVEsS0FOQztBQU9UQyxrQkFBUSxFQUFFLGdCQUFnQixtQ0FBbEIsRUFQQztBQVFUQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCQyxvQkFBUUMsR0FBUixDQUFZWCxRQUFaLEVBQXFCRCxTQUFyQjtBQUNBVyxvQkFBUUMsR0FBUixDQUFZRixJQUFJdkIsSUFBaEI7QUFDQVksaUJBQUtjLE9BQUwsQ0FBYTtBQUNadkIsc0JBQVE7QUFDTEMsc0JBQU07QUFERDtBQURJLGFBQWI7QUFLRnVCLHVCQUFXLFlBQU07QUFDZmYsbUJBQUtjLE9BQUwsQ0FBYTtBQUNYdkIsd0JBQVE7QUFDTkMsd0JBQU07QUFEQTtBQURHLGVBQWI7QUFLRCxhQU5ELEVBTUcsSUFOSCxHQU9BdUIsV0FBVyxZQUFNO0FBQ2ZmLG1CQUFLYyxPQUFMLENBQWE7QUFDWHpCLHVCQUFPLEVBREk7QUFFWEMsd0JBQVE7QUFGRyxlQUFiO0FBSUQsYUFMRCxFQUtHLElBTEgsQ0FQQTtBQWFDLFdBN0JRO0FBOEJUMEIsZ0JBQU0sY0FBU0wsR0FBVCxFQUFhO0FBQ2pCWCxpQkFBS2MsT0FBTCxDQUFhO0FBQ2JyQix1QkFBUztBQUNQRCxzQkFBTTtBQURDO0FBREksYUFBYjtBQUtGdUIsdUJBQVcsWUFBTTtBQUNmZixtQkFBS2MsT0FBTCxDQUFhO0FBQ1hyQix5QkFBUztBQUNQRCx3QkFBTTtBQURDO0FBREUsZUFBYjtBQUtELGFBTkQsRUFNRyxJQU5IO0FBT0M7QUEzQ1EsU0FBWDtBQTZDRDtBQUNGLEtBbERELE1Ba0RNO0FBQ0osV0FBS1ksY0FBTCxDQUFvQixTQUFwQjtBQUNEO0FBQ0YsRztBQUNEQSxnQiw0QkFBMkM7QUFBQTs7QUFBQSxRQUE1QmEsT0FBNEIsdUVBQWxCLEVBQWtCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUN6QyxRQUFJQyxhQUFhLEtBQUsvQixJQUFMLENBQVUrQixVQUFWLElBQXdCLEVBQXpDO0FBQ0EsUUFBSUEsV0FBV0MsS0FBZixFQUFzQjtBQUNwQkMsbUJBQWFGLFdBQVdDLEtBQXhCO0FBQ0FELGlCQUFXQyxLQUFYLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRCxRQUFJLE9BQU9GLE9BQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0JBLGdCQUFVO0FBQ1JJLGtCQUFVSjtBQURGLE9BQVY7QUFHRDtBQUNEQSxjQUFVSyxPQUFPQyxNQUFQLENBQWM7QUFDdEJGLGdCQUFVO0FBRFksS0FBZCxFQUVQSixPQUZPLENBQVY7QUFHQSxRQUFJRSxRQUFRTCxXQUFXLFlBQU07QUFDM0IsWUFBS0QsT0FBTCxDQUFhO0FBQ1gsMkJBQW1CLEtBRFI7QUFFWCw0QkFBb0I7QUFGVCxPQUFiO0FBSUQsS0FMVyxFQUtUSSxRQUFRSSxRQUxDLENBQVo7QUFNQSxTQUFLUixPQUFMLENBQWE7QUFDWEssa0JBQVk7QUFDVjNCLGNBQU0sSUFESTtBQUVWeUIsd0JBRlU7QUFHVkMsd0JBSFU7QUFJVkU7QUFKVTtBQURELEtBQWI7QUFRRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0J1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIGVtYWlsOiAnJyxcbiAgICBkZXRhaWw6ICcnLFxuICAgICR0b2FzdDoge1xuICAgICAgc2hvdzogZmFsc2VcbiAgICB9LFxuICAgICR0b2FzdDI6IHtcbiAgICAgIHNob3c6IGZhbHNlXG4gICAgfVxuICB9LFxuICBmb3JtQmluZHN1Ym1pdDogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgc3RyRW1haWwgPSBlLmRldGFpbC52YWx1ZS5lbWFpbDtcbiAgICB2YXIgcGF0dGVybj0gL14oW2EtekEtWjAtOV0rW198XFxffFxcLl0/KSpbYS16QS1aMC05XStAKFthLXpBLVowLTldK1tffFxcX3xcXC5dPykqW2EtekEtWjAtOV0rXFwuW2EtekEtWl17MiwzfSQvO1xuICAgIHZhciBzdHJFbWFpbD1wYXR0ZXJuLnRlc3Qoc3RyRW1haWwpO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgZmJfZGV0YWlsID0gZS5kZXRhaWwudmFsdWUuZGV0YWlsO1xuICAgIHZhciBmYl9lbWFpbCA9IGUuZGV0YWlsLnZhbHVlLmVtYWlsO1xuICAgIGlmKHN0ckVtYWlsKXtcbiAgICAgIGlmIChlLmRldGFpbC52YWx1ZS5kZXRhaWwubGVuZ3RoID09IDApIHtcbiAgICAgICAgdGhpcy5zaG93WmFuVG9wVGlwcygn6K+35a6M5ZaE5Y+N6aaI5L+h5oGvJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3FyY29kZS5neHVhbm4uY24vZmVlZGJhY2sucGhwJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBmYl9lbWFpbDpmYl9lbWFpbCxcbiAgICAgICAgICAgIGZiX2RldGFpbDpmYl9kZXRhaWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGhlYWRlcjogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmJfZW1haWwsZmJfZGV0YWlsKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMTUwMCksXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICBlbWFpbDogJycsXG4gICAgICAgICAgICAgIGRldGFpbDogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgJHRvYXN0Mjoge1xuICAgICAgICAgICAgICBzaG93OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICR0b2FzdDI6IHtcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sIDUwMDApXG4gICAgICAgICAgfSAgXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfWVsc2Uge1xuICAgICAgdGhpcy5zaG93WmFuVG9wVGlwcygn6K+35q2j56Gu5aGr5YaZ6YKu566xJyk7XG4gICAgfVxuICB9LFxuICBzaG93WmFuVG9wVGlwcyhjb250ZW50ID0gJycsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCB6YW5Ub3BUaXBzID0gdGhpcy5kYXRhLnphblRvcFRpcHMgfHwge307XG4gICAgaWYgKHphblRvcFRpcHMudGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh6YW5Ub3BUaXBzLnRpbWVyKTtcbiAgICAgIHphblRvcFRpcHMudGltZXIgPSAwO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBkdXJhdGlvbjogb3B0aW9uc1xuICAgICAgfTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZHVyYXRpb246IDMwMDBcbiAgICB9LCBvcHRpb25zKTtcbiAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICd6YW5Ub3BUaXBzLnNob3cnOiBmYWxzZSxcbiAgICAgICAgJ3phblRvcFRpcHMudGltZXInOiAwXG4gICAgICB9KTtcbiAgICB9LCBvcHRpb25zLmR1cmF0aW9uKTtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgemFuVG9wVGlwczoge1xuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICBjb250ZW50LFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICB0aW1lclxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG59Il19