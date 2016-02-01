'use strict';

angular.module('TestApp', ['ui.bootstrap'])
    .controller('TestCtrl', function ($scope, scopeExt) {

        console.log(scopeExt);
        console.log($scope);
        scopeExt.apply($scope);
        console.log($scope);
        $scope.title = 'Scope Extension'
        //angular.extend($scope, scopeExt);
        //console.log(angular.extend($scope, scopeExt));

    })
    .factory('scopeExt', function () {

        function ScopeExt() {
            this.titlex = 'Scope Extension X'
            this.getTitleX = function() {
                return this.titlex;
            }
        }

        return ScopeExt;
    });