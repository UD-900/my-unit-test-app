// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter') // <--- ADD THIS LINE
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // clearRunner: false,
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // Suppress all messages (overides other suppression settings)
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-angular-app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'], // <--- ADD 'junit' HERE
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true, // This will be overridden by --no-watch in package.json for CI
    browsers: ['Chrome'], // This will be overridden by --browsers=ChromeHeadless for CI
    singleRun: false, // This will be overridden by --no-watch in package.json for CI
    restartOnFileChange: true,

    // <--- ADD THIS NEW SECTION FOR JUNIT REPORTER CONFIGURATION
    junitReporter: {
      outputDir: require('path').join(__dirname, './test-results'), // Path where the JUnit XML file will be saved
      outputFile: 'junit.xml', // Name of the JUnit XML file
      suite: '', // Optional: name for the test suite in the XML report
      useBrowserName: false, // Optional: prevents adding browser name to suite name
      xmlVersion: '1' // Optional: XML version for the report
    }
    // END OF NEW SECTION
  });
};
