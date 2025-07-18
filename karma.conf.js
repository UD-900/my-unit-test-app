// karma.conf.js
module.exports = function (config) {
  config.set({
    // ... other configurations ...

    // Add 'karma-junit-reporter' to the list of plugins
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter') // <--- ADD THIS LINE
    ],

    // Add 'junit' to the list of reporters
    // Make sure 'progress' is there for console output during local runs
    reporters: ['progress', 'kjhtml', 'junit'], // <--- ADD 'junit' HERE

    // Configure the 'junit' reporter
    junitReporter: {
      outputDir: require('path').join(__dirname, './test-results'), // <--- Specify output directory
      outputFile: 'junit.xml', // <--- Specify output file name
      suite: '', // Suite name (optional, can be empty)
      useBrowserName: false, // Don't include browser name in suite name
      xmlVersion: '1' // Junit XML version
    },

    // ... rest of your configurations ...
  });
};