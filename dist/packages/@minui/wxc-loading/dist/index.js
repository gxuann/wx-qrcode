'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  _timer: null,

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
    type: {
      type: String,
      value: 'mgj'
    },
    image: {
      type: String,
      value: ''
    },
    slip: {
      type: String,
      value: ''
    }
  },
  data: {
    zIndex: 1000
  },
  methods: {
    show: function show() {
      var _this = this;

      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timer = setTimeout(function () {
        _this._timer = null;
        _this.setData({ isShow: true });
      }, 500);
    },
    hide: function hide() {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this.setData({ isShow: false });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJfdGltZXIiLCJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwiaXNTaG93IiwidHlwZSIsIkJvb2xlYW4iLCJ2YWx1ZSIsIm9ic2VydmVyIiwiZ2V0QXBwIiwiZ2xvYmFsRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInpJbmRleCIsIl96SW5kZXgiLCJzZXREYXRhIiwiU3RyaW5nIiwiaW1hZ2UiLCJzbGlwIiwiZGF0YSIsIm1ldGhvZHMiLCJzaG93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImhpZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNFQSxVQUFRLEk7O0FBSVJDLGFBQVcsRTtBQUNYQyxjQUFZO0FBQ1ZDLFlBQVE7QUFDTkMsWUFBTUMsT0FEQTtBQUVOQyxhQUFPLEtBRkQ7QUFHTkMsY0FITSxvQkFHR0osTUFISCxFQUdXO0FBQ2YsWUFBSUEsTUFBSixFQUFZO0FBQ1YsY0FBSSxDQUFDSyxTQUFTQyxVQUFkLEVBQTBCO0FBQ3hCQyxtQkFBT0MsTUFBUCxDQUFjSCxRQUFkLEVBQXdCLEVBQUNDLFlBQVksRUFBYixFQUF4QjtBQUNEO0FBQ0QsY0FBSUEsYUFBYUQsU0FBU0MsVUFBMUI7QUFDQSxjQUFJRyxTQUFTLENBQUNILFdBQVdJLE9BQVgsSUFBc0IsSUFBdkIsSUFBK0IsQ0FBNUM7QUFDQUoscUJBQVdJLE9BQVgsR0FBcUJELE1BQXJCO0FBQ0EsZUFBS0UsT0FBTCxDQUFhO0FBQ1hGLG9CQUFRQTtBQURHLFdBQWI7QUFHRDtBQUNGO0FBZkssS0FERTtBQWtCVlIsVUFBTTtBQUNKQSxZQUFNVyxNQURGO0FBRUpULGFBQU87QUFGSCxLQWxCSTtBQXNCVlUsV0FBTztBQUNMWixZQUFNVyxNQUREO0FBRUxULGFBQU87QUFGRixLQXRCRztBQTBCVlcsVUFBTTtBQUNKYixZQUFNVyxNQURGO0FBRUpULGFBQU87QUFGSDtBQTFCSSxHO0FBK0JaWSxRQUFNO0FBQ0ZOLFlBQVE7QUFETixHO0FBR05PLFdBQVM7QUFDUEMsUUFETyxrQkFDQTtBQUFBOztBQUNMLFVBQUksS0FBS3BCLE1BQVQsRUFBaUI7QUFDZnFCLHFCQUFhLEtBQUtyQixNQUFsQjtBQUNEO0FBQ0QsV0FBS0EsTUFBTCxHQUFjc0IsV0FBVyxZQUFNO0FBQzdCLGNBQUt0QixNQUFMLEdBQWMsSUFBZDtBQUNBLGNBQUtjLE9BQUwsQ0FBYSxFQUFFWCxRQUFRLElBQVYsRUFBYjtBQUNELE9BSGEsRUFHWCxHQUhXLENBQWQ7QUFJRCxLQVRNO0FBVVBvQixRQVZPLGtCQVVBO0FBQ0wsVUFBSSxLQUFLdkIsTUFBVCxFQUFpQjtBQUNmcUIscUJBQWEsS0FBS3JCLE1BQWxCO0FBQ0EsYUFBS0EsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNELFdBQUtjLE9BQUwsQ0FBYSxFQUFFWCxRQUFRLEtBQVYsRUFBYjtBQUNEO0FBaEJNIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBfdGltZXI6IG51bGwsXHJcbiAgY29uZmlnOiB7XHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XHJcbiAgfSxcclxuICBiZWhhdmlvcnM6IFtdLFxyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIGlzU2hvdzoge1xyXG4gICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICB2YWx1ZTogZmFsc2UsXHJcbiAgICAgIG9ic2VydmVyKGlzU2hvdykge1xyXG4gICAgICAgIGlmIChpc1Nob3cpIHtcclxuICAgICAgICAgIGlmICghZ2V0QXBwKCkuZ2xvYmFsRGF0YSkge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGdldEFwcCgpLCB7Z2xvYmFsRGF0YToge319KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IGdsb2JhbERhdGEgPSBnZXRBcHAoKS5nbG9iYWxEYXRhXHJcbiAgICAgICAgICBsZXQgekluZGV4ID0gKGdsb2JhbERhdGEuX3pJbmRleCB8fCAxMDAwKSArIDFcclxuICAgICAgICAgIGdsb2JhbERhdGEuX3pJbmRleCA9IHpJbmRleFxyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgekluZGV4OiB6SW5kZXhcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdHlwZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHZhbHVlOiAnbWdqJ1xyXG4gICAgfSxcclxuICAgIGltYWdlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgdmFsdWU6ICcnXHJcbiAgICB9LFxyXG4gICAgc2xpcDoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGF0YToge1xyXG4gICAgICB6SW5kZXg6IDEwMDBcclxuICB9LFxyXG4gIG1ldGhvZHM6IHtcclxuICAgIHNob3coKSB7XHJcbiAgICAgIGlmICh0aGlzLl90aW1lcikge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcilcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbFxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGlzU2hvdzogdHJ1ZSB9KVxyXG4gICAgICB9LCA1MDApXHJcbiAgICB9LFxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgaWYgKHRoaXMuX3RpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKVxyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbFxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7IGlzU2hvdzogZmFsc2UgfSlcclxuICAgIH1cclxuICB9XHJcbn0iXX0=