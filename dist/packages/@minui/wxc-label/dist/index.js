'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  properties: {
    text: {
      type: String,
      value: 0
    },
    type: {
      type: String,
      value: 'plain'
    },
    typeColor: {
      type: String,
      value: '#ff5777'
    },
    textColor: {
      type: String,
      value: '#ffffff'
    },
    _system_: {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {},
  attached: function attached() {
    var host = this;

    wx.getSystemInfo && wx.getSystemInfo({
      success: function success(res) {
        host.setData({
          _system_: !!~res.system.indexOf('Android') ? 'android' : 'ios'
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJwcm9wZXJ0aWVzIiwidGV4dCIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsInR5cGVDb2xvciIsInRleHRDb2xvciIsIl9zeXN0ZW1fIiwiZGF0YSIsIm1ldGhvZHMiLCJhdHRhY2hlZCIsImhvc3QiLCJ3eCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwic2V0RGF0YSIsInN5c3RlbSIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlJQSxhQUFXLEU7QUFDWEMsY0FBWTtBQUNWQyxVQUFNO0FBQ0pDLFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZILEtBREk7QUFLVkYsVUFBTTtBQUNKQSxZQUFNQyxNQURGO0FBRUpDLGFBQU87QUFGSCxLQUxJO0FBU1ZDLGVBQVc7QUFDVEgsWUFBTUMsTUFERztBQUVUQyxhQUFPO0FBRkUsS0FURDtBQWFWRSxlQUFXO0FBQ1RKLFlBQU1DLE1BREc7QUFFVEMsYUFBTztBQUZFLEtBYkQ7QUFpQlZHLGNBQVU7QUFDUkwsWUFBTUMsTUFERTtBQUVSQyxhQUFPO0FBRkM7QUFqQkEsRztBQXNCWkksUUFBTSxFO0FBQ05DLFdBQVMsRTtBQUNUQyxZQUFVLG9CQUFZO0FBQ3BCLFFBQUlDLE9BQU8sSUFBWDs7QUFFQUMsT0FBR0MsYUFBSCxJQUFvQkQsR0FBR0MsYUFBSCxDQUFpQjtBQUNuQ0MsZUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSixhQUFLSyxPQUFMLENBQWE7QUFDWFQsb0JBQVUsQ0FBQyxDQUFDLENBQUNRLElBQUlFLE1BQUosQ0FBV0MsT0FBWCxDQUFtQixTQUFuQixDQUFILEdBQW1DLFNBQW5DLEdBQStDO0FBRDlDLFNBQWI7QUFHRDtBQUxrQyxLQUFqQixDQUFwQjtBQU9EIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbmZpZzoge1xyXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHt9XHJcbiAgICB9LFxyXG4gICAgYmVoYXZpb3JzOiBbXSxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgdGV4dDoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICB2YWx1ZTogMFxyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHZhbHVlOiAncGxhaW4nXHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGVDb2xvcjoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICB2YWx1ZTogJyNmZjU3NzcnXHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHRDb2xvcjoge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICB2YWx1ZTogJyNmZmZmZmYnXHJcbiAgICAgIH0sXHJcbiAgICAgIF9zeXN0ZW1fOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGF0YToge30sXHJcbiAgICBtZXRob2RzOiB7fSxcclxuICAgIGF0dGFjaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBob3N0ID0gdGhpcztcclxuXHJcbiAgICAgIHd4LmdldFN5c3RlbUluZm8gJiYgd3guZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgaG9zdC5zZXREYXRhKHtcclxuICAgICAgICAgICAgX3N5c3RlbV86ICEhfnJlcy5zeXN0ZW0uaW5kZXhPZignQW5kcm9pZCcpID8gJ2FuZHJvaWQnIDogJ2lvcydcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSJdfQ==