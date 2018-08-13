'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sliderWidth = 105;
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    tabs: ["使用方法", "ChangeLog"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    isEgg: 0
  },
  onLoad: function onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function tabClick(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  isTap: function isTap(e) {
    var that = this;
    var isEgg = this.data.isEgg;
    wx.vibrateShort({
      success: function success(e) {
        if (isEgg < 7) {
          that.setData({
            isEgg: isEgg + 1
          });
        }
        switch (isEgg) {
          case 1:
            wx.showToast({
              title: '嗯？🤔',
              icon: 'none',
              duration: 1000
            });
            break;
          case 2:
            wx.showToast({
              title: '嗯!😶',
              icon: 'none',
              duration: 1000
            });
            break;
          case 3:
            wx.showToast({
              title: 'What？😮',
              icon: 'none',
              duration: 1000
            });
            break;
          case 4:
            wx.showToast({
              title: '这里没有东西！😑',
              icon: 'none',
              duration: 1000
            });
            break;
          case 5:
            wx.showToast({
              title: '别点了 😵',
              icon: 'none',
              duration: 1000
            });
            break;
          case 6:
            wx.showToast({
              title: 'congratulations！👏',
              icon: 'none',
              duration: 1000
            });
            break;
          default:
            wx.showToast({
              title: '……',
              icon: 'none',
              duration: 1000
            });
            break;
        }
      }
    });
    if (isEgg >= 6) {
      setTimeout(function () {
        wx.navigateTo({
          url: '../../pages/egg/index'
        });
      }, 1000);
    }
    console.log(isEgg);
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'QR二维码',
      path: '/pages/menu/index',
      imageUrl: 'https://images.gxuann.cn/qrcode/share.png'
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsImRhdGEiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0IiwiaXNFZ2ciLCJvbkxvYWQiLCJ0aGF0Iiwid3giLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsInNldERhdGEiLCJ3aW5kb3dXaWR0aCIsImxlbmd0aCIsInRhYkNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJvZmZzZXRMZWZ0IiwiaWQiLCJpc1RhcCIsInZpYnJhdGVTaG9ydCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJwYXRoIiwiaW1hZ2VVcmwiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsY0FBYyxHQUFsQjs7QUFXRUMsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsVUFBTSxDQUFDLE1BQUQsRUFBUyxXQUFULENBREY7QUFFRkMsaUJBQWEsQ0FGWDtBQUdGQyxrQkFBYyxDQUhaO0FBSUZDLGdCQUFZLENBSlY7QUFLRkMsV0FBTztBQUxMLEc7QUFPTkMsVUFBUSxrQkFBWTtBQUNsQixRQUFJQyxPQUFPLElBQVg7QUFDQUMsT0FBR0MsYUFBSCxDQUFpQjtBQUNiQyxlQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDbkJKLGFBQUtLLE9BQUwsQ0FBYTtBQUNUUixzQkFBWSxDQUFDTyxJQUFJRSxXQUFKLEdBQWtCTixLQUFLUCxJQUFMLENBQVVDLElBQVYsQ0FBZWEsTUFBakMsR0FBMENmLFdBQTNDLElBQTBELENBRDdEO0FBRVRJLHdCQUFjUSxJQUFJRSxXQUFKLEdBQWtCTixLQUFLUCxJQUFMLENBQVVDLElBQVYsQ0FBZWEsTUFBakMsR0FBMENQLEtBQUtQLElBQUwsQ0FBVUU7QUFGekQsU0FBYjtBQUlIO0FBTlksS0FBakI7QUFRRCxHO0FBQ0RhLFlBQVUsa0JBQVVDLENBQVYsRUFBYTtBQUNuQixTQUFLSixPQUFMLENBQWE7QUFDVFQsb0JBQWNhLEVBQUVDLGFBQUYsQ0FBZ0JDLFVBRHJCO0FBRVRoQixtQkFBYWMsRUFBRUMsYUFBRixDQUFnQkU7QUFGcEIsS0FBYjtBQUlILEc7QUFDREMsU0FBTyxlQUFTSixDQUFULEVBQVc7QUFDaEIsUUFBSVQsT0FBTyxJQUFYO0FBQ0EsUUFBSUYsUUFBTyxLQUFLTCxJQUFMLENBQVVLLEtBQXJCO0FBQ0FHLE9BQUdhLFlBQUgsQ0FBZ0I7QUFDZFgsZUFBUyxpQkFBU00sQ0FBVCxFQUFZO0FBQ25CLFlBQUlYLFFBQVEsQ0FBWixFQUFlO0FBQ2JFLGVBQUtLLE9BQUwsQ0FBYTtBQUNYUCxtQkFBT0EsUUFBUTtBQURKLFdBQWI7QUFHRDtBQUNELGdCQUFRQSxLQUFSO0FBQ0UsZUFBSyxDQUFMO0FBQ0VHLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxNQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRixlQUFLLENBQUw7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxNQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRixlQUFLLENBQUw7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxTQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRixlQUFLLENBQUw7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxXQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRixlQUFLLENBQUw7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxRQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRixlQUFLLENBQUw7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxvQkFESTtBQUVYQyxvQkFBTSxNQUZLO0FBR1hDLHdCQUFVO0FBSEMsYUFBYjtBQUtBO0FBQ0Y7QUFDRWpCLGVBQUdjLFNBQUgsQ0FBYTtBQUNYQyxxQkFBTyxJQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFqREo7QUFtREQ7QUExRGEsS0FBaEI7QUE0REEsUUFBSXBCLFNBQVMsQ0FBYixFQUFnQjtBQUNkcUIsaUJBQVcsWUFBWTtBQUNyQmxCLFdBQUdtQixVQUFILENBQWM7QUFDWkMsZUFBSztBQURPLFNBQWQ7QUFHRCxPQUpELEVBSUcsSUFKSDtBQUtEO0FBQ0RDLFlBQVFDLEdBQVIsQ0FBWXpCLEtBQVo7QUFDRCxHO0FBQ0QwQixxQkFBbUIsNkJBQVk7QUFDN0IsV0FBTztBQUNMUixhQUFPLE9BREY7QUFFTFMsWUFBTSxtQkFGRDtBQUdMQyxnQkFBVTtBQUhMLEtBQVA7QUFLRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc2xpZGVyV2lkdGggPSAxMDU7XG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhbPkuo4m6K+05piOJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgJ3d4Yy1sYWJlbCc6ICdAbWludWkvd3hjLWxhYmVsJyxcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1sb2FkbW9yZSc6ICdAbWludWkvd3hjLWxvYWRtb3JlJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge1xuICAgIHRhYnM6IFtcIuS9v+eUqOaWueazlVwiLCBcIkNoYW5nZUxvZ1wiXSxcbiAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgc2xpZGVyT2Zmc2V0OiAwLFxuICAgICAgc2xpZGVyTGVmdDogMCxcbiAgICAgIGlzRWdnOiAwLFxuICB9LFxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBzbGlkZXJMZWZ0OiAocmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoIC0gc2xpZGVyV2lkdGgpIC8gMixcbiAgICAgICAgICAgICAgICBzbGlkZXJPZmZzZXQ6IHJlcy53aW5kb3dXaWR0aCAvIHRoYXQuZGF0YS50YWJzLmxlbmd0aCAqIHRoYXQuZGF0YS5hY3RpdmVJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgdGFiQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHNsaWRlck9mZnNldDogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IGUuY3VycmVudFRhcmdldC5pZFxuICAgICAgfSk7XG4gIH0sXG4gIGlzVGFwOiBmdW5jdGlvbihlKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIGlzRWdnID10aGlzLmRhdGEuaXNFZ2c7XG4gICAgd3gudmlicmF0ZVNob3J0KHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGlzRWdnIDwgNykge1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBpc0VnZzogaXNFZ2cgKyAxLFxuICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaXNFZ2cpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WXr++8n/CfpJQnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfll68h8J+YticsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ1doYXTvvJ/wn5iuJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6L+Z6YeM5rKh5pyJ5Lic6KW/77yB8J+YkScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+WIq+eCueS6hiDwn5i1JyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAnY29uZ3JhdHVsYXRpb25z77yB8J+RjycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfigKbigKYnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChpc0VnZyA+PSA2KSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvZWdnL2luZGV4J1xuICAgICAgICB9KSBcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGlzRWdnKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL21lbnUvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlL3NoYXJlLnBuZydcbiAgICB9XG4gIH1cbn0iXX0=