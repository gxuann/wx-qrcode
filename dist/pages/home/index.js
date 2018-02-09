'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    }
  },
  toGenerate: function toGenerate(e) {
    wx.navigateTo({
      url: '../../pages/generate/index'
    });
  },
  toFeedback: function toFeedback(e) {
    wx.navigateTo({
      url: '../../pages/feedback/index'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidG9HZW5lcmF0ZSIsImUiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b0ZlZWRiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRRUEsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7QUFDTkMsY0FBWSxvQkFBU0MsQ0FBVCxFQUFXO0FBQ3JCQyxPQUFHQyxVQUFILENBQWM7QUFDWkMsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RDLGNBQVksb0JBQVNKLENBQVQsRUFBVztBQUNyQkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUs7QUFETyxLQUFkO0FBR0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnUVLkuoznu7TnoIEnLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1mbGV4JzogJ0BtaW51aS93eGMtZmxleCcsXG4gICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgIH1cbiAgfSxcbiAgZGF0YToge30sXG4gIHRvR2VuZXJhdGU6IGZ1bmN0aW9uKGUpe1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vLi4vcGFnZXMvZ2VuZXJhdGUvaW5kZXgnXG4gICAgfSlcbiAgfSxcbiAgdG9GZWVkYmFjazogZnVuY3Rpb24oZSl7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi8uLi9wYWdlcy9mZWVkYmFjay9pbmRleCdcbiAgICB9KVxuICB9XG59Il19