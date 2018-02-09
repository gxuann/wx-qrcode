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
        activeIndex: 1,
        sliderOffset: 0,
        sliderLeft: 0
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
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJzbGlkZXJXaWR0aCIsImRhdGEiLCJ0YWJzIiwiYWN0aXZlSW5kZXgiLCJzbGlkZXJPZmZzZXQiLCJzbGlkZXJMZWZ0Iiwib25Mb2FkIiwidGhhdCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwid2luZG93V2lkdGgiLCJsZW5ndGgiLCJ0YWJDbGljayIsImUiLCJjdXJyZW50VGFyZ2V0Iiwib2Zmc2V0TGVmdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLGNBQWMsR0FBbEI7O0FBUUVDLFVBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLGNBQU0sQ0FBQyxNQUFELEVBQVMsV0FBVCxDQURGO0FBRUpDLHFCQUFhLENBRlQ7QUFHSkMsc0JBQWMsQ0FIVjtBQUlKQyxvQkFBWTtBQUpSLEs7QUFNTkMsWUFBUSxrQkFBWTtBQUNsQixZQUFJQyxPQUFPLElBQVg7QUFDQUMsV0FBR0MsYUFBSCxDQUFpQjtBQUNiQyxxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CSixxQkFBS0ssT0FBTCxDQUFhO0FBQ1RQLGdDQUFZLENBQUNNLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ2QsV0FBM0MsSUFBMEQsQ0FEN0Q7QUFFVEksa0NBQWNPLElBQUlFLFdBQUosR0FBa0JOLEtBQUtOLElBQUwsQ0FBVUMsSUFBVixDQUFlWSxNQUFqQyxHQUEwQ1AsS0FBS04sSUFBTCxDQUFVRTtBQUZ6RCxpQkFBYjtBQUlIO0FBTlksU0FBakI7QUFRSCxLO0FBQ0RZLGNBQVUsa0JBQVVDLENBQVYsRUFBYTtBQUNuQixhQUFLSixPQUFMLENBQWE7QUFDVFIsMEJBQWNZLEVBQUVDLGFBQUYsQ0FBZ0JDLFVBRHJCO0FBRVRmLHlCQUFhYSxFQUFFQyxhQUFGLENBQWdCRTtBQUZwQixTQUFiO0FBSUgiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHNsaWRlcldpZHRoID0gMTA1O1xuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWz5LqOJuivtOaYjicsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLXN0ZXBzJzogJ0BtaW51aS93eGMtc3RlcHMnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgdGFiczogW1wi5L2/55So5pa55rOVXCIsIFwiQ2hhbmdlTG9nXCJdLFxuICAgIGFjdGl2ZUluZGV4OiAxLFxuICAgIHNsaWRlck9mZnNldDogMCxcbiAgICBzbGlkZXJMZWZ0OiAwXG4gIH0sXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHNsaWRlckxlZnQ6IChyZXMud2luZG93V2lkdGggLyB0aGF0LmRhdGEudGFicy5sZW5ndGggLSBzbGlkZXJXaWR0aCkgLyAyLFxuICAgICAgICAgICAgICAgIHNsaWRlck9mZnNldDogcmVzLndpbmRvd1dpZHRoIC8gdGhhdC5kYXRhLnRhYnMubGVuZ3RoICogdGhhdC5kYXRhLmFjdGl2ZUluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufSxcbnRhYkNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNsaWRlck9mZnNldDogZS5jdXJyZW50VGFyZ2V0Lm9mZnNldExlZnQsXG4gICAgICAgIGFjdGl2ZUluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICB9KTtcbn1cbn0iXX0=