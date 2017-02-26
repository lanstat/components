/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../app.ts" />

module Directives {

    export class ComboboxOptions extends ComponentOption {
        defaultValue: string = '';
        errorClass: string = 'error';
        source: any;
    }

    export class ComboBox extends Component {
        static $inject = ['$element', '$scope', '$compile'];
        private options: ComboboxOptions;
        private compile: any;

        constructor(public $element: JQuery, public $scope: IComponentScope, public $compile: any) {
            super($element, $scope);
            let base = this;

            $scope.onBlur = function () {
                if (!base.validate(true)) {
                    console.log('invalidate');
                }
            };

            this.compile = $compile;
            this.options = <ComboboxOptions>$scope.options || new ComboboxOptions();
            this.reloadComponent($scope, $element);
        }

        reloadComponent(scope, element): void{
          let template:string = '<select ng-model="model.value">';
          let source: any[] = this.options.source;

          for(let i:number = 0;i < source.length;i++){
            template += '<option value="' + source[i].id + '">' + source[i].value + '</option>';
          }

          template += '</select>';

          element.html('').append(this.compile(template)(scope));
        }

        validate(refreshState: boolean): boolean {
            let resp: boolean = true;

            if (this.options.required && this.scope.model.value == '') {
                resp = false;
            }

            if (refreshState) {
                this.scope.hasError = !resp;
            }

            return resp;
        }
    }
}

window.Components.directive('combobox', function (): ng.IDirective {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            customClass: '=',
            options: '=',
            model: '='
        },
        controller: Directives.ComboBox
    };
});
