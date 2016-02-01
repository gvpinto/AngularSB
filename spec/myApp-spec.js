"use strict";


describe("Testing UI-Router", function() {
    var stateProvider, locationProvider, templateParams, ctrlName, template, urlRouterProvider, scope;

    //beforeEach(module('ui.router', function($locationProvider) {
    //    locationProvider = $locationProvider;
    //    $locationProvider.html5Mode(false);
    //}));
    //
    //var log, logEvents, logEnterExit;
    //
    //function eventLogger(event, to, toParams, from, fromParams) {
    //    if (logEvents) log += event.name + '(' + to.name + ',' + from.name + ');';
    //}
    //function callbackLogger(what) {
    //    return function () {
    //        if (logEnterExit) log += this.name + '.' + what + ';';
    //    };
    //}
    //
    //beforeEach(module(function($stateProvider, $urlRouterProvider, $provide, $rootScope) {
    //    stateProvider = $stateProvider;
    //    $stateProvider
    //        .state('state1', {
    //            url: "/state1",
    //            templateUrl: "partials/state1.html"
    //        })
    //        .state('state1.list', {
    //            url: "/list",
    //            templateUrl: "partials/state1.list.html",
    //            controller: function($scope) {
    //                $scope.items = ["A", "List", "Of", "Items"];
    //            }
    //        })
    //        .state('state2', {
    //            url: "/state2",
    //            templateUrl: "partials/state2.html"
    //        })
    //        .state('state2.list', {
    //            url: "/list",
    //            templateUrl: "partials/state2.list.html",
    //            controller: function($scope) {
    //                $scope.things = ["A", "Set", "Of", "Things"];
    //            }
    //        });
    //}));


    beforeEach(module('myApp'));

    beforeEach(inject(function($injector) {
        console.log('beforeEach');
    }));


    it('should inject $stateParams into templateUrl function', inject(function ($state, $q, $httpBackend) {
        console.log('It:');
        //$httpBackend.expectGET("partials/state1.html").respond("200");
        //$state.transitionTo('state1');
        //$q.flush();
        //expect(templateParams).toEqual({ item: "foo" });
    }));

})

