'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    isShow: false,
    eggUrl: ''
  },
  onLoad: function onLoad(e) {
    wx.clearStorage();
    var that = this;
    wx.request({
      url: 'https://qrcode.gxuann.cn/egg.php',
      data: {
        '__code__': {
          readme: ''
        },

        eggUrl: 'egg'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        console.log(res.data);
        that.setData({
          eggUrl: res.data
        });
      }
    });
  },
  onSHow: function onSHow(e) {
    var that = this;
    wx.request({
      url: 'https://qrcode.gxuann.cn/egg.php',
      data: {
        '__code__': {
          readme: ''
        },

        eggUrl: 'egg'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function success(res) {
        console.log(res.data);
        that.setData({
          eggUrl: res.data
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiaXNTaG93IiwiZWdnVXJsIiwib25Mb2FkIiwiZSIsInd4IiwiY2xlYXJTdG9yYWdlIiwidGhhdCIsInJlcXVlc3QiLCJ1cmwiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJvblNIb3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1FQSxRQUFNO0FBQUE7QUFBQTtBQUFBOztBQUNKQyxZQUFRLEtBREo7QUFFSkMsWUFBUTtBQUZKLEc7QUFJTkMsVUFBUSxnQkFBU0MsQ0FBVCxFQUFXO0FBQ2pCQyxPQUFHQyxZQUFIO0FBQ0EsUUFBSUMsT0FBTyxJQUFYO0FBQ0FGLE9BQUdHLE9BQUgsQ0FBVztBQUNUQyxXQUFLLGtDQURJO0FBRVRULFlBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pFLGdCQUFPO0FBREgsT0FGRztBQUtUUSxjQUFRO0FBQ04sd0JBQWdCO0FBRFYsT0FMQztBQVFUQyxhQVJTLG1CQVFEQyxHQVJDLEVBUUk7QUFDWEMsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBSVosSUFBaEI7QUFDQU8sYUFBS1EsT0FBTCxDQUFhO0FBQ1hiLGtCQUFRVSxJQUFJWjtBQURELFNBQWI7QUFHRDtBQWJRLEtBQVg7QUFlRCxHO0FBQ0RnQixVQUFRLGdCQUFVWixDQUFWLEVBQWE7QUFDbkIsUUFBSUcsT0FBTyxJQUFYO0FBQ0FGLE9BQUdHLE9BQUgsQ0FBVztBQUNUQyxXQUFLLGtDQURJO0FBRVRULFlBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pFLGdCQUFPO0FBREgsT0FGRztBQUtUUSxjQUFRO0FBQ04sd0JBQWdCO0FBRFYsT0FMQztBQVFUQyxhQVJTLG1CQVFEQyxHQVJDLEVBUUk7QUFDWEMsZ0JBQVFDLEdBQVIsQ0FBWUYsSUFBSVosSUFBaEI7QUFDQU8sYUFBS1EsT0FBTCxDQUFhO0FBQ1hiLGtCQUFRVSxJQUFJWjtBQURELFNBQWI7QUFHRDtBQWJRLEtBQVg7QUFlRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfigKbigKYnLFxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZWFlYWVhJyxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHt9XG4gIH0sXG4gIGRhdGE6IHtcbiAgICBpc1Nob3c6IGZhbHNlLFxuICAgIGVnZ1VybDogJydcbiAgfSxcbiAgb25Mb2FkOiBmdW5jdGlvbihlKXtcbiAgICB3eC5jbGVhclN0b3JhZ2UoKVxuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9xcmNvZGUuZ3h1YW5uLmNuL2VnZy5waHAnLFxuICAgICAgZGF0YToge1xuICAgICAgICBlZ2dVcmw6J2VnZydcbiAgICAgIH0sXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGVnZ1VybDogcmVzLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgb25TSG93OiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9xcmNvZGUuZ3h1YW5uLmNuL2VnZy5waHAnLFxuICAgICAgZGF0YToge1xuICAgICAgICBlZ2dVcmw6J2VnZydcbiAgICAgIH0sXG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKVxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGVnZ1VybDogcmVzLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSJdfQ==