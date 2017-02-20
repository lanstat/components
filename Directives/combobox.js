var app = angular.module('bitterscope.components', []);

app.directive('combobox', function(){
  return {
    restrict: 'E',
    template: '<select ng-model="model"></select>',
    scope: {
      model: '=model',
      source: '=source'
    },
    transclude: true,
    replace: true,
    link: function(scope, element, attrs){
      function reloadSource(){
        for (var i=0; i < scope.source.length; i++){
            element.append(angular.element('<option value="'+scope.source[i]+'">'+scope.source[i]+'</option>'));
        }
      }

      reloadSource();
      console.log(element);
      console.log(scope.source);
    }
  };
});
