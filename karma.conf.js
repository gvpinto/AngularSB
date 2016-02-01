module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            //'public/components/**/*.js',
            //'public/view*/**/*.js',
            'public/js/*.js',
            'spec/*.js'
        ],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        // CLI --log-level debug
        logLevel: 'LOG_DEBUG',

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],
        //browsers: [ 'PhantomJS' ]

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
