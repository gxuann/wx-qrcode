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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwicnMiLCJyc19zdGEiLCJzY2FuIiwiZSIsInRoYXQiLCJ3eCIsInNjYW5Db2RlIiwic3VjY2VzcyIsInJlcyIsInNldERhdGEiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQU9FQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxRQUFHLEVBREM7QUFFSkMsWUFBTztBQUZILEc7QUFJTkMsUUFBTSxjQUFTQyxDQUFULEVBQVc7QUFBQTs7QUFDZixRQUFJQyxPQUFPLElBQVg7QUFDQSxRQUFJSixFQUFKO0FBQ0EsUUFBSUMsTUFBSjtBQUNBSSxPQUFHQyxRQUFILENBQVk7QUFDVkMsZUFBUyxpQkFBQ0MsR0FBRCxFQUFTO0FBQ2hCLGNBQUtDLE9BQUwsQ0FBYTtBQUNYVCxjQUFJUSxJQUFJRSxNQURHO0FBRVhULGtCQUFRO0FBRkcsU0FBYjtBQUlEO0FBTlMsS0FBWjtBQVFEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ1FS5LqM57u056CBJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG4gICAgcnM6XCJcIixcbiAgICByc19zdGE6dHJ1ZVxuICB9LFxuICBzY2FuOiBmdW5jdGlvbihlKXtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHJzO1xuICAgIHZhciByc19zdGE7XG4gICAgd3guc2NhbkNvZGUoe1xuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHJzOiByZXMucmVzdWx0LFxuICAgICAgICAgIHJzX3N0YTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59Il19