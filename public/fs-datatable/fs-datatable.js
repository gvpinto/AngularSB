angular.module('datatableApp', ['ui.bootstrap'])
    .controller('datatableCtrl', function ($scope, $timeout) {
        console.log('In App Controller...');

        $scope.title = 'Data Table';
    })
    .directive('fsDatatable', function () {
        return {};

    });