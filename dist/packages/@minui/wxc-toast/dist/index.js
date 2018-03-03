'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function observer(isShow) {
        if (isShow) {
          if (!getApp().globalData) {
            Object.assign(getApp(), { globalData: {} });
          }
          var globalData = getApp().globalData;
          var zIndex = (globalData._zIndex || 1000) + 1;
          globalData._zIndex = zIndex;
          this.setData({
            zIndex: zIndex
          });
        }
      }
    },
    text: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    src: {
      type: String,
      value: ''
    },
    duration: {
      type: Number,
      value: 2000
    }
  },
  data: {
    zIndex: 1000
  },
  methods: {
    show: function show() {
      var _this = this;

      var duration = this.data.duration;

      clearTimeout(this._timer);
      this.setData({
        isShow: true
      });

      if (duration > 0 && duration !== Infinity) {
        this._timer = setTimeout(function () {
          _this.hide();
          _this.triggerEvent('success', {}, {});
        }, duration);
      }
    },
    hide: function hide() {
      this._timer = clearTimeout(this._timer);

      this.setData({ isShow: false });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwiaXNTaG93IiwidHlwZSIsIkJvb2xlYW4iLCJ2YWx1ZSIsIm9ic2VydmVyIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInpJbmRleCIsIl96SW5kZXgiLCJzZXREYXRhIiwidGV4dCIsIlN0cmluZyIsImljb24iLCJpY29uQ29sb3IiLCJzcmMiLCJkdXJhdGlvbiIsIk51bWJlciIsImRhdGEiLCJtZXRob2RzIiwic2hvdyIsImNsZWFyVGltZW91dCIsIl90aW1lciIsIkluZmluaXR5Iiwic2V0VGltZW91dCIsImhpZGUiLCJ0cmlnZ2VyRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1FQSxhQUFXLEU7QUFDWEMsY0FBWTtBQUNWQyxZQUFRO0FBQ05DLFlBQU1DLE9BREE7QUFFTkMsYUFBTyxLQUZEO0FBR05DLGNBSE0sb0JBR0dKLE1BSEgsRUFHVztBQUNmLFlBQUlBLE1BQUosRUFBWTtBQUNWLGNBQUksQ0FBQ0ssU0FBU0MsVUFBZCxFQUEwQjtBQUN4QkMsbUJBQU9DLE1BQVAsQ0FBY0gsUUFBZCxFQUF3QixFQUFDQyxZQUFZLEVBQWIsRUFBeEI7QUFDRDtBQUNELGNBQUlBLGFBQWFELFNBQVNDLFVBQTFCO0FBQ0EsY0FBSUcsU0FBUyxDQUFDSCxXQUFXSSxPQUFYLElBQXNCLElBQXZCLElBQStCLENBQTVDO0FBQ0FKLHFCQUFXSSxPQUFYLEdBQXFCRCxNQUFyQjtBQUNBLGVBQUtFLE9BQUwsQ0FBYTtBQUNYRixvQkFBUUE7QUFERyxXQUFiO0FBR0Q7QUFDRjtBQWZLLEtBREU7QUFrQlZHLFVBQU07QUFDSlgsWUFBTVksTUFERjtBQUVKVixhQUFPO0FBRkgsS0FsQkk7QUFzQlZXLFVBQU07QUFDSmIsWUFBTVksTUFERjtBQUVKVixhQUFPO0FBRkgsS0F0Qkk7QUEwQlZZLGVBQVc7QUFDVGQsWUFBTVksTUFERztBQUVUVixhQUFPO0FBRkUsS0ExQkQ7QUE4QlZhLFNBQUs7QUFDSGYsWUFBTVksTUFESDtBQUVIVixhQUFPO0FBRkosS0E5Qks7QUFrQ1ZjLGNBQVU7QUFDUmhCLFlBQU1pQixNQURFO0FBRVJmLGFBQU87QUFGQztBQWxDQSxHO0FBdUNaZ0IsUUFBTTtBQUNKVixZQUFRO0FBREosRztBQUdOVyxXQUFTO0FBQ1BDLFFBRE8sa0JBQ0E7QUFBQTs7QUFDTCxVQUFJSixXQUFXLEtBQUtFLElBQUwsQ0FBVUYsUUFBekI7O0FBRUFLLG1CQUFhLEtBQUtDLE1BQWxCO0FBQ0EsV0FBS1osT0FBTCxDQUFhO0FBQ1hYLGdCQUFRO0FBREcsT0FBYjs7QUFJQSxVQUFJaUIsV0FBVyxDQUFYLElBQWdCQSxhQUFhTyxRQUFqQyxFQUEyQztBQUN6QyxhQUFLRCxNQUFMLEdBQWNFLFdBQVcsWUFBTTtBQUM3QixnQkFBS0MsSUFBTDtBQUNBLGdCQUFLQyxZQUFMLENBQWtCLFNBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLEVBQWpDO0FBQ0QsU0FIYSxFQUdYVixRQUhXLENBQWQ7QUFJRDtBQUNGLEtBZk07QUFpQlBTLFFBakJPLGtCQWlCQTtBQUNMLFdBQUtILE1BQUwsR0FBY0QsYUFBYSxLQUFLQyxNQUFsQixDQUFkOztBQUVBLFdBQUtaLE9BQUwsQ0FBYSxFQUFFWCxRQUFRLEtBQVYsRUFBYjtBQUNEO0FBckJNIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYmVoYXZpb3JzOiBbXSxcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICBpc1Nob3c6IHtcclxuICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgdmFsdWU6IGZhbHNlLFxyXG4gICAgICBvYnNlcnZlcihpc1Nob3cpIHtcclxuICAgICAgICBpZiAoaXNTaG93KSB7XHJcbiAgICAgICAgICBpZiAoIWdldEFwcCgpLmdsb2JhbERhdGEpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihnZXRBcHAoKSwge2dsb2JhbERhdGE6IHt9fSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBnbG9iYWxEYXRhID0gZ2V0QXBwKCkuZ2xvYmFsRGF0YVxyXG4gICAgICAgICAgbGV0IHpJbmRleCA9IChnbG9iYWxEYXRhLl96SW5kZXggfHwgMTAwMCkgKyAxXHJcbiAgICAgICAgICBnbG9iYWxEYXRhLl96SW5kZXggPSB6SW5kZXhcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHpJbmRleDogekluZGV4XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRleHQ6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB2YWx1ZTogJydcclxuICAgIH0sXHJcbiAgICBpY29uOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9LFxyXG4gICAgaWNvbkNvbG9yOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9LFxyXG4gICAgc3JjOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9LFxyXG4gICAgZHVyYXRpb246IHtcclxuICAgICAgdHlwZTogTnVtYmVyLFxyXG4gICAgICB2YWx1ZTogMjAwMFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgekluZGV4OiAxMDAwXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBzaG93KCkge1xyXG4gICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmRhdGEuZHVyYXRpb25cclxuXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcilcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBpc1Nob3c6IHRydWVcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGlmIChkdXJhdGlvbiA+IDAgJiYgZHVyYXRpb24gIT09IEluZmluaXR5KSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnc3VjY2VzcycsIHt9LCB7fSlcclxuICAgICAgICB9LCBkdXJhdGlvbilcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICB0aGlzLl90aW1lciA9IGNsZWFyVGltZW91dCh0aGlzLl90aW1lcilcclxuXHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGlzU2hvdzogZmFsc2UgfSlcclxuICAgIH1cclxuICB9XHJcbn0iXX0=