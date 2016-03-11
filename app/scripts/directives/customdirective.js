'use strict';

/**
 * @ngdoc directive
 * @name ipValuationApp.directive:customDirective
 * @description
 * # customDirective
 */
angular.module('ipValuationApp')
    .directive('toggle', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (attrs.toggle === 'tooltip') {
                    $(element).tooltip();
                }
                if (attrs.toggle === 'popover') {
                    $(element).popover({
                        trigger: 'hover'
                    });
                }
            }
        };
    })
    .directive('customAttr', function ($compile) {

        var linker = function (scope, element, attrs) {
            //var template = '<input type=' + scope.content.type + ' name=' + scope.content.name + ' id=' + scope.content.name + ' ng-model="ctrl.data[' + scope.content.name + ']" >';
            //var template = '<input type=' + scope.content.type + ' name=' + scope.content.name + ' id=' + scope.content.name + ' >';
            angular.forEach(scope.content, function (value, key) {

                try {
                    element.attr(key, value);
                } catch (e) {
                    //console.log(e);
                }

            });

            if (scope.content.name) {
                element.attr('id', scope.content.name);
            }

            $compile(element.contents())(scope);
        };

        return {
            restrict: 'A',
            transclude: true,
            scope: {
                content: '='
            },
            link: linker
                //template: '<input type=' + field.type + ' ng-modal=ctrl.data.' + field.name + ' name=' + field.name + '>'
                //template: '<input type=text' + field.type + '>'
        };

    })
    .directive('validPasswordC', function () {
        return {
            scope: {
                password: '=validPasswordC'
            },
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var noMatch = viewValue !== scope.password;
                    ctrl.$setValidity('noMatch', !noMatch);
                    return viewValue;
                });

                scope.$watch('password', function (value) {
                    ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
                });
            }
        };
    });