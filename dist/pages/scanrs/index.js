'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    rs: "",
    rs_sta: true
  },
  scan: function scan(e) {
    var _this = this;

    var that = this;
    var rs;
    var rs_sta;
    wx.scanCode({
      success: function success(res) {
        _this.setData({
          rs: res.result,
          rs_sta: false
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwicnMiLCJyc19zdGEiLCJzY2FuIiwiZSIsInRoYXQiLCJ3eCIsInNjYW5Db2RlIiwic3VjY2VzcyIsInJlcyIsInNldERhdGEiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9FQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxRQUFHLEVBREM7QUFFSkMsWUFBTztBQUZILEc7QUFJTkMsUUFBTSxjQUFTQyxDQUFULEVBQVc7QUFBQTs7QUFDZixRQUFJQyxPQUFPLElBQVg7QUFDQSxRQUFJSixFQUFKO0FBQ0EsUUFBSUMsTUFBSjtBQUNBSSxPQUFHQyxRQUFILENBQVk7QUFDVkMsZUFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUtDLE9BQUwsQ0FBYTtBQUNYVCxjQUFJUSxJQUFJRSxNQURHO0FBRVhULGtCQUFRO0FBRkcsU0FBYjtBQUlEO0FBTlMsS0FBWjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcclxuICBjb25maWc6IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICdRUuS6jOe7tOeggScsXHJcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcclxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbidcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuICAgIHJzOlwiXCIsXHJcbiAgICByc19zdGE6dHJ1ZVxyXG4gIH0sXHJcbiAgc2NhbjogZnVuY3Rpb24oZSl7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICB2YXIgcnM7XHJcbiAgICB2YXIgcnNfc3RhO1xyXG4gICAgd3guc2NhbkNvZGUoe1xyXG4gICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIHJzOiByZXMucmVzdWx0LFxyXG4gICAgICAgICAgcnNfc3RhOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59Il19