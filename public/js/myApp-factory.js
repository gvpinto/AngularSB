var myApp = angular.module('myApp',[]);

myApp.factory('myService', function() {

    var counter = 0;
    var factoryFunc = function () {
        this.test = "This is an instance variable";
        this.count = ++counter;
        console.log('This is a factory function');
    };

    return new factoryFunc();
})

myApp.controller('myController', function ($scope, myService) {
    //myService();
    var myServiceVar = myService;
    console.log(myServiceVar.test);
    console.log(myServiceVar.count);
    myServiceVar = myService;
    console.log(myServiceVar.count);
    myServiceVar = myService;
    console.log(myServiceVar.count);

    var source = {
        firstname: 'Glenn'
    };

    var destination = {
        firstname: 'Renee',
        lastname: 'Pinto',
        fullname: function() {
            return this.firstname + ' ' + this.lastname;
        },
        address: {
            city: 'Raleigh',
            zip: {
                code: '12457',
                codeext: '12'
            }
        }
    }

    console.log(destination);
    destination = angular.extend(destination, source);
    console.log(destination);

    for (var property in destination) {
        console.log(typeof destination[property]);
    }


    function clearModel(model) {
        for (var property in model) {
            if (typeof model[property] === 'string') {
                model[property] = '';
            } else if (typeof model[property] === 'number') {
                model[property] = 0;
            } else if (typeof model[property] === 'boolean') {
                model[property] = false;
            } else if (typeof model[property] === 'object') {
                if (model[property] instanceof Array) {
                    model[property] = [];
                } else {
                    clearModel( model[property]);
                }
            }
        }
        return model;
    }

    destination = clearModel(destination);
    console.log(destination);
    for (var property in destination) {
        console.log(typeof destination[property]);
    }


});