// // import { I } from 'codeceptjs';  // `I` is the global object, no need to import IAppium
// import { exec } from 'child_process';
// import * as fs from 'fs';

// Feature('Performance Testing with Appium and CodeceptJS');

// Scenario('Check app performance and save metrics', async ({ I }) => {
//   // Launch the app using Appium
//   //I.amOnApp();  // This command launches your app

//   // Wait for a few seconds to allow the app to load
//   I.wait(5); // Adjust time based on your app's loading time

//   // Execute ADB command to get memory usage (as an example)
//   exec('adb shell dumpsys meminfo com.eroev.app', (error: any, stdout: string, stderr: string) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }

//     // Save performance data to a file (e.g., memory usage)
//     fs.writeFileSync('performance_report.txt', stdout);
//     console.log('Performance data saved successfully.');
//   });

//   // Collect CPU usage or other performance metrics
//   exec('adb shell top -n 1', (error: any, stdout: string, stderr: string) => {
//     if (error) {
//       console.error(`Error executing command: ${error}`);
//       return;
//     }

//     // Save CPU usage data
//     fs.writeFileSync('cpu_report.txt', stdout);
//     console.log('CPU usage data saved successfully.');
//   });

//   // Optionally, wait for more time if needed for further monitoring
//   I.wait(5);  // Wait for additional data collection time
// });




import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

Feature('Performance Testing with Appium and CodeceptJS');

Scenario('Check app performance and save metrics', async ({ I }) => {
  // Launch the app (uncomment if required)
  // I.amOnApp();  // This command launches your app

  // Wait for a few seconds to allow the app to load
  I.wait(5); // Adjust time based on your app's loading time

  // Variables to store performance data
  let memoryUsage: string = '';
  let cpuUsage: string = '';

  // Execute ADB command to get memory usage (as an example)
  exec('adb shell dumpsys meminfo com.eroev.app', (error: any, stdout: string, stderr: string) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    memoryUsage = stdout;
    console.log('Memory usage data collected successfully.');

    // Collect CPU usage or other performance metrics
    exec('adb shell top -n 1', (error: any, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      cpuUsage = stdout;
      console.log('CPU usage data collected successfully.');

      // Once both data points are collected, generate the HTML report
      generateHTMLReport(memoryUsage, cpuUsage);
    });
  });

  // Optionally, wait for more time if needed for further monitoring
  I.wait(5); // Wait for additional data collection time
});

// Function to generate HTML report with performance data
function generateHTMLReport(memoryData: string, cpuData: string): void {
  const reportPath = path.join(__dirname, 'performance_report.html');

  // Generate HTML content for the report
  const htmlContent = `
    <html>
      <head>
        <title>App Performance Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          h1 {
            color: #0056b3;
          }
          .report-section {
            margin-bottom: 20px;
          }
          pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .section-title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Performance Report for App: com.eroev.app</h1>

        <div class="report-section">
          <div class="section-title">Memory Usage</div>
          <pre>${memoryData}</pre>
        </div>

        <div class="report-section">
          <div class="section-title">CPU Usage</div>
          <pre>${cpuData}</pre>
        </div>

        <footer>
          <p>Report generated at: ${new Date().toLocaleString()}</p>
        </footer>
      </body>
    </html>
  `;

  // Write the HTML report to a file
  fs.writeFileSync(reportPath, htmlContent);
  console.log('Performance report generated at:', reportPath);
}
