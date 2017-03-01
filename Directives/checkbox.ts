/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../app.ts" />

module Directives {

    export class CheckboxOptions extends ComponentOption {
        defaultValue: string = '';
        errorClass: string = 'error';
        checkedValue: string = '1';
        nonCheckedValue: string = '0';
    }

    export class Checkbox extends Component {
        static $inject = ['$element', '$scope'];
        private options: CheckboxOptions;

        constructor(public $element: JQuery, public $scope: IComponentScope) {
            super($element, $scope);
            let base = this;

            $scope.onBlur = function () {
                if (!base.validate(true)) {
                    console.log('invalidate');
                }
            };

            this.options = <CheckboxOptions>$scope.options || new CheckboxOptions();
        }

        validate(refreshState: boolean): boolean {
            let resp: boolean = true;

            if (this.options.required && this.scope.model.value == '') {
                resp = false;
            }

            //Actualiza el estado del componente en la validacion
            if (refreshState) {
                this.scope.hasError = !resp;
            }

            return resp;
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
        template: '<input class="{{customClass}}" ng-model="model.value" type="checkbox" ng-true-value="options.checkedValue" ng-false-value="options.nonCheckedValue">',
        controller: Directives.Checkbox
    };
});
