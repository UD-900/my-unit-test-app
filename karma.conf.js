// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        defaultTimeoutInterval: 90000,
        stopSpecOnExpectationFailure: true,
        random: false
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-app-name'), // Replace 'your-app-name'
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    // IMPORTANT: Let's simplify reporters for now to isolate the issue.
    // Temporarily remove 'kjhtml' to ensure no conflicts.
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'test-results',        // relative to workspace root
      outputFile: 'junit-report.xml',   // single file for all tests
      useBrowserName: false   
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: false,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox', // Still crucial for Jenkins
          '--remote-debugging-port=9222',
        ],
      },
    },
  });
};
