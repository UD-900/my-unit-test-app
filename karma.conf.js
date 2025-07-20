// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

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
      require('karma-junit-reporter') // <--- Add this line for JUnit reporting
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        defaultTimeoutInterval: 90000, // Increase timeout for CI environments if needed
        stopSpecOnExpectationFailure: true,
        random: false
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-app-name'), // Replace 'your-app-name'
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'], // <--- Add 'junit' here
    junitReporter: { // <--- Configure JUnit reporter
      outputDir: require('path').join(__dirname, './test-results'), // Directory for test reports
      outputFile: 'junit-report.xml', // Name of the XML report file
      suite: '', // Suite name (optional)
      useBrowserName: false, // Do not add browser name to suite name
      xmlVersion: '1' // XML report format version
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Set to false for CI/CD
    browsers: ['ChromeHeadless'], // <--- Use ChromeHeadless for CI/CD
    singleRun: true, // <--- Set to true for CI/CD
    restartOnFileChange: false, // Set to false for CI/CD
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox', // Required for Jenkins in some environments
          '--remote-debugging-port=9222',
        ],
      },
    },
  });
};
