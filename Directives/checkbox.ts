/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../app.ts" />

module Directives {

    export class CheckboxOptions extends ComponentOption {
        defaultValue: string = '';
        errorClass: string = 'error';
        checkedValue: string = '1';
        nonCheckedValue: string = '0';
    }

    export interface ICheckboxScope extends IComponentScope {
        checkVal: boolean;
    }

    export class Checkbox extends Component {
        static $inject = ['$element', '$scope'];
        private options: CheckboxOptions;

        constructor(public $element: JQuery, public $scope: ICheckboxScope) {
            super($element, $scope);
            let base = this;
            this.options = <CheckboxOptions>$scope.options || new CheckboxOptions();

            $scope.checkVal = $scope.model.value === this.options.checkedValue;

            $scope.$watch('checkVal', function(newValue, oldValue){
              $scope.model.value = newValue? base.options.checkedValue : base.options.nonCheckedValue;
            });
        }

        validate(refreshState: boolean): boolean {
            return true;
        }
    }
}

window.Components.directive('checkbox', function (): ng.IDirective {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            customClass: '=',
            options: '=',
            model: '='
        },
        template: '<input class="{{customClass}}" ng-model="checkVal" type="checkbox">',
        controller: Directives.Checkbox
    };
});
