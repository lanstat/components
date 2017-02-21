var app = angular.module('bitterscope.components', []);

app.directive("combobox", function() {
    return {
        restrict: 'E',
        scope: {
            model: '=model',
            source: '=source'
        },
        controller: function($scope, $element) {

        },
        link: function(scope, element, attrs, ctrls) {
        },
        template:'<select ng-options="sauce.id as sauce.value for sauce in source" ng-model="model"></select>',
        replace:true
    }
});
