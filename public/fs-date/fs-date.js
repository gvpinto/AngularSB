angular.module('dateApp', ['ui.bootstrap', 'finSpider.directives'])
    .controller('dateCtrl', ['$scope', '$filter', 'datePickerOptions', function ($scope, $filter, datePickerOptions) {

        var date = new Date(2013, 9, 22);
        //$scope.dateVal = $filter('date')(date, 'MM/dd/yyyy');

        $scope.changeEvent = function () {
            console.log('Changed');
        }

        $scope.dateControl = datePickerOptions.createDatePickerOptions();

        $scope.screenMetadata = {
            //form: 'basicdataForm',
            forms: {
                basicdata: 'basicdataForm',
                customerSearch: 'customerSearchForm'
            },

            date: {
                id: 'txtDate',
                required: true,
                label: 'Date',
                pattern: angular.noop,
                errMsg: 'Invalid Date',
                help: 'hlpDate'
            }
        };

        $scope.modelDate = $filter('date')(date, 'MM/dd/yyyy');

    }])
    /**
     * DatePickerOption Service for the Date UI Control from Angular UI
     * This is NOT a Singleton Service
     */
    .factory('datePickerOptions', ['$log', function ($log) {

        function DatePickerOptions(dateFormat) {
            this.minDate = null;
            this.maxDate = null;
            this.opened = false;
            this.format = dateFormat;
            this.showWeeks = false;
            this.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            return this;
        };

        DatePickerOptions.prototype = {
            constructor: DatePickerOptions,
            toggleMin: function () {
                this.minDate = (this.minDate ? null : new Date());
            },
            disabled: function (date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            },
            open: function ($event) {
                this.opened = true;
            },
            today: function () {
                return new Date();
            },
            toString: function () {
                return ['Object: ' + this.constructor];
            }

        };

        function createDatePickerOptions(dateFormat) {
            dateFormat = dateFormat || 'MM/dd/yyyy';
            return new DatePickerOptions(dateFormat);
        }

        // return a new instance of datePickerOptions everytime this method is called.
        return {
            createDatePickerOptions: createDatePickerOptions
        };


    }])
    /**
     * Directive Usage
     * <fs-date fs-field-metadata="[object]" fs-form="[object]" fs-model="[object]" fs-date-control="[object]" fs-field-name="[string]" />
     */
    .directive('fsDate', function () {
        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return 'fs-date.html'
            },
            scope: {
                fsFieldMetadata: '=',
                fsForm: '=',
                fsModel: '=',
                fsDateControl: '=',
                fsFieldName: '@'
                //fsOnChange: '&',
                //fsLookupList: '='
            },
            link: function postLink(scope, element, attrs) {
                console.log('Linker...');
                console.log(scope.fsFieldName);
                console.log(scope.fsForm);
                console.log(scope.fsForm[scope.fsFieldName]);
                console.log(scope.fsFieldMetadata[scope.fsFieldName]);
                //console.log('link Called');
                //console.log('Field Name [' + attrs['fsFieldName'] + ']');
            },

            controller: ['$scope', '$q', '$timeout', '$filter', function ($scope, $q, $timeout, $filter) {

                console.log('Controller...');

                $scope.hasSuccessOrError = function (control) {

                    function controlStatus(control) {
                        //var success = $scope.isValid(control);
                        //var untouched = $scope.isUntouched(form, control);
                        return {success: control.$valid, untouched: control.$untouched};
                    }

                    var status = controlStatus(control);

                    if (status.untouched) {
                        return {glyphicon: '', has: ''};
                    } else {
                        if (status.success) {
                            return {glyphicon: 'glyphicon-ok', has: 'has-success'};
                        } else {
                            return {glyphicon: 'glyphicon-remove', has: 'has-error'};
                        }
                    }
                };

                $scope.isInvalid = function (control) {

                    return control.$invalid && control.$touched;
                    //if (form[controlValue]) {
                    //    return (form[controlValue].$valid || disableMessageDisplay || $scope.isUntouched(formValue, controlValue)) && override;
                    //} else {
                    //    $log.debug(controlValue + ' Not defined.');
                    //    return true;
                    //}

                };

                $scope.changeEvent = function (object) {
                    console.debug(object);
                }

                //$scope.$watch('noresults', function (newVal, oldVal) {
                //    console.log('No Results changed to [' + newVal + '] from [' + oldVal + ']');
                //});
                //
                //$scope.$watch('loading', function (newVal, oldVal) {
                //    console.log('Loading changed to [' + newVal + '] from [' + oldVal + ']');
                //});

            }]
        }
    });

angular.module('finSpider.directives', [])
    .factory('momentService', function () {
        return moment;
    })
