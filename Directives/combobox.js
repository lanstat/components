var app = angular.module('bitterscope.components', []);

app.directive("combobox", function($compile) {
    var reloadComponent = function(scope, element){
      var template = '<select ng-model="model.value">';

      for(var i=0;i<scope.source.length;i++){
        template += '<option value="' + scope.source[i].id + '">' + scope.source[i].value + '</option>';
      }

      template += '</select>';

      element.html('').append($compile(template)(scope))
    };

    return {
        restrict: 'E',
        scope: {
            model: '=model',
            source: '=source'
        },
        controller: function($scope, $element) {

        },
        link: function(scope, element, attrs) {
          scope.model.validate = function(){
            alert('validar');
          }

          reloadComponent(scope, element);
        },
        replace:true
    }
});
