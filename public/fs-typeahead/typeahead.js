'use strict';

angular.module('ui.bootstrap.demo', ['ui.bootstrap'])
    .controller('TypeaheadCtrl', function($scope, $http) {

        $scope.typeaheadTitle = 'Type Ahead';
        $scope.model = {
            basicdata: {
                branch: ''
            }
        }

        $scope.screenMetaData = {
            //form: 'basicdataForm',
            forms: {
                basicdata: 'basicdataForm',
                customerSearch: 'customerSearchForm'
            },

            branch: {
                id: 'txtBranch',
                required: true,
                label: 'Branch',
                pattern: angular.noop(),
                errMsg: 'Invalid Branch',
                help: 'hlpBranch'
            }
        }

    })
    .directive('fsTypeahead', function () {
        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return 'fs-typeahead.html'
            },
            scope: {
                fsFieldMetaData: '=',
                fsFormName: '@',
                fsModel: '=',
                fsFieldName: '@'
                //fsOnChange: '&',
                //fsLookupList: '='
            },
            link: function postLink(scope, element, attrs) {
                //console.log('link Called');
                scope.placeholder = scope.lookupTypes[attrs['fsFieldName']];
                //console.log('Field Name [' + attrs['fsFieldName'] + ']');
            },

            controller: ['$scope', '$q', '$timeout', '$filter', function ($scope, $q, $timeout, $filter) {

                // TODO: This should come from Fin Utils
                $scope.lookupTypes = {
                    branch: 'Branches',
                    legalentity: 'Legal Entities',
                    profitcenter: 'Profit Center',
                    costcenter: 'Cost Center',
                    orgmanager: 'Org Manager',
                    orgunit: 'Org Units'
                }

                $scope.changeEvent = function (object) {
                    console.debug(object);
                }

                $scope.typeaheadOnSelect = function ($item, $model, $label) {
                    console.log('-----[' + $label + ']-----');
                    console.log($item);
                    console.log($model);
                }

                $scope.typeaheadLookup = function (lookupType, searchVal) {
                    var deferred = $q.defer();

                    var branchesJSON = '[{"__v": 0, "instance": "100", "_id": "1000", "name": "branch-1000", "parent": "null", "ancestor": [], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1100", "name": "branch-1100", "parent": "1000", "ancestor": ["1000"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1200", "name": "branch-1200", "parent": "1000", "ancestor": ["1000"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1110", "name": "branch-1110", "parent": "1100", "ancestor": ["1000", "1100"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1120", "name": "branch-1120", "parent": "1100", "ancestor": ["1000", "1100"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1130", "name": "branch-1130", "parent": "1100", "ancestor": ["1000", "1100"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1111", "name": "branch-1111", "parent": "1110", "ancestor": ["1000", "1100", "1110"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1112", "name": "branch-1112", "parent": "1110", "ancestor": ["1000", "1100", "1110"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1121", "name": "branch-1121", "parent": "1120", "ancestor": ["1000", "1100", "1120"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1122", "name": "branch-1122", "parent": "1120", "ancestor": ["1000", "1100", "1120"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1131", "name": "branch-1131", "parent": "1130", "ancestor": ["1000", "1100", "1130"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1132", "name": "branch-1132", "parent": "1130", "ancestor": ["1000", "1100", "1130"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1133", "name": "branch-1133", "parent": "1130", "ancestor": ["1000", "1100", "1130"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1210", "name": "branch-1210", "parent": "1200", "ancestor": ["1000", "1200"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}, {"__v": 0, "instance": "100", "_id": "1220", "name": "branch-1220", "parent": "1200", "ancestor": ["1000", "1200"], "changedBy": "Glenn Pinto", "createdTS": {"$date": "2016-01-10T06:00:00.000Z"}, "changedTS": {"$date": "2016-01-10T06:00:00.000Z"}, "deletedTS": {"$date": "2016-01-10T06:00:00.000Z"}}]';

                    var branches = JSON.parse(branchesJSON)
                        .map(function(branch) {
                            return {id: branch._id, name: branch.name};
                        });

                    $timeout(function () {

                        if (searchVal === 'xx') {
                            deferred.reject([]);
                        } else {
                            deferred.resolve($filter('filter')(branches, function (value, index, array) {
                                if (value.id.match(new RegExp(searchVal)) || value.name.match(new RegExp(searchVal))) {
                                    //console.log('match');
                                    return value;
                                } else {
                                    //console.log('NO match');
                                    return null;
                                }
                            }, true));
                        }

                    }, 250);

                    return deferred.promise;

                }

                $scope.$watch('noresults', function (newVal, oldVal) {
                    console.log('No Results changed to [' + newVal + '] from [' + oldVal + ']');
                });

                $scope.$watch('loading', function (newVal, oldVal) {
                    console.log('Loading changed to [' + newVal + '] from [' + oldVal + ']');
                });
            }]
        };
    });