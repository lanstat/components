/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../app.ts" />

module Directives {

    export class InputOptions extends ComponentOption {
        defaultValue: string = '';
        errorClass: string = 'error';
    }

    export class TextInput extends Component {
        static $inject = ['$element', '$scope'];
        private options: InputOptions;

        constructor(public $element: JQuery, public $scope: IComponentScope) {
            super($element, $scope);
            let base = this;

            $scope.onBlur = function () {
                if (!base.validate(true)) {
                    console.log('invalidate');
                }
            };

            this.options = <InputOptions>$scope.options || new InputOptions();
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

window.Components.directive('textInput', function (): ng.IDirective {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            customClass: '=',
            options: '=',
            model: '='
        },
        template: '<input class="{{customClass}}" ng-model="model.value" ng-blur="onBlur()">',
        controller: Directives.TextInput
    };
});
