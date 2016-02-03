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
     * Directive Usage
     * <fs-date fs-field-metadata="[object]" fs-form="[object]" fs-model="[object]" fs-date-control="[object]" fs-field-name="[string]" />
     */
    .directive('fsCalendar', function () {
        return {
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return 'fs-date.html'
            },
            // <fs-date fs-FieldMetadata="" fs-model="" fs-filed-name=""></fs-date>
            scope: {
                fsFieldMetadata: '=',
                fsModel: '=',
                fsDisplayed: '=',
                fsRequired: '='
                //fsFieldName: '@'
                //fsDateControl: '=',
                //fsOnChange: '&',
                //fsLookupList: '='
            },
            link: function postLink(scope, element, attrs, ngModelCtrl) {
                console.log('Linker...');
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


                $scope.isValid = function () {
                    console.log('isValid');
                    //console.log($scope.fsFieldMetadata.id);
                    return true;
                };


            }]
        };
    })
    .directive('fsDate', ['momentService', function (momentService) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModelCtrl) {

                var currentDateEntry;

                // ----- Date Validation -----
                function validateDate(date) {

                    //var shortDateRE = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/;
                    var dateRE = /^(\d{1,2})(\/(?=(?:\d+\/))|\/{0}(?=\d{1,2}(?:\d{2}|\d{4})))(\d{1,2})(\/?)(\d{2}|\d{4})$/;
                    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    /**
                     * Check if the date is year
                     * @param year
                     * @returns {boolean}
                     */
                    function isLeapYear(year) {
                        if (year % 400 === 0) {
                            return true;
                        } else if ((year % 4 === 0) && (year % 100 !== 0)) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    /**
                     * Pad the string. Default size is 2
                     * @param str
                     * @param max
                     * @returns {*}
                     */
                    function pad(str, max) {
                        max = max || 2
                        return str.length < max ? pad("0" + str, max) : str;
                    }

                    var dm = date.match(dateRE);

                    if (dm != null) {

                        var month = parseInt(dm[1], 10);
                        var date = parseInt(dm[3], 10);
                        var year = parseInt(dm[5], 10);

                        return {
                            valid: (date <= (days[month - 1] + ((month === 2 && isLeapYear(year)) ? 1 : 0))),
                            value: (dm[1] + '/' + dm[3] + '/' + dm[5])
                        };
                    } else {

                        return {valid: false, value: date};
                    }

                }

                // ----- Validation -----

                ngModelCtrl.$validators.date = function (modelValue, viewValue) {
                    console.log('$validators.date');
                    if (ngModelCtrl.$isEmpty(modelValue)) {
                        // Consider Empty Models to be valid
                        console.log('Date is empty and valid');
                        return true;
                    }
                    currentDateEntry = validateDate(modelValue);
                    if (currentDateEntry.valid) {
                        console.log('Date is valid');
                        return true;
                    } else {
                        console.log('Date in invalid');
                        return false;
                    }
                };

                // ----- On Events -----
                element.on('blur', function () {
                    console.log('Blur Event called');
                    //console.log(ngModelCtrl.$valid);
                    if (element.val() && element.val() !== '' && ngModelCtrl.$valid) {
                        var formattedDate = momentService(new Date(currentDateEntry.value)).format("MM/DD/YYYY")
                        console.log(formattedDate);
                        element.val(formattedDate);
                        ngModelCtrl.$setViewValue(formattedDate);
                    }

                });


                // ----- Sync up Model and View Changes -----
                // Specify how UI should be updated
                ngModelCtrl.$render = function () {
                    element.val(ngModelCtrl.$viewValue);
                };

            },
            controller: ['$scope', 'datePickerOptions', function ($scope, datePickerOptions) {
                console.log('In Date Directive Controller...');

            }]
        };
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

            //return this;
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


    }]);

angular.module('finSpider.directives', [])
    .factory('momentService', function () {
        return moment;
    })
