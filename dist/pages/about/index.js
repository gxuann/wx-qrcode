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
      wx.navigateTo({
        url: '../../pages/egg/index'
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsImRhdGEiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0IiwiaXNFZ2ciLCJvbkxvYWQiLCJ0aGF0Iiwid3giLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsInNldERhdGEiLCJ3aW5kb3dXaWR0aCIsImxlbmd0aCIsInRhYkNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJvZmZzZXRMZWZ0IiwiaWQiLCJpc1RhcCIsInZpYnJhdGVTaG9ydCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibmF2aWdhdGVUbyIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJvblNoYXJlQXBwTWVzc2FnZSIsInBhdGgiLCJpbWFnZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxjQUFjLEdBQWxCOztBQVdFQyxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxVQUFNLENBQUMsTUFBRCxFQUFTLFdBQVQsQ0FERjtBQUVGQyxpQkFBYSxDQUZYO0FBR0ZDLGtCQUFjLENBSFo7QUFJRkMsZ0JBQVksQ0FKVjtBQUtGQyxXQUFPO0FBTEwsRztBQU9OQyxVQUFRLGtCQUFZO0FBQ2xCLFFBQUlDLE9BQU8sSUFBWDtBQUNBQyxPQUFHQyxhQUFILENBQWlCO0FBQ2JDLGVBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkosYUFBS0ssT0FBTCxDQUFhO0FBQ1RSLHNCQUFZLENBQUNPLElBQUlFLFdBQUosR0FBa0JOLEtBQUtQLElBQUwsQ0FBVUMsSUFBVixDQUFlYSxNQUFqQyxHQUEwQ2YsV0FBM0MsSUFBMEQsQ0FEN0Q7QUFFVEksd0JBQWNRLElBQUlFLFdBQUosR0FBa0JOLEtBQUtQLElBQUwsQ0FBVUMsSUFBVixDQUFlYSxNQUFqQyxHQUEwQ1AsS0FBS1AsSUFBTCxDQUFVRTtBQUZ6RCxTQUFiO0FBSUg7QUFOWSxLQUFqQjtBQVFELEc7QUFDRGEsWUFBVSxrQkFBVUMsQ0FBVixFQUFhO0FBQ25CLFNBQUtKLE9BQUwsQ0FBYTtBQUNUVCxvQkFBY2EsRUFBRUMsYUFBRixDQUFnQkMsVUFEckI7QUFFVGhCLG1CQUFhYyxFQUFFQyxhQUFGLENBQWdCRTtBQUZwQixLQUFiO0FBSUgsRztBQUNEQyxTQUFPLGVBQVNKLENBQVQsRUFBVztBQUNoQixRQUFJVCxPQUFPLElBQVg7QUFDQSxRQUFJRixRQUFPLEtBQUtMLElBQUwsQ0FBVUssS0FBckI7QUFDQUcsT0FBR2EsWUFBSCxDQUFnQjtBQUNkWCxlQUFTLGlCQUFTTSxDQUFULEVBQVk7QUFDbkIsWUFBSVgsUUFBUSxDQUFaLEVBQWU7QUFDYkUsZUFBS0ssT0FBTCxDQUFhO0FBQ1hQLG1CQUFPQSxRQUFRO0FBREosV0FBYjtBQUdEO0FBQ0QsZ0JBQVFBLEtBQVI7QUFDRSxlQUFLLENBQUw7QUFDRUcsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLE1BREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQUNGLGVBQUssQ0FBTDtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLE1BREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQUNGLGVBQUssQ0FBTDtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLFNBREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQUNGLGVBQUssQ0FBTDtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLFdBREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQUNGLGVBQUssQ0FBTDtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLFFBREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQUNGLGVBQUssQ0FBTDtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLG9CQURJO0FBRVhDLG9CQUFNLE1BRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0E7QUFDRjtBQUNFakIsZUFBR2MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLQTtBQWpESjtBQW1ERDtBQTFEYSxLQUFoQjtBQTREQSxRQUFJcEIsU0FBUyxDQUFiLEVBQWdCO0FBQ2RHLFNBQUdrQixVQUFILENBQWM7QUFDWkMsYUFBSztBQURPLE9BQWQ7QUFHRDtBQUNEQyxZQUFRQyxHQUFSLENBQVl4QixLQUFaO0FBQ0QsRztBQUNEeUIscUJBQW1CLDZCQUFZO0FBQzdCLFdBQU87QUFDTFAsYUFBTyxPQURGO0FBRUxRLFlBQU0sbUJBRkQ7QUFHTEMsZ0JBQVU7QUFITCxLQUFQO0FBS0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNsaWRlcldpZHRoID0gMTA1O1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWz5LqOJuivtOaYjicsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWZsZXgnOiAnQG1pbnVpL3d4Yy1mbGV4JyxcbiAgICAgICd3eGMtbGFiZWwnOiAnQG1pbnVpL3d4Yy1sYWJlbCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICd3eGMtbG9hZG1vcmUnOiAnQG1pbnVpL3d4Yy1sb2FkbW9yZSdcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICB0YWJzOiBbXCLkvb/nlKjmlrnms5VcIiwgXCJDaGFuZ2VMb2dcIl0sXG4gICAgICBhY3RpdmVJbmRleDogMCxcbiAgICAgIHNsaWRlck9mZnNldDogMCxcbiAgICAgIHNsaWRlckxlZnQ6IDAsXG4gICAgICBpc0VnZzogMCxcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2xpZGVyTGVmdDogKHJlcy53aW5kb3dXaWR0aCAvIHRoYXQuZGF0YS50YWJzLmxlbmd0aCAtIHNsaWRlcldpZHRoKSAvIDIsXG4gICAgICAgICAgICAgICAgc2xpZGVyT2Zmc2V0OiByZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggKiB0aGF0LmRhdGEuYWN0aXZlSW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIHRhYkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBzbGlkZXJPZmZzZXQ6IGUuY3VycmVudFRhcmdldC5vZmZzZXRMZWZ0LFxuICAgICAgICAgIGFjdGl2ZUluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIH0pO1xuICB9LFxuICBpc1RhcDogZnVuY3Rpb24oZSl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBpc0VnZyA9dGhpcy5kYXRhLmlzRWdnO1xuICAgIHd4LnZpYnJhdGVTaG9ydCh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChpc0VnZyA8IDcpIHtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgaXNFZ2c6IGlzRWdnICsgMSxcbiAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGlzRWdnKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfll6/vvJ/wn6SUJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5ZevIfCfmLYnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdXaGF077yf8J+YricsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+i/memHjOayoeacieS4nOilv++8gfCfmJEnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfliKvngrnkuoYg8J+YtScsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ2NvbmdyYXR1bGF0aW9uc++8gfCfkY8nLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn4oCm4oCmJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoaXNFZ2cgPj0gNikge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uLy4uL3BhZ2VzL2VnZy9pbmRleCdcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGlzRWdnKTtcbiAgfSxcbiAgb25TaGFyZUFwcE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6ICdRUuS6jOe7tOeggScsXG4gICAgICBwYXRoOiAnL3BhZ2VzL21lbnUvaW5kZXgnLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ltYWdlcy5neHVhbm4uY24vcXJjb2RlL3NoYXJlLnBuZydcbiAgICB9XG4gIH1cbn0iXX0=