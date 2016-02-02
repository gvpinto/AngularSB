angular.module('testElementApp', ['ui.bootstrap', 'finSpider.directives'])
    .controller('testElementCtrl', function ($scope, $timeout) {
        console.log('In App Controller...');

        $scope.title = 'Form Element in Directive';
        $scope.inputVal = '12/31/12';
        $scope.inputVal2 = '11/30/10';


        ///**
        // * This event is required to disable all the messages on page load
        // */
        //$scope.$on('$viewContentLoaded', function (event) {
        //    $timeout(function () {
        //        console.log('$viewContentLoaded');
        //        console.log($scope.myForm.txtInputOutside);
        //        console.log($scope.myForm.txtInput);
        //    }, 1000);
        //});

        var watchForm = $scope.$watch('myForm', function (newValue, oldValue) {
            console.log('>>> Inside myForm $watch - Outside');
            //console.log(newValue);
            //console.log(oldValue);
            console.log($scope);
            console.log($scope.myForm);
            //watchForm();

        });

    })
    .directive('fsElement', [function () {
        return {
            require: '?ngModel',
            restrict: 'E',
            templateUrl: function (elem, attr) {
                return 'fs-element.html';
            },
            scope: {
                fsModel: '=',
                fsName: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                console.log('In Linker...');

                //console.log(element);
                //console.log(ngModelCtrl);
                //if (!ngModelCtrl) return; // do nothing if no ng-model
                //var inputElement = angular.element(element.find('input')[0]);
                //console.log(inputElement);
                //
                //// ----- Sync up Model and View Changes -----
                //// Specify how UI should be updated
                //ngModelCtrl.$render = function() {
                //    inputElement.val(ngModelCtrl.$viewValue);
                //};
                //
                //// Listen for change events to enable binding
                //inputElement.on('blur keyup change', function (event) {
                //    //scope.$evalAsync(read);
                //    //scope.$eval(read);
                //    read();
                //});
                //
                //read();
                //
                //// Write data to the model
                //function read() {
                //    console.log('Inside Read');
                //    var readValue = inputElement.val();
                //    console.log(readValue);
                //    ngModelCtrl.$setViewValue(readValue, 'blur keyup change');
                //}


            },
            controller: ['$scope', 'datePickerOptions', function ($scope, datePickerOptions) {
                console.log('In Directive Controller...');
                //console.log($scope);
                //$scope.isInvalid = function() {
                //
                //}

                var watchForm = $scope.$watch('inputForm', function (newValue, oldValue) {
                    console.log('>>> Inside myForm $watch - Inside');
                    watchForm();
                });

                $scope.isValid = function () {
                    //console.log('Called isValid');
                    //console.log($scope.inputForm);
                    //console.log($scope);
                    return $scope[$scope.fsName + 'Form'].$valid;
                };

            }]
        }
    }])
    .directive('fsDate', ['momentService', function (momentService) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
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
                        } else if((year % 4 === 0) && (year % 100 !== 0)) {
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
                    function pad (str, max) {
                        max = max || 2
                        return str.length < max ? pad("0" + str, max) : str;
                    }

                    var dm = date.match(dateRE);

                    if (dm != null) {

                        var month = parseInt(dm[1], 10);
                        var date = parseInt(dm[3], 10);
                        var year = parseInt(dm[5], 10);

                        return {valid: (date <= (days[month - 1] + ((month === 2 && isLeapYear(year))  ? 1 : 0))), value: (dm[1] + '/' + dm[3] + '/' + dm[5])};
                    } else {

                        return {valid: false, value: date};
                    }

                }

                // ----- Validation -----

                ngModelCtrl.$validators.date = function (modelValue, viewValue) {


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
                element.on('blur', function() {
                    console.log('Blur Event called');
                    //console.log(ngModelCtrl.$valid);
                    if (element.val() && element.val() !== '' && ngModelCtrl.$valid) {
                        var formattedDate = momentService(new Date(currentDateEntry.value)).format("MM/DD/YYYY")
                        console.log(formattedDate);
                        //ngModelCtrl.$setViewValue(formattedDate);
                        element.val(formattedDate);
                        ngModelCtrl.$setViewValue(formattedDate);
                    }

                });


                // ----- Sync up Model and View Changes -----
                // Specify how UI should be updated
                ngModelCtrl.$render = function() {
                    element.val(ngModelCtrl.$viewValue);
                };

                //// Listen for change events to enable binding
                //element.on('blur', function (event) {
                //    //scope.$evalAsync(read);
                //    //scope.$eval(read);
                //    read();
                //});
                //
                //read();
                //
                //// Write data to the model
                //function read() {
                //    console.log('Inside Read');
                //    var readValue = inputElement.val();
                //    console.log(readValue);
                //    ngModelCtrl.$setViewValue(readValue, 'blur keyup change');
                //}

            },
            controller: ['$scope', 'datePickerOptions', function ($scope, datePickerOptions) {
                //console.log('In Date Directive Controller...');

                //$scope.$watch('inputForm.txtInput', function () {
                //    console.log($scope.inputForm);
                //    console.log('Change my form');
                //});

            }]
        }
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


    }]);

angular.module('finSpider.directives', [])
    .factory('momentService', function () {
        return moment;
    })