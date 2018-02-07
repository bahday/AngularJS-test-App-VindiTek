angular.module('app')
  .directive('item', function ($compile) {
    return {
      restrict: 'E',
      templateUrl: 'directives/itemDirective/itemDIrectiveView.html',
      scope: {
        value: '=',
        length: '=',
        level: '=',
        count: '=',
        fcount: '=',
        fclick: '=',
        
      },
      link: function (scope, element, attrs) {
      scope.listClass=[
        'col-sm-12 centered',
        'col-sm-4 centered h-level-1',
        'col-sm-6 centered',
        ''
      ]
      }
    };
  });