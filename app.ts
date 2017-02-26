/// <reference path="node_modules/@types/angular/index.d.ts" />

interface Window {
    Components: ng.IModule;
}

module Directives {
    export class ComponentOption {
        disabled: boolean = false;
        readonly: boolean = false;
        required: boolean = false;
    }

    export interface IComponentScope extends ng.IScope {
        model: any,
        options?: ComponentOption,
        onBlur?: () => void,
        hasError?: boolean
    }

    export abstract class Component {
        protected scope: IComponentScope;

        constructor(public $element: JQuery, public $scope: IComponentScope) {
            let _this = this;
            let value: any;

            if ($scope.model.value) {
                value = $scope.model.value;
            } else {
                value = $scope.model;
            }

            $scope.model = {
                value: value,
                validate: function (refreshState: boolean = false) {
                    return _this.validate(refreshState);
                }
            }

            $scope.hasError = false;
            this.scope = $scope;
        }

        abstract validate(refreshState: boolean): boolean;
    }
}

window.Components = angular.module('bitterscope.components', []);
